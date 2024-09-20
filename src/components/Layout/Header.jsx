import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LogoImage from "../../assets/images/Logo.png";
//import UsuarioService from "../../services/UsuarioService";
//import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const pages = ["Procesos", "Mantenimientos", "Reportes", "Acerca de"];
//const settings = ["Perfil", "Cupones", "Historial", "Cerrar sesión"];

function Header() {
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuType, setMenuType] = useState(null);

  const handleOpenMenu = (event, type) => {
    setAnchorEl(event.currentTarget);
    setMenuType(type);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuType(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "green" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {userData && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={LogoImage}
                alt="Logo"
                style={{ width: "45px", height: "auto", marginRight: "5px" }}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                EcoPlanet
              </Typography>
            </Box>
          )}

          {userData && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(event) => handleOpenMenu(event, "Nav")}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorEl) && menuType === "Nav"}
                onClose={handleCloseMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {user &&
                  pages.map(
                    (page) =>
                      // Verificar el tipo de página y el rol del usuario antes de mostrar el botón
                      ((page === "Cliente" &&
                        autorize({ allowedRoles: ["Cliente"] })) ||
                        ((page === "Procesos" || page === "Acerca de") &&
                          autorize({
                            allowedRoles: [
                              "Administrador",
                              "Administrador Centro Acopio",
                              "Cliente",
                            ],
                          })) ||
                        page === "Mantenimientos" ||
                        (page === "Reportes" &&
                          autorize({
                            allowedRoles: [
                              "Administrador",
                              "Administrador Centro Acopio",
                            ],
                          }))) && (
                        <Button
                          key={page}
                          onClick={(event) => handleOpenMenu(event, page)}
                          sx={{
                            my: 2,
                            color: "white",
                            "&:hover": {
                              backgroundColor: "#689f38",
                            },
                            display: "block",
                          }}
                        >
                          {page}
                        </Button>
                      )
                  )}
              </Menu>
            </Box>
          )}

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", marginleft: "10px" },
            }}
          >
            {user &&
              pages.map(
                (page) =>
                  // Verificar el tipo de página y el rol del usuario antes de mostrar el botón
                  ((page === "Cliente" &&
                    autorize({ allowedRoles: ["Cliente"] })) ||
                    ((page === "Procesos" || page === "Acerca de") &&
                      autorize({
                        allowedRoles: [
                          "Administrador",
                          "Administrador Centro Acopio",
                          "Cliente",
                        ],
                      })) ||
                    page === "Mantenimientos" ||
                    (page === "Reportes" &&
                      autorize({
                        allowedRoles: [
                          "Administrador",
                          "Administrador Centro Acopio",
                        ],
                      }))) && (
                    <Button
                      key={page}
                      onClick={(event) => handleOpenMenu(event, page)}
                      sx={{
                        my: 2,
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#689f38",
                        },
                        display: "block",
                      }}
                    >
                      {page}
                    </Button>
                  )
              )}
          </Box>

          {userData && (
            <Box sx={{ marginLeft: "auto", flexGrow: 0 }}>
              <Tooltip
                title={userData?.correo}
                color="white"
                fontFamily="monospace"
                marginleft="5px"
                textalign="center"
              >
                <IconButton
                  onClick={(event) => handleOpenMenu(event, "User")}
                  sx={{ p: 0 }}
                >
                  <Avatar alt="Remy Sharp" src="" />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar-user"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl) && menuType === "User"}
                onClose={handleCloseMenu}
              >
                {userData && (
                  <MenuItem onClick={handleCloseMenu}>
                    <Typography
                      component="a"
                      href=""
                      style={{
                        textDecoration: "none",
                        color: "green",
                        textTransform: "uppercase",
                      }}
                      textAlign="center"
                    >
                      Cupones
                    </Typography>
                  </MenuItem>
                )}

                {userData && (
                  <MenuItem onClick={handleCloseMenu}>
                    <Typography
                      component="a"
                      href="/historial"
                      style={{
                        textDecoration: "none",
                        color: "green",
                        textTransform: "uppercase",
                      }}
                      textAlign="center"
                    >
                      Historial
                    </Typography>
                  </MenuItem>
                )}

                {user &&
                  autorize({
                    allowedRoles: ["Cliente"],
                  }) && (
                    <MenuItem onClick={handleCloseMenu}>
                      <Typography
                        component="a"
                        href="/billeteravirtual"
                        style={{
                          textDecoration: "none",
                          color: "green",
                          textTransform: "uppercase",
                        }}
                        textAlign="center"
                      >
                        Billetera Virtual
                      </Typography>
                    </MenuItem>
                  )}
                {/* Resto del código del menú */}

                {userData && (
                  <MenuItem onClick={handleCloseMenu}>
                    <Typography
                      component="a"
                      href="/user/changePassword"
                      style={{
                        textDecoration: "none",
                        color: "green",
                        textTransform: "uppercase",
                      }}
                      textAlign="center"
                    >
                      Cambiar contraseña
                    </Typography>
                  </MenuItem>
                )}

                {userData && (
                  <MenuItem onClick={handleCloseMenu}>
                    <Typography
                      component="a"
                      href="/user/logout"
                      style={{
                        textDecoration: "none",
                        color: "green",
                        textTransform: "uppercase",
                      }}
                      textAlign="center"
                    >
                      Cerrar sesión
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          )}

          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar-procesos"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl) && menuType === "Procesos"}
            onClose={handleCloseMenu}
          >
            <MenuItem component="a" href="/material/" onClick={handleCloseMenu}>
              <Typography>Materiales</Typography>
            </MenuItem>
            <MenuItem
              component="a"
              href="/centroAcopio/"
              onClick={handleCloseMenu}
            >
              <Typography textalign="center">Centros de acopio</Typography>
            </MenuItem>
            {user &&
              autorize({
                allowedRoles: ["Administrador Centro Acopio"],
              }) && (
                <MenuItem
                  component="a"
                  href="/proceso-canjeomateriales/"
                  onClick={handleCloseMenu}
                >
                  <Typography textalign="center">Canjear materiales</Typography>
                </MenuItem>
              )}

            {user &&
              autorize({
                allowedRoles: ["Administrador"],
              }) && (
                <MenuItem
                  component="a"
                  href="/clientes/"
                  onClick={handleCloseMenu}
                >
                  <Typography>Lista de clientes </Typography>
                </MenuItem>
              )}
          </Menu>

          {/*Para ocultar enlaces a clientes*/}
          {user &&
            autorize({
              allowedRoles: ["Administrador", "Administrador Centro Acopio"],
            }) && (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar-mantenimiento"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl) && menuType === "Mantenimientos"}
                onClose={handleCloseMenu}
              >
                <MenuItem
                  component="a"
                  href="/tabla-materiales"
                  onClick={handleCloseMenu}
                >
                  <Typography textalign="center">Materiales</Typography>
                </MenuItem>
                <MenuItem
                  component="a"
                  href="/tabla-centrosAcopio"
                  onClick={handleCloseMenu}
                >
                  <Typography textalign="center">Centros</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseMenu}>
                  <Typography textalign="center">Usuarios</Typography>
                </MenuItem>

                <MenuItem
                  onClick={handleCloseMenu}
                  component="a"
                  href="/tabla-cupones"
                >
                  <Typography textalign="center">Cupones</Typography>
                </MenuItem>

                {user &&
                  autorize({
                    allowedRoles: ["Administrador"],
                  }) && (
                    <MenuItem
                      component="a"
                      onClick={handleCloseMenu}
                      href="/tabla/adminsCentros"
                    >
                      <Typography textalign="center">
                        Administrador de centro
                      </Typography>
                    </MenuItem>
                  )}
              </Menu>
            )}

          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar-Reportes"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl) && menuType === "Reportes"}
            onClose={handleCloseMenu}
          >
            {user &&
              autorize({
                allowedRoles: ["Administrador Centro Acopio"],
              }) && (
                <MenuItem
                  component="a"
                  href="/reporte/canjes-mes"
                  onClick={handleCloseMenu}
                >
                  <Typography textalign="center">
                    Canjes del mes actual
                  </Typography>
                </MenuItem>
              )}

            {user &&
              autorize({
                allowedRoles: ["Administrador Centro Acopio"],
              }) && (
                <MenuItem
                  component="a"
                  href="/reporte/canjes-annio"
                  onClick={handleCloseMenu}
                >
                  <Typography textalign="center">
                    Canjes del año actual
                  </Typography>
                </MenuItem>
              )}

            {user &&
              autorize({
                allowedRoles: ["Administrador Centro Acopio"],
              }) && (
                <MenuItem
                  component="a"
                  href="/reporte/ecomonedas-generadas"
                  onClick={handleCloseMenu}
                >
                  <Typography textalign="center">
                    Ecomonedas generadas
                  </Typography>
                </MenuItem>
              )}
            {user &&
              autorize({
                allowedRoles: ["Administrador"],
              }) && (
                <MenuItem
                  component="a"
                  href="/reporte/canje-mes-general"
                  onClick={handleCloseMenu}
                >
                  <Typography textalign="center">
                    Canjes del mes actual
                  </Typography>
                </MenuItem>
              )}
               {user &&
              autorize({
                allowedRoles: ["Administrador"],
              }) && (
                <MenuItem
                  component="a"
                  href="/reporte/ecomonedas-general"
                  onClick={handleCloseMenu}
                >
                  <Typography textalign="center">
                    Ecomonedas generadas 
                  </Typography>
                </MenuItem>
              )}
               {user &&
              autorize({
                allowedRoles: ["Administrador"],
              }) && (
                <MenuItem
                  component="a"
                  href="/reporte/ecomonedas-generadas"
                  onClick={handleCloseMenu}
                >
                  <Typography textalign="center">
                    Ecomonedas generadas al año
                  </Typography>
                </MenuItem>
              )}              
              {user &&
              autorize({
                allowedRoles: ["Administrador"],
              }) && (
                <MenuItem
                  component="a"
                  href="/reporte/canjes-cupon"
                  onClick={handleCloseMenu}
                >
                  <Typography textalign="center">
                    Canjes de cupones al año
                  </Typography>
                </MenuItem>
              )}
               
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
