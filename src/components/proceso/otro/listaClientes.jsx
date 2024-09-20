import { useState } from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import UsuarioService from "../../../services/UsuarioService";
import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";

//import ScaleIcon from "@mui/icons-material/Scale";
//import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";

export function ListaClientes() {
  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  //Error del API
  const [error, setError] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    //Lista de peliculas del API
    UsuarioService.getClientes(3) //Tipo de Usuario Cliente
      .then((response) => {
        setData(response.data.results);
        setError(response.error);
        setLoaded(true);
        console.log(data.response.results);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoaded(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }); // Añade 'children' como dependencia

  if (!loaded)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Grid>
      <Typography
        component="h1"
        variant="h3"
        align="center"
        color="text.primary"
        fontFamily="monospace"
        borderBottom="1px solid green"
        gutterBottom
      >
        Clientes
      </Typography>

      <Grid container sx={{ p: 2 }} spacing={3}>
        {/*se usa map para recorrer los item de la base de datos */}
        {data &&
          data.map(
            (
              item //el map es solo para listas json o arrays
            ) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item.id}>
                <Card>
                  <CardHeader
                    sx={{
                      p: 0,
                      padding: "10px 0p",
                      backgroundColor: "#795548",
                      color: (theme) => theme.palette.common.white,
                      //para cambiar el estilo del subheader
                      "& .MuiCardHeader-subheader": {
                        color: (theme) => theme.palette.common.white, // Cambia 'tu-color-aqui' alf color que desees
                      },
                    }}
                    style={{ textAlign: "center" }}
                    title={`${item.nombre}`}
                  />
                  <CardContent>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src="https://t3.ftcdn.net/jpg/05/53/79/60/240_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
                        alt="imagen del material"
                        style={{
                          width: "200px",
                          borderRadius: "15px",
                        }}
                      />
                    </Box>

                    <Grid
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                    >
                      <Box
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: 16, fontFamily: "Arial" }}
                      >
                        <Typography
                          display="flex"
                          alignItems="center"
                          margin={"10px"}
                        >
                          <EmailIcon sx={{ marginRight: "8px" }} />{" "}
                          {/* Ícono de balance con margen a la derecha */}
                          <span>Correo: {item.correo}</span>{" "}
                          {/* Texto de la medida */}
                        </Typography>
                      </Box>
                      <Box
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: 16, fontFamily: "Arial" }}
                      >
                        <Typography
                          display="flex"
                          alignItems="center"
                          margin={"10px"}
                        >
                          <LocalPhoneIcon sx={{ marginRight: "8px" }} />{" "}
                          {/* Ícono de balance con margen a la derecha */}
                          <span>Teléfono: {item.telefono}</span>{" "}
                          {/* Texto de la medida */}
                        </Typography>
                      </Box>
                      <Box
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: 16, fontFamily: "Arial" }}
                      >
                        <Typography
                          display="flex"
                          alignItems="center"
                          margin={"10px"}
                        >
                          <PersonPinCircleIcon sx={{ marginRight: "8px" }} />{" "}
                          {/* Ícono de moneda */}
                          <span>Pronvincia: {item.provincia}</span>{" "}
                          {/* Texto del precio */}
                        </Typography>
                      </Box>
                      <Box
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: 16, fontFamily: "Arial" }}
                      >
                        <Typography
                          display="flex"
                          alignItems="center"
                          margin={"10px"}
                        >
                          <PersonPinCircleIcon sx={{ marginRight: "8px" }} />{" "}
                          {/* Ícono de moneda */}
                          <span>Cantón: {item.canton}</span>{" "}
                          {/* Texto del precio */}
                        </Typography>
                      </Box>
                      <Box
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: 16, fontFamily: "Arial" }}
                      >
                        <Typography
                          display="flex"
                          alignItems="center"
                          margin={"10px"}
                        >
                          <PersonPinCircleIcon sx={{ marginRight: "8px" }} />{" "}
                          {/* Ícono de moneda */}
                          <span>Distrito: {item.distrito}</span>{" "}
                          {/* Texto del precio */}
                        </Typography>
                      </Box>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )
          )}
      </Grid>
    </Grid>
  );
}
