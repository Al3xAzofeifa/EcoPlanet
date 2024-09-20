import { useState } from "react";
import { useEffect } from "react";
import CentroAcopioService from "../../services/CentroAcopioService";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BalanceIcon from "@mui/icons-material/Balance";
//imports para la tabla de materiales

//import ScaleIcon from "@mui/icons-material/Scale";
//import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";

export function DetalleCentroAcopio() {
  //id
  const params = useParams();
  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  //Error del API
  const [error, setError] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    //Lista de peliculas del API
    CentroAcopioService.getCentroAcopioById(params.id)
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
  }, [params.id]);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/*se usa map para recorrer los item de la base de datos */}
      <Grid item key={data.id}>
        <Card
          sx={{
            transition: "transform 500ms", // Agrega una transición suave
          }}
        >
          <CardHeader
            sx={{
              p: 0,
              padding: "10px 0px",
              backgroundColor: "orange",
              color: (theme) => theme.palette.common.white,
              //para cambiar el estilo del subheader
              "& .MuiCardHeader-subheader": {
                color: (theme) => theme.palette.common.white, // Cambia 'tu-color-aqui' al color que desees
              },
            }}
            style={{ textAlign: "center" }}
            title={data.nombre}
            subheader={"Usuario a cargo: " + data.usuario.nombre}
          />

          <CardContent>
            <Box
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
                <Typography display="flex" alignItems="center" margin={"10px"}>
                  <LocationOnIcon sx={{ marginRight: "8px" }} />{" "}
                  {/* Ícono de balance con margen a la derecha */}
                  <span>
                    Ubicación: {data.provincia.descripcion},{" "}
                    {data.canton.descripcion}
                  </span>{" "}
                  {/* Texto de la medida */}
                </Typography>
              </Box>

              <Box
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 16, fontFamily: "Arial" }}
              >
                <Typography display="flex" alignItems="center" margin={"10px"}>
                  <MapsHomeWorkIcon sx={{ marginRight: "8px" }} />{" "}
                  {/* Ícono de moneda */}
                  <span>Dirección: {data.direccion}</span>{" "}
                  {/* Texto del precio */}
                </Typography>
              </Box>
              <Box
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 16, fontFamily: "Arial" }}
              >
                <Typography display="flex" alignItems="center" margin={"10px"}>
                  <LocalPhoneIcon sx={{ marginRight: "8px" }} />{" "}
                  {/* Ícono de moneda */}
                  <span>Telefono: {data.telefono}</span>{" "}
                  {/* Texto del precio */}
                </Typography>
              </Box>

              <Box
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 16, fontFamily: "Arial" }}
              >
                <Typography display="flex" alignItems="center" margin={"10px"}>
                  <AccessTimeFilledIcon sx={{ marginRight: "8px" }} />{" "}
                  {/* Ícono de moneda */}
                  <span>Horario de atención: {data.horario}</span>{" "}
                  {/* Texto del precio */}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid marginTop="20px">
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="text.primary"
          fontFamily="monospace"
          gutterBottom
        >
          Materiales Del Centro De Acopio
        </Typography>

        <Grid container sx={{ p: 2 }} spacing={3}>          
          {data && data.materiales ? (
            data.materiales.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item.id}>
                <Card>
                  <CardHeader
                    sx={{
                      backgroundColor: item.color,
                      color: "white", // Establecer el color de texto en blanco para el título
                    }}
                    style={{ textAlign: "center", padding: "10px" }}
                    title={item.nombre}
                  />                 
                  <CardContent>
                    <Box style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={item.imagen}
                        alt="Descripción de la imagen"
                        style={{
                          width: "230px",
                          height: "200px",
                        }}
                      />
                    </Box>
                    <Box
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: 16, fontFamily: "Arial" }}
                    >
                      <Typography display="flex" alignItems="center" margin={"10px"}>
                        <AttachMoneyIcon sx={{ marginRight: "8px" }} />{" "}
                        <span>Precio: {item.precio} ecomonedas</span>
                      </Typography>
                    </Box>
                    <Box
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: 16, fontFamily: "Arial" }}
                    >
                      <Typography display="flex" alignItems="center" margin={"10px"}>
                        <BalanceIcon sx={{ marginRight: "8px" }} />{" "}
                        <span>Medida: {item.unidadMedida}</span>
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6">
                No hay materiales disponibles.
              </Typography>
              {/* Aquí puedes agregar cualquier otro contenido que desees mostrar */}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
