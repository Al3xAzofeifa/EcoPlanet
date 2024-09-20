import { useState, useEffect, useContext } from "react";
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
import CanjeoMaterialesService from "../../services/CanjeoMaterialesService";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaidIcon from "@mui/icons-material/Paid";
import { UserContext } from "../../context/UserContext";

export function ListCanjeoMaterialesByAdmin() {
  //----------------------------------------------------------------------------------------------------------------------------------
  //Obtener la informacion del ususario logueado
  //Autorize para ocultar
  const { user, decodeToken } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());

  //Useffect para que cargue rapido
  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);
  //----------------------------------------------------------------------------------------------------------------------------------
  //id
  // Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  // Error del API
  const [error, setError] = useState("");
  // Booleano para establecer si se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Lista de materiales del API
    CanjeoMaterialesService.getAllCanjeosMaterialesByAdmin(userData.id)
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
  }, [userData.id]);

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
        Canjeo de Materiales del Centro de Acopio
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
                  title={"No. Canjeo " + item.id}
                  subheader={
                    <span style={{ color: "white" }}>{item.descripcion}</span>
                  }
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
                      <HomeIcon sx={{ marginRight: "8px" }} />{" "}
                      {/* Ícono de moneda */}
                      <span>Centro de Acopio: {item.nombre}</span>{" "}
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
                      <CalendarMonthIcon sx={{ marginRight: "8px" }} />{" "}
                      {/* Ícono de moneda */}
                      <span>Fecha: {item.Fecha}</span> {/* Texto del precio */}
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
                      <PaidIcon sx={{ marginRight: "8px" }} />{" "}
                      {/* Ícono de balance con margen a la derecha */}
                      <span>Total Ecomonedas: {item.TotalEcoMonedas}</span>{" "}
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
                    to={`/detalle-canjeoMaterialesByAdmin/${item.id}`}
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
