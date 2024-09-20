/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { UserContext } from "../../context/UserContext";
import BilleteraVirtualService from "../../services/BilleteraVirtualService";

export function BilleteraVirtual() {
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
  const [data, setData] = useState(null);

  const [loaded, setLoaded] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    BilleteraVirtualService.getBilleteraVirtualByUsuario(userData.id)
      .then((response) => {
        setData(response.data.results);
        setError(response.error);
        setLoaded(true);
        console.log(response.data.results);
        console.log(userData.id);
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

  //if (error) return <p>Error: {error.message}</p>;
  return (
    <>
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
            Billetera Virtual
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
          <Grid item xs={12} sm={6}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#212121" }}>
                    <TableCell colSpan={3} align="center">
                      <Typography variant="h5" style={{ color: "white" }}>
                        Ecomonedas
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ backgroundColor: "#b0bec5" }}>
                    <TableCell
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Disponibles
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Canjeadas
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Recibidas
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    data.map((item) => (
                      <TableRow
                        key={item.id}
                        style={{ backgroundColor: "#b0bec5" }}
                      >
                        <TableCell style={{ textAlign: "center" }}>
                          {item.disponibles}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {item.canjeadas}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {item.recibidas}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
