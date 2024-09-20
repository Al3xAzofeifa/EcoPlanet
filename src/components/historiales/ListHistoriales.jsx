//import { useParams } from "react-router-dom";
//import { useEffect, useState } from "react";
//Servicios
//import CanjeoMaterialesService from "../../services/CanjeoMaterialesService";

//Maquetacion
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import ReciclarImage from "../../assets/images/reciclar-image.jpg";
import CuponImage from "../../assets/images/cupon-Image.png";
import centroAcopioCanjeo from "../../assets/images/centroAcopioCanjeo.jpg";

//Recursos

//import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import IconButton from "@mui/material/IconButton";
//import PersonIcon from "@mui/icons-material/Person";
//import PaidIcon from "@mui/icons-material/Paid";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
//import { useEffect, useState } from "react";
//import { Link, useParams } from "react-router-dom";

export function Historial() {
  //----------------------------------------------------------------------------------------------------------------------------------
  //Obtener la informacion del ususario logueado
  //Autorize para ocultar
  const { user, decodeToken, autorize } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());

  //Useffect para que cargue rapido
  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);
  //----------------------------------------------------------------------------------------------------------------------------------
  return (
    <Grid>
      {/* Tipos de historial */}
      <Grid
        container
        sx={{ p: 3, display: "flex", justifyContent: "center" }}
        spacing={1}
      >
        {user &&
          autorize({
            allowedRoles: ["Cliente"],
          }) && (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              <Card style={{ width: "280px" }}>
                <CardHeader
                  sx={{
                    p: 0,
                    padding: "10px 0p",
                    backgroundColor: "blue",
                    color: "white",
                  }}
                  style={{ textAlign: "center", padding: "10px" }}
                  title={"Canjeo Materiales"}
                  subheader={<span style={{ color: "white" }}>{}</span>}
                />
                <CardContent>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={ReciclarImage}
                      alt="imagen del material"
                      style={{
                        width: "300px",
                        height: "250px",
                        padding: "10px",
                      }}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
                <CardActions
                  sx={{
                    backgroundColor: (theme) => theme.palette.action.focus,
                    color: (theme) => theme.palette.common.white,
                  }}
                >
                  <IconButton
                    component={Link}
                    to={"/canjeosmateriales"}
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
                    <InfoIcon style={{ marginLeft: "5px" }} />
                    Más información
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          )}

        {user &&
          autorize({
            allowedRoles: ["Cliente"],
          }) && (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              <Card style={{ width: "280px" }}>
                <CardHeader
                  sx={{
                    p: 0,
                    padding: "10px 0p",
                    backgroundColor: "blue",
                    color: "white",
                  }}
                  style={{ textAlign: "center", padding: "10px" }}
                  title={"Canjeo de cupones"}
                  subheader={<span style={{ color: "white" }}>{}</span>}
                />
                <CardContent>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={CuponImage}
                      alt="imagen del material"
                      style={{
                        width: "300px",
                        height: "250px",
                        padding: "10px",
                      }}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
                <CardActions
                  sx={{
                    backgroundColor: (theme) => theme.palette.action.focus,
                    color: (theme) => theme.palette.common.white,
                  }}
                >
                  <IconButton
                    component={Link}
                    to={"/canjeoscupones"}
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
                    <InfoIcon style={{ marginLeft: "5px" }} />
                    Más información
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          )}

        {user &&
          autorize({
            allowedRoles: ["Administrador Centro Acopio"],
          }) && (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              <Card style={{ width: "280px" }}>
                <CardHeader
                  sx={{
                    p: 0,
                    padding: "10px 0p",
                    backgroundColor: "blue",
                    color: "white",
                  }}
                  style={{ textAlign: "center", padding: "10px" }}
                  title={"Canjeo centro acopio"}
                  subheader={<span style={{ color: "white" }}>{}</span>}
                />
                <CardContent>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={centroAcopioCanjeo}
                      alt="imagen del material"
                      style={{
                        width: "300px",
                        height: "250px",
                        padding: "10px",
                      }}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
                <CardActions
                  sx={{
                    backgroundColor: (theme) => theme.palette.action.focus,
                    color: (theme) => theme.palette.common.white,
                  }}
                >
                  <IconButton
                    component={Link}
                    to={"/canjeosmaterialesByAdmin"}
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
                    <InfoIcon style={{ marginLeft: "5px" }} />
                    Más información
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          )}
      </Grid>
    </Grid>
  );
}
