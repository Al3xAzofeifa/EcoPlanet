import { useState } from "react";
import { useEffect } from "react";
import MaterialService from "../../services/MaterialService";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BalanceIcon from "@mui/icons-material/Balance";
import Box from "@mui/material/Box";
//import ScaleIcon from "@mui/icons-material/Scale";
//import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";

export function DetalleMaterial() {
  //id
  const { id } = useParams();
  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  //Error del API
  const [error, setError] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    //Lista de peliculas del API
    MaterialService.getMaterialById(id)
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
  }); // Añade 'children' como dependencia
  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Grid
      container
      sx={{ display: "flex", justifyContent: "center" }}
      spacing={1}
    >
      {/*se usa map para recorrer los item de la base de datos */}
      <Grid key={data.id}>
        <Card
          sx={{
            transition: "transform 500ms", // Agrega una transición suave
          }}
        >
          <CardHeader
            sx={{
              p: 0,
              padding: "10px 0px",
              backgroundColor: data.color,
              color: (theme) => theme.palette.common.white,
              //para cambiar el estilo del subheader
              "& .MuiCardHeader-subheader": {
                color: (theme) => theme.palette.common.white, // Cambia 'tu-color-aqui' al color que desees
              },
            }}
            style={{ textAlign: "center" }}
            title={data.nombre}
          />

          <CardContent>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={data.imagen}
                alt="imagen del material"
                style={{
                  width: "300px",
                  marginBottom: "5%",
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
                <Typography display="flex" alignItems="center" margin={"10px"}>
                  <DescriptionIcon sx={{ marginRight: "8px" }} />{" "}
                  {/* Ícono de balance con margen a la derecha */}
                  <span>Descripción: {data.descripcion}</span>{" "}
                  {/* Texto de la medida */}
                </Typography>
              </Box>
              <Box
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 16, fontFamily: "Arial" }}
              >
                <Typography display="flex" alignItems="center" margin={"10px"}>
                  <BalanceIcon sx={{ marginRight: "8px" }} />{" "}
                  {/* Ícono de balance con margen a la derecha */}
                  <span>Medida: {data.unidadMedida}</span>{" "}
                  {/* Texto de la medida */}
                </Typography>
              </Box>
              <Box
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 16, fontFamily: "Arial" }}
              >
                <Typography display="flex" alignItems="center" margin={"10px"}>
                  <AttachMoneyIcon sx={{ marginRight: "8px" }} />{" "}
                  {/* Ícono de moneda */}
                  <span>Precio: {data.precio} ecomonedas</span>{" "}
                  {/* Texto del precio */}
                </Typography>
              </Box>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
