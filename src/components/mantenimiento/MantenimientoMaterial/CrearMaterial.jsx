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
import { useNavigate } from "react-router-dom";

import { ChromePicker } from "react-color";
import { FormHelperText, Popover } from "@mui/material";

export function CrearMaterial() {
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState("");

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setValue("color", selectedColor);
  };

  const open = Boolean(anchorEl);
  const id = open ? "color-picker-popover" : undefined;

  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  //Esquema de validación
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
      .typeError("El precio debe ser valor numerico")
      .required("El precio es requerido"),
    image: yup
      .mixed()
      .required("Se requiere un archivo")
      .test("fileType", "Formato no soportado", (value) => {
        return (
          value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
        );
      }),
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
      image: "",
    },
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
        MaterialService.createMaterial(DataForm)
          .then((response) => {
            console.log(response);
            setError(response.error);
            //Respuesta al usuario de creación
            //if (response.data.results != null) {
              toast.success('Material Creado', {
                duration: 4000,
                position: "top-center",
              }); 

              // Redireccion a la tabla
              return navigate("/tabla-materiales");
            //}
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
  //Lista de Directores

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" gutterBottom>
              Crear Material
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
                    label="Color"
                    onClick={handleButtonClick}
                    error={Boolean(errors.color)}
                    value={selectedColor}
                    helperText={errors.color ? errors.color.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Popover
                id={id}
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
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{
                m: 1,
                border: "2px dashed #aaa",
                borderRadius: "4px",
                textAlign: "center",
                padding: "20px",
              }}>
              <input
                accept="image/*"
                name="image"
                type="file"
                onChange={(event) => {
                  setValue("image", event.target.files[0]);
                  handleFileUpload(event);
                }}
              />
              {file && (
                <img src={URL.createObjectURL(file)} alt="uploaded file" />
              )}
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.image ? errors.image.message : " "}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ m: 1 }}
            >
              Crear
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
