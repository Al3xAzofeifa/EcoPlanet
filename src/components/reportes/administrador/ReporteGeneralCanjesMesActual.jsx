import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
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

export function ReporteGeneralCanjesMesActual() {
  const [dataCanjesMensuales, setDataCanjesMensuales] = useState(null);
  //   const [dataCanjesAnnio, setDataCanjesAnnio] = useState(null);
  //   const [dataTotalGenerado, setDataTotalGenerado] = useState(null);

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

        setDataCanjesMensuales(formatData);
        setLoaded(true);
      })
      .catch((error) => {
        setDataCanjesMensuales(null);
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
          {dataCanjesMensuales && (
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
                Cantidad de canjes realizados
              </Typography>

              <ResponsiveContainer height={450} key={1}>
                <BarChart data={dataCanjesMensuales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="Cantidad"
                    fill="#1a237e"
                    stroke="#5d4037"
                    strokeWidth={1}
                  />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
