import { useEffect } from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CanjeoMaterialesService from "../../services/CanjeoMaterialesService";

export function DetalleCanjeoMateriales() {
  // id
  const { id } = useParams();
  // Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  // Error del API
  const [error, setError] = useState("");
  // Booleano para establecer si se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Lista de materiales del API
    CanjeoMaterialesService.getCanjeosMateriales(id)
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
  }, [id]);

  if (!loaded) return <Typography>Cargando...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  //Guardar el total
  var Total = 0;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Card sx={{ backgroundColor: "#78909c" }}>
          <CardHeader
            title="Canjeo de Materiales"
            subheader={"No. Canjeo #" + data.id + " | Fecha: " + data.fecha}
          />
          <CardContent>
            {/* Información del usuario */}
            <Typography
              variant="h6"
              color="text.primary"
              gutterBottom
              fontWeight={"bold"}
            >
              Información del usuario:
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>Nombre</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{data.usuario.nombre}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography
              variant="h6"
              color="text.primary"
              fontWeight={"bold"}
              gutterBottom
              marginTop={"20px"}
            >
              Información del Centro de Acopio:
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>Nombre</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Dirección
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>{data.centroAcopio.nombre}</TableCell>
                    <TableCell>{data.centroAcopio.direccion}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography
              variant="h6"
              color="text.primary"
              gutterBottom
              marginTop={"20px"}
              fontWeight={"bold"}
            >
              Detalles del Canjeo de Materiales:
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Material
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Descripción
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Precio</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Cantidad
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Subtotal
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.detalles.map((item) => {
                    var Subtotal = item.precio * item.cantidad;
                    Total += Subtotal;
                    <TableRow key={item.id}>
                      <TableCell>{item.material}</TableCell>
                      <TableCell>{item.descripcion}</TableCell>
                      <TableCell>{item.precio} ecomonedas</TableCell>
                      <TableCell>{item.cantidad} unidades</TableCell>
                      <TableCell>{Subtotal} ecomonedas</TableCell>
                    </TableRow>;
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Grid>
              <Typography
                variant="h6"
                color="text.primary"
                gutterBottom
                marginTop={"20px"}
                textAlign={"right"}
              >
                <strong>Total del Canjeo:</strong> {Total} ecomonedas
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
