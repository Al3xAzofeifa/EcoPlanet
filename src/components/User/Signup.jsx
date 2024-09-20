/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UserService from "../../services/UsuarioService";
import ProvinciaService from "../../services/ProvinciaService";
import { SelectProvincia } from "../mantenimiento/Form/SelectProvincias";
import { FormHelperText } from "@mui/material";
import CantonService from "../../services/CantonService";
import { SelectCanton } from "../mantenimiento/Form/SelectCanton";
import DistritoService from "../../services/DistritoService";
import { SelectDistrito } from "../mantenimiento/Form/SelectDistrito";

export function Signup() {
  const navigate = useNavigate();
  // Esquema de validación
  const loginSchema = yup.object({
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
    // Valores iniciales
    defaultValues: {
      nombre: "",
      correo: "",
      contrasena: "",
      tipoUsuario: "3",
      telefono: "",
      provincia: "",
      canton: "",
      distrito: "",
    },
    // Asignación de validaciones
    resolver: yupResolver(loginSchema),
  });

  const [error, setError] = useState("");
  const notify = () =>
    toast.success("Usuario registrado", {
      duration: 4000,
      position: "top-center",
    });
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      //setValue("tipoUsuario", 3);
      console.log(DataForm);
      //Registrar usuario
      UserService.createUser(DataForm)
        .then((response) => {
          console.log(response);
          notify();
          return navigate("/user/login");
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);
            throw new Error("Respuesta no válida del servidor");
          }
        });
    } catch (e) {
      // handle your error
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
              Registrar usuario
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
                Registrarse
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
