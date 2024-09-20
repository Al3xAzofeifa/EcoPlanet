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
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FormHelperText } from "@mui/material";
//import AdministradorService from "../../../services/AdministradorService";
import ProvinciaService from "../../../services/ProvinciaService";
import { SelectProvincia } from "../Form/SelectProvincias";
import CantonService from "../../../services/CantonService";
import { SelectCanton } from "../Form/SelectCanton";
import DistritoService from "../../../services/DistritoService";
import { SelectDistrito } from "../Form/SelectDistrito";
import UsuarioService from "../../../services/UsuarioService";

//https://www.npmjs.com/package/@hookform/resolvers

export function CrearAdminCentro() {
  //----------------------------------------------------[Variables para el codigo]--------------------------------------------------------
  const TipoUsuarioAdministrador = "2";
  //----------------------------------------------------[Variables para el codigo]--------------------------------------------------------

  const navigate = useNavigate();

  // Esquema de validación
  const adminSchema = yup.object({
    nombre: yup.string().required("El nombre es requerido"),
    correo: yup
      .string()
      .required("El correo electrónico es requerido")
      .email("Formato correo nombre@ejemplo.com"),
    contrasena: yup.string().required("La contraseña es requerida"),
    telefono: yup
      .number()
      .required("El teléfono es requerido")
      .typeError("El teléfono debe ser numérico")
      .transform((value, originalValue) =>
        originalValue.trim() === "" ? undefined : value
      )
      .integer("El teléfono debe ser un número entero")
      .positive("El teléfono debe ser un número positivo")
      .test(
        "len",
        "El teléfono debe tener exactamente 8 dígitos",
        (val) => val && val.toString().length === 8
      ),

    provincia: yup.string().required("La provincia es requerida"),
    canton: yup.string().required("El cantón es requerido"),
    distrito: yup.string().required("El distrito es requerido"),
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
      contrasena: "",
      tipoUsuario: TipoUsuarioAdministrador,
      telefono: "",
      provincia: "",
      canton: "",
      distrito: "",
    },

    // Asignación de validaciones
    resolver: yupResolver(adminSchema),
  });

  const [error, setError] = useState("");

  // Accion submit
  const onSubmit = (DataForm) => {
    console.log("Formulario:");
    console.log(DataForm);

    try {
      //Crear centro
      if (adminSchema.isValid()) {
        UsuarioService.createUser(DataForm)
          .then((response) => {
            console.log("Respuesta al crear el usuario");
            console.log(response);

            setError(response.error);
            //Respuesta al usuario de creación
            if (response.data.results != null) {
              toast.success(response.data.results, {
                duration: 4000,
                position: "top-center",
              });
              // Redireccion a la tabla
              return navigate("/tabla/adminsCentros"); 
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

  //***************************************************************************/
  //Lista de provincia
  const [dataProvincia, setdataProvincia] = useState({});
  const [loadedProvincia, setLoadedProvincia] = useState(false);

  useEffect(() => {
    ProvinciaService.getProvincias()
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

  //***************************************************************************/
  //Lista de canton
  const [dataCanton, setDataCanton] = useState(null);
  const [loadedCanton, setLoadedCanton] = useState(false);

  // Obtener id_Provincia del formulario
  let [idProvincia, setIdProvincia] = useState(0);

  useEffect(() => {
    if (idProvincia !== null) {
      CantonService.getCantonByIdProvincia(idProvincia)
        .then((response) => {
          console.log(response);
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
  const [dataDistrito, setDataDistrito] = useState(null);
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

  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

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
              Registrar administrador de centro de acopio
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
                  name="contrasena"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="contrasena"
                      label="Contraseña"
                      type="password"
                      error={Boolean(errors.contrasena)}
                      helperText={
                        errors.contrasena ? errors.contrasena.message : " "
                      }
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
                    name="provincia"
                    control={control}
                    render={({ field }) => (
                      <SelectProvincia //esto se cambia
                        field={field}
                        data={dataProvincia}
                        error={Boolean(errors.provincia)}
                        onSelection={(value) => {
                          setValue("provincia", value, {
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
                {/* Lista de Provincia */}
                {loadedCanton && (
                  <Controller
                    name="canton"
                    control={control}
                    render={({ field }) => (
                      <SelectCanton //esto se cambia
                        field={field}
                        data={dataCanton}
                        error={Boolean(errors.canton)}
                        onSelection={(value) => {
                          setValue("canton", value, {
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
                {loadedDistrito && (
                  <Controller
                    name="distrito"
                    control={control}
                    render={({ field }) => (
                      <SelectDistrito
                        field={field}
                        data={dataDistrito}
                        error={Boolean(errors.distrito)}
                        onSelection={(value) => {
                          setValue("distrito", value, {
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
                Registrar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
