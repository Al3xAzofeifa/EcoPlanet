import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormHelperText } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import CuponService from "../../../services/CuponService";
import TipoCuponService from "../../../services/TipoCuponService";
import { SelectTipoCupon } from "../Form/SelectTipoCupon";
//import TipoCuponService from "../../../services/TipoCuponService";
//import { SelectTipoCupon } from "../Form/SelectTipoCupon";
//import CuponService from "../../../services/CuponService";

//https://www.npmjs.com/package/@hookform/resolvers

export function ActualizarCupon() {
  const navigate = useNavigate();
  const routeParams = useParams();

  const id = routeParams.id || null;
  //Valores a precargar en el formulario, vienen del API
  const [values, setValores] = useState(null);



  //Obtener el material del API
  useEffect(() => {
    if (id != undefined && !isNaN(Number(id))) {
      CuponService.getById(Number(id))
        .then((response) => {
          setValores(response.data.results);
          setError(response.error);

          setValue("fechaInicio",  convertirFecha(response.data.results.fechaInicio));
          setValue("fechaFinal",  convertirFecha(response.data.results.fechaFinal));
          
          console.log("Datos iniciales");
          console.log(response.data.results);
          
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
 

  const convertirFecha = (fechaISO) => {
    const [anio, dia, mes] = fechaISO.split('-'); // Separar año, mes y día
    return `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${anio}`;
  };

  // const convertirFecha = (fechaISO) => {
  //   const [anio, dia, mes] = fechaISO.split('-'); // Separar año, mes y día
  //   return `${dia}/${mes}/${anio}`;
  // };



  // Esquema de validación
  const CuponSchema = yup.object({
    nombre: yup.string().required("El nombre del cupón es requerido"),
    descripcion: yup.string().required("La descripción es requerida"),
    fechaInicio: yup.string().required("La fecha de inicio es requerida"),
    fechaFinal: yup.string().required("La fecha de fin es requerida"),
    cantEcomonedas: yup
      .string()
      .required("La cantidad de eco-monedas es requerida"),
    tipoCupon: yup
      .mixed()
      .required("Se requiere un tipo de cupón para el cupón"),
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
      imagen: "",
      tipoCupon: "",
      fechaInicio: "",
      fechaFinal: "", 
      cantEcomonedas: "",
    },
    values,
    // Asignación de validaciones
    resolver: yupResolver(CuponSchema),
  });

  //Lista de canton
  const [dataTipoCupon, setdataTipoCupon] = useState(null);
  const [loadedTipoCupon, setloadedTipoCupon] = useState(false);
  // Obtener id_Provincia del formulario

  const [error, setError] = useState("");

  // Función para cargar cantones por id de provincia
  useEffect(() => {
    TipoCuponService.getAll()
      .then((response) => {
        console.log(response);
        setdataTipoCupon(response.data.results);
        setloadedTipoCupon(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setloadedTipoCupon(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, []);

  // Accion submit
  const onSubmit = (DataForm) => {
    console.log("Formulario:");
    console.log(DataForm);

    try {
      //Crear centro
      if (CuponSchema.isValid()) {
        CuponService.update(DataForm)
          .then((response) => {
            console.log("Respuesta al crear el cupón");
            console.log(response);
            setError(response.error);
            //Respuesta al usuario de creación
            if (response.data.results != null) {
              toast.success(response.data.results, {
                duration: 4000,
                position: "top-center",
              });
              // Redescripcion a la tabla
              return navigate("/tabla-cupones");
            }
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
              Actualizar Cupón de Canje
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
                    label="Nombre del Cupón"
                    error={Boolean(errors.nombre)}
                    helperText={errors.nombre ? errors.nombre.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
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
                name="cantEcomonedas"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="cantEcomonedas"
                    label="Cantidad de Eco-monedas"
                    error={Boolean(errors.cantEcomonedas)}
                    helperText={
                      errors.cantEcomonedas
                        ? errors.cantEcomonedas.message
                        : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="fechaInicio"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="fechaInicio"
                    label="Fecha inicial del cupón"
                    aria-readonly={true}
                    error={Boolean(errors.fechaInicio)}
                    helperText={
                      errors.fechaInicio ? errors.fechaInicio.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="fechaFinal"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="fechaFinal"
                    label="Fecha final del cupón"
                    aria-readonly={true}
                    error={Boolean(errors.fechaFinal)}
                    helperText={
                      errors.fechaFinal ? errors.fechaFinal.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {loadedTipoCupon ? (
                <Controller
                  name="tipoCupon"
                  control={control}
                  render={({ field }) => (
                    <SelectTipoCupon
                      field={field}
                      data={dataTipoCupon}
                      error={Boolean(errors.tipoCupon)}
                      onChange={(e) =>
                        setValue("tipoCupon", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                  )}
                />
              ) : (
                <p>No hay Tipos de Cupones disponibles</p>
              )}

              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.tipoCupon ? errors.tipoCupon.message : " "}
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
              Actualizar Cupón
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
