import { useState, useEffect } from "react";
import MaterialService from "../../services/MaterialService";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { Info } from "@mui/icons-material";

export function ListMateriales() {
  // Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  // Error del API
  const [error, setError] = useState("");
  // Booleano para establecer si se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Lista de materiales del API
    MaterialService.getMateriales()
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

  if (!loaded) return <Typography>Cargando...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

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
        Materiales
      </Typography>

      <Grid container sx={{ p: 2 }} spacing={3}>
        {data &&
          data.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item.id}>
              <Card>
                <CardHeader
                  sx={{
                    p: 0,
                    backgroundColor: item.color,
                    color: "white", // Establecer el color de texto en blanco para el título
                  }}
                  style={{ textAlign: "center", padding: "10px" }}
                  title={item.nombre}
                  subheader={
                    <span style={{ color: "white" }}>{item.descripcion}</span>
                  }
                />
                <CardContent>
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={item.imagen}
                      alt="Descripción de la imagen"
                      style={{
                        width: "300px",
                        height: "250px",
                      }}
                    />
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
                      <AttachMoneyIcon sx={{ marginRight: "8px" }} />{" "}
                      {/* Ícono de moneda */}
                      <span>Precio: {item.precio} ecomonedas</span>{" "}
                      {/* Texto del precio */}
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
                    to={`/detalle-material/${item.id}`}
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
