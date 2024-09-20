import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import ProvinciaService from "../../../services/ProvinciaService";

import { SelectProvincia } from "../Form/SelectProvincias";
import { SelectCanton } from "../Form/SelectCanton";
import { FormHelperText } from "@mui/material";
import DistritoService from "../../../services/DistritoService";
import { SelectDistrito } from "../Form/SelectDistrito";
import AdministradorService from "../../../services/AdministradorService";
import CantonService from "../../../services/CantonService";

//https://www.npmjs.com/package/@hookform/resolvers

export function ActualizarAdminCentro() {
  const navigate = useNavigate();
  const routeParams = useParams();

  const id = routeParams.id || null;
  //Valores a precargar en el formulario, vienen del API
  const [values, setValores] = useState(null);

  //Obtener el material del API
  useEffect(() => {
    if (id != undefined && !isNaN(Number(id))) {
      AdministradorService.getAdminCentroById(Number(id))
        .then((response) => {
          setIdProvincia(response.data.results.Provincia);
          setValores("Provincia", response.data.results.Provincia);

          setIdCanton(response.data.results.Canton);
          setValores("Canton", response.data.results.Canton);

          setValores("Distrito", response.data.results.Distrito);
          console.log("Datos iniciales");
          setValores(response.data.results);
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
  const CentroAcopioSchema = yup.object({
    nombre: yup.string().required("El nombre del centro es requerido"),
    telefono: yup.string().required("El teléfono es requerido"),
    Provincia: yup.mixed().required("Se requiere seleccionar una provincia"),
    Canton: yup.mixed().required("Se requiere seleccionar un cantón"),
    Distrito: yup.mixed().required("Se requiere seleccionar un distrito"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      correo: "",
      telefono: "",
      Provincia: "",
      Canton: "",
      Distrito: "",
    },
    //Cargar los valores obtenidos
    values,
    // Asignación de validaciones
    resolver: yupResolver(CentroAcopioSchema),
  });

  const [error, setError] = useState("");

  // Accion submit
  const onSubmit = (DataForm) => {
    console.log("Formulario:");
    console.log(DataForm);

    try {
      //Crear centro
      if (CentroAcopioSchema.isValid()) {
        AdministradorService.updateAdminCentro(DataForm)
          .then((response) => {
            console.log("Respuesta al actualizar el usuario");
            console.log(response);

            setError(response.error);
            //Respuesta al usuario de creación
             if (response.data.results != null) {
              toast.success(response.data.results, {
                duration: 4000,
                position: "top-center",
              });
             }
            // Redireccion a la tabla
            return navigate("/tabla/adminsCentros");
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
  //Lista de provincia
  const [dataProvincia, setdataProvincia] = useState({});
  const [loadedProvincia, setLoadedProvincia] = useState(false);

  useEffect(() => {
    ProvinciaService.getProvincias() //Cambiar por metodo que solo traiga la provincia correspondiente o al menos que seleccione la correspondiente
      .then((response) => {
        console.log(response);
        setdataProvincia(response.data.results);
        setLoadedProvincia(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedProvincia(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, []);

  //Lista de canton
  const [dataCanton, setDataCanton] = useState({});
  const [loadedCanton, setLoadedCanton] = useState(false);
  // Obtener id_Provincia del formulario
  let [idProvincia, setIdProvincia] = useState(0);

  // Función para cargar cantones por id de provincia
  useEffect(() => {
    if (idProvincia !== null) {
      CantonService.getCantonByIdProvincia(idProvincia) //
        .then((response) => {
          console.log("Id canton");
          setDataCanton(response.data.results);
          setLoadedCanton(true);
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);
            setLoadedCanton(false);
            throw new Error("Respuesta no válida del servidor");
          }
        });
    }
  }, [idProvincia]);

  //***************************************************************************/
  //Lista de distrito
  const [dataDistrito, setDataDistrito] = useState({});
  const [loadedDistrito, setLoadedDistrito] = useState(false);
  // Obtener id_Provincia del formulario
  let [idCanton, setIdCanton] = useState(0);

  useEffect(() => {
    if (idCanton !== null) {
      DistritoService.getDistritoByIdCanton(idCanton)
        .then((response) => {
          console.log(response);
          setDataDistrito(response.data.results);
          setLoadedDistrito(true);
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);
            setLoadedDistrito(false);
            throw new Error("Respuesta no válida del servidor");
          }
        });
    }
  }, [idCanton]);
  //***************************************************************************/

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              fontFamily="monospace"
              borderBottom="1px solid green"
              gutterBottom
            >
              Actualizar administrador de centro de acopio
            </Typography>
          </Grid>

          <Grid
            container
            spacing={1}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              padding: {
                xs: "0", // For screens smaller than 720px
                md: "1% 15%", // 10px top and bottom, 30px left and right for screens 720px and larger
              },
            }}
          >
            <Grid item xs={12} sm={12}>
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
            <Grid item xs={12} sm={12}>
              <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                <Controller
                  name="correo"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="correo"
                      label="Correo electrónico"
                      error={Boolean(errors.correo)}
                      helperText={errors.correo ? errors.correo.message : " "}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                <Controller
                  name="telefono"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="telefono"
                      label="Teléfono"
                      inputProps={{ maxLength: 8 }}
                      error={Boolean(errors.telefono)}
                      helperText={
                        errors.telefono ? errors.telefono.message : " "
                      }
                    />
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                {/* Lista de Provincia */}
                {loadedProvincia && (
                  <Controller
                    name="Provincia"
                    control={control}
                    render={({ field }) => (
                      <SelectProvincia //esto se cambia
                        field={field}
                        data={dataProvincia}
                        error={Boolean(errors.Provincia)}
                        onSelection={(value) => {
                          setValue("Provincia", value, {
                            shouldValidate: true,
                          });
                          setIdProvincia(value);
                          setIdCanton(0);
                        }}
                      />
                    )}
                  />
                )}
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors.provincia ? errors.provincia.message : " "}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                {/* Lista de canton */}
                {loadedCanton && (
                  <Controller
                    name="Canton"
                    control={control}
                    render={({ field }) => (
                      <SelectCanton //esto se cambia
                        field={field}
                        data={dataCanton}
                        error={Boolean(errors.Canton)}
                        onSelection={(value) => {
                          setValue("Canton", value, {
                            shouldValidate: true,
                          });
                          setIdCanton(value);
                        }}
                      />
                    )}
                  />
                )}
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors.canton ? errors.canton.message : " "}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                {/* Lista de Provincia */}
                {/* Lista de canton */}
                {loadedDistrito && (
                  <Controller
                    name="Distrito"
                    control={control}
                    render={({ field }) => (
                      <SelectDistrito //esto se cambia
                        field={field}
                        data={dataDistrito}
                        error={Boolean(errors.Distrito)}
                        onSelection={(value) => {
                          setValue("Distrito", value, {
                            shouldValidate: true,
                          });
                        }}
                      />
                    )}
                  />
                )}
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors.distrito ? errors.distrito.message : " "}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ m: 1, px: 5, py: 1 }}
              >
                Actualizar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
