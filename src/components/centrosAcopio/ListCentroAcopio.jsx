import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { Info } from "@mui/icons-material";
import CentroAcopioService from "../../services/CentroAcopioService";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

export function ListCentrosAcopio() {
  // Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  // Error del API
  const [error, setError] = useState("");
  // Booleano para establecer si se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Lista de materiales del API
    CentroAcopioService.getCentrosAcopio()
      .then((response) => {
        setData(response.data.results);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoaded(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, []);

  if (!loaded) return <p>Cargando...</p>;
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
        Centros de Acopio
      </Typography>

      <Grid container sx={{ p: 2 }} spacing={3}>
        {data &&
          data.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item.id}>
              <Card>
                <CardHeader
                  sx={{
                    p: 0,
                    backgroundColor: "orange",
                    color: "white", // Establecer el color de texto en blanco para el título
                  }}
                  style={{ textAlign: "center", padding: "10px" }}
                  title={item.nombre}
                />
                <CardContent>
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
                      <AccessTimeFilledIcon sx={{ marginRight: "8px" }} />{" "}
                      {/* Ícono de balance con margen a la derecha */}
                      <span>Horario: {item.horario}</span>{" "}
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
                      <span>Teléfono : {item.telefono}</span>{" "}
                      {/* Texto de la medida */}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions
                  id={item.id}
                  disableSpacing
                  sx={{
                    backgroundColor: (theme) => theme.palette.action.focus,
                    color: (theme) => theme.palette.common.white,
                  }}
                >
                  <IconButton
                    component={Link}
                    to={`/detalle-centroacopio/${item.id}`}
                    aria-label="Detalle"
                    sx={{
                      fontSize: "15px",
                      width: "100%",
                      "&:hover": {
                        backgroundColor: "white",
                        borderRadius: "0",
                      },
                    }}
                  >
                    <Info style={{ marginleft: "5px" }} />
                    Más información
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}
