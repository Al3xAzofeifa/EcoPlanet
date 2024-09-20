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
import { Grid, Typography } from "@mui/material";
import ReporteEcomonedasGeneralesService from "../../../services/ReporteEcomonedasGeneralesService";

export function ReporteEcomonedasGeneradasGeneral() {
  const [dataEcomonedasGeneradas, setDataCanjesMensuales] = useState(null);

  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  //Cantidad de canjes de materiales realizados en el mes actual
  useEffect(() => {
    ReporteEcomonedasGeneralesService.getAll() 
      .then((response) => {
        const dataGraph = response.data.results;
        const formatData = dataGraph.map((item) => ({
          Nombre: item.Nombre_CentroAcopio,
          Cantidad: parseInt(item.EcoMonedas_Producidas),
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
          {dataEcomonedasGeneradas && (
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
                Cantidad de Ecomonedas Generadas
              </Typography>

              <ResponsiveContainer height={450} key={1}>
                <BarChart data={dataEcomonedasGeneradas}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Nombre" /> 
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
