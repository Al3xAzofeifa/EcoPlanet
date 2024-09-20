// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { useState, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// eslint-disable-next-line no-unused-vars
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import UserService from "../../services/UsuarioService";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LogoImage from "../../assets/images/Logo.png";

export function Login() {
  const navigate = useNavigate();
  const { saveUser } = useContext(UserContext);
  // Esquema de validación
  const loginSchema = yup.object({
    correo: yup
      .string()
      .required("El correo electrónico es requerido")
      .email("Formato correo nombre@ejemplo.com"),
    contrasena: yup.string().required("La contraseña es requerida"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // Valores iniciales
    defaultValues: {
      correo: "",
      contrasena: "",
    },
    // Asignación de validaciones
    resolver: yupResolver(loginSchema),
  });

  // Valores de formulario

  const [error, setError] = useState("");
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      UserService.loginUser(DataForm)
        .then((response) => {
          console.log(response);
          if (
            response.data.results != null &&
            response.data.results != undefined &&
            response.data.results != "Usuario no valido"
          ) {
            //Usuario es correcto
            saveUser(response.data.results);
            toast.success("Bienvenido(a)", {
              duration: 4000,
              position: "top-center",
            });
            return navigate("/");
          } else {
            //Usuario no es valido
            toast.error("Usuario NO válido", {
              duration: 4000,
              position: "top-center",
            });
          }
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

  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <Toaster />
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh", // Establece el alto al 100% de la altura de la ventana
          width: "100%", // Establece el ancho al 100% del contenedor padre
        }}
      >
        <Card
          container
          spacing={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#c8e6c9",
            padding: {
              xs: "0",
              md: "1% 0%",
            },
            height: {
              xs: "150px",
              md: "400px",
            },
            width: {
              xs: "250px",
              md: "750px",
            },
          }}
        >
          <CardContent
            container
            spacing={1}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              padding: {
                xs: "0", // For screens smaller than 720px
                md: "5%", // 10px top and bottom, 30px left and right for screens 720px and larger
              },
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textalign: "center",
              }}
            >
              <Grid
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={LogoImage}
                  alt="Logo"
                  style={{ width: "100%", height: "auto" }}
                />
              </Grid>
              <Typography
                component="h1"
                variant="h4"
                color="text.primary"
                gutterBottom
              >
                EcoPlanet
              </Typography>
            </Grid>
          </CardContent>

          <CardContent
            container
            spacing={1}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              padding: {
                xs: "0", // For screens smaller than 720px
                md: "5%", // 10px top and bottom, 30px left and right for screens 720px and larger
              },
            }}
          >
            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <Typography
                    component="h1"
                    variant="h5"
                    gutterBottom
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    Iniciar sesión
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  {/* ['filled','outlined','standard']. */}
                  <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                    <Controller
                      name="correo"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="correo"
                          label="Correo"
                          error={Boolean(errors.correo)}
                          helperText={
                            errors.correo ? errors.correo.message : " "
                          }
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
                <Grid
                  item
                  xs={12}
                  sm={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    sx={{ m: 1, px: 1, py: 1 }}
                  >
                    Iniciar sesión
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography
                    component="a"
                    href="/user/create"
                    color="secondary"
                    sx={{ fontSize: "12px" }}
                  >
                    Registrarse
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
