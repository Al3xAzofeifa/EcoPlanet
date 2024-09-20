import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// import { useContext } from "react";
// import { UserContext } from "../../../context/UserContext";
import ReportesServcies from "../../../services/ReportesServices";
import { Grid, Typography } from "@mui/material";

export function ReporteCanjeCupon() {
  const [dataCanjes, setDataCanjes] = useState(null);
  //   const [dataCanjesAnnio, setDataCanjesAnnio] = useState(null);
  //   const [dataTotalGenerado, setDataTotalGenerado] = useState(null);
  const anioActual = new Date().getFullYear();

  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  //Cantidad de canjes de materiales realizados en el mes actual
  useEffect(() => {
    ReportesServcies.getAll()
      .then((response) => {
        const dataGraph = response.data.results;
        const formatData = dataGraph.map((item) => ({
          Mes: `Mes: ${new Date().getMonth() + 1}`,
          Cantidad: parseInt(item.CantidadCanjesMateriales),
        }));

        setDataCanjes(formatData);
        setLoaded(true);
      })
      .catch((error) => {
        setDataCanjes(null);
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoaded(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, []);

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "colunm",
        }}
      >
        <Grid item xs={12} sm={12}>
          {!loaded && <div>Cargando...</div>}
          {dataCanjes && (
            <>
              <Typography
                component="h1"
                variant="h3"
                align="center"
                color="text.primary"
                fontFamily="monospace"
                borderBottom="1px solid green"
                gutterBottom
              >
                Canjes de Cupones en {anioActual}
              </Typography>

              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={dataCanjes}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="cantidad"
                    stroke="#1a237e"
                    name="Canjes por Mes"
                  />
                  <Line
                    type="monotone"
                    dataKey="totalAcumulado"
                    stroke="#82ca9d"
                    name="Total Acumulado"
                  />
                </LineChart>
              </ResponsiveContainer>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
