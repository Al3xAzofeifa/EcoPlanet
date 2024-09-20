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
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export function ChangePassword() {
  //Obtener la informacion del ususario logueado
  //Autorize para ocultar
  const { user, decodeToken, autorize } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());

  //Useffect para que cargue rapido
  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);

  const navigate = useNavigate();
  // Esquema de validación
  const loginSchema = yup.object({
    contrasena: yup.string().required("La contraseña es requerida"),
    contrasena2: yup
      .string()
      .required("La confirmación de contraseña es requerida"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    // Valores iniciales
    defaultValues: {
      idUsuario: userData.id,
      contrasena: "",
      contrasena2: "",
    },
    // Asignación de validaciones
    resolver: yupResolver(loginSchema),
  });

  const watchPassword = watch("contrasena");
  const watchConfirmPassword = watch("contrasena2");

  const [error, setError] = useState("");

  const notify = () =>
    toast.success("Contraseña actualizada!", {
      duration: 4000,
      position: "top-center",
    });
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      // Verificar si las contraseñas coinciden
      if (DataForm.contrasena !== DataForm.contrasena2) {
        // Mostrar un mensaje de error o tomar alguna acción
        console.error("Las contraseñas no coinciden");
        // Puedes agregar lógica adicional aquí, como mostrar un mensaje al usuario
        return;
      }

      //setValue("tipoUsuario", 3);
      console.log(DataForm);
      //Registrar usuario
      UserService.updateUser(DataForm)
        .then((response) => {
          console.log(response);
          notify();
          return navigate("/");
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
              Cambiar contraseña
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
                  name="contrasena2"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="contrasena2"
                      label="Confirmar contraseña"
                      type="password"
                      error={Boolean(
                        watchPassword && field.value !== watchPassword
                      )}
                      helperText={
                        watchPassword &&
                        field.value !== watchPassword &&
                        "Las contraseñas no coinciden"
                      }
                      onChange={(e) => setValue("contrasena2", e.target.value)}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ m: 1, px: 5, py: 1 }}
              >
                Cambiar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
