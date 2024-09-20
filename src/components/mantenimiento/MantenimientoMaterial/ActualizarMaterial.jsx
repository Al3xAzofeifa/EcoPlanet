import { useState } from "react";
//import MaterialService from "../../services/MantenimientoMaterialService";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import MaterialService from "../../../services/MaterialService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ChromePicker } from "react-color";
import { Popover } from "@mui/material";

//https://www.npmjs.com/package/@hookform/resolvers

export function ActualizarMaterial() {
  const navigate = useNavigate();
  const routeParams = useParams();

  const [selectedColor, setSelectedColor] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setValue("color", selectedColor);
  };

  //Id de la pelicula a actualizar
  const id = routeParams.id || null;
  //Valores a precargar en el formulario, vienen del API
  const [values, setValores] = useState(null);

  //Obtener el material del API
  useEffect(() => {
    if (id != undefined && !isNaN(Number(id))) {
      MaterialService.getMaterialById(Number(id))
        .then((response) => {
          console.log(response);
          setValores(response.data.results);
          setSelectedColor(response.data.results.color);
          setError(response.error);
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);

            throw new Error("Respuesta no válida del servidor");
          }
        });
    }
  }, [id]);

  // Esquema de validación
  const materialSchema = yup.object({
    nombre: yup
      .string()
      .required("El nombre es requerido")
      .min(2, "El nombre debe tener 2 caracteres"),
    descripcion: yup.string().required("La descripción es requerida"),
    unidadMedida: yup.string().required("La Unidad de Medida es requerida"),
    color: yup.string().required("El color es requerido"),
    precio: yup
      .number()
      .typeError("El precio es requerido")
      .required("El director es requerido"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
      unidadMedida: "",
      precio: "",
      color: "",
      imagen: "",
    },
    values,
    // Asignación de validaciones
    resolver: yupResolver(materialSchema),
  });

  const [error, setError] = useState("");

  // Accion submit
  const onSubmit = (DataForm) => {
    console.log("Formulario:");
    console.log(DataForm);

    try {
      if (materialSchema.isValid()) {
        //Crear pelicula
        MaterialService.updateMaterial(DataForm)
          .then((response) => {
            console.log(response);
            setError(response.error);
            //Respuesta al usuario de creación
            if (response.data.results != null) {
              toast.success(response.data.results, {
                duration: 4000,
                position: "top-center",
              });
              // Redireccion a la tabla
            }

            return navigate("/tabla-materiales");
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              setError(error);
              throw new Error("Respuesta no válida del servidor");
            }
          });
      }
    } catch (e) {
      //Capturar error
    }
  };

  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" gutterBottom>
              Actualizar Material
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="nombre"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="nombre"
                    label="Nombre"
                    error={Boolean(errors.nombre)}
                    helperText={errors.nombre ? errors.nombre.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="descripcion"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="descripcion"
                    label="Descripción"
                    error={Boolean(errors.descripcion)}
                    helperText={
                      errors.descripcion ? errors.descripcion.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="unidadMedida"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="unidadMedida"
                    label="Unidad de Medida"
                    error={Boolean(errors.unidadMedida)}
                    helperText={
                      errors.unidadMedida ? errors.unidadMedida.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="precio"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="precio"
                    label="Precio"
                    error={Boolean(errors.precio)}
                    helperText={errors.precio ? errors.precio.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="color"
                    label="Color del Material"
                    onClick={handleButtonClick}
                    error={Boolean(errors.color)}
                    value={selectedColor}
                    helperText={errors.color ? errors.color.message : " "}
                  />
                )}
              />

              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <ChromePicker
                  color={selectedColor}
                  onChange={handleColorChange}
                />
              </Popover>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ m: 1 }}
            >
              Actualizar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
