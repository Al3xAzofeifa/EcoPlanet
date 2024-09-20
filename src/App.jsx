import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/layout/Layout";
import { PageNotFound } from "./components/Home/PageNotFound";
import { Home } from "./components/home/home";
import { ListMateriales } from "./components/material/ListMateriales";
import { DetalleMaterial } from "./components/material/DetalleMaterial";
import { ListCentrosAcopio } from "./components/centrosAcopio/ListCentroAcopio";
import { DetalleCentroAcopio } from "./components/centrosAcopio/DetalleCentroAcopio";
import { Historial } from "./components/historiales/ListHistoriales";
import { ListCanjeoMateriales } from "./components/canjeoMateriales/ListCanjeoMateriales";
import { DetalleCanjeoMateriales } from "./components/canjeoMateriales/DetalleCanjeoMateriales";
import { ListCanjeoMaterialesByAdmin } from "./components/canjeoMateriales/ListCanjeoMaterialesByAdmin";
import { CrearMaterial } from "./components/mantenimiento/MantenimientoMaterial/CrearMaterial";

//Recursos

import TablaMateriales from "./components/material/TablaMateriales";
import { ActualizarMaterial } from "./components/mantenimiento/MantenimientoMaterial/ActualizarMaterial";
import TablaCentrosAcopio from "./components/centrosAcopio/TablaCentrosAcopio";
import { CreateCentroAcopio } from "./components/mantenimiento/MantenimientoCentroAcopio/CrearCentroAcopio";
import { UpdateCentroAcopio } from "./components/mantenimiento/MantenimientoCentroAcopio/ActualizarCentroAcopio";
import { ProcesoCanjeoMateriales } from "./components/proceso/canjeoMateriales/procesoCanjeoMateriales";

//login
import { Login } from "./components/User/Login";
import { Logout } from "./components/User/Logout";
import { Signup } from "./components/User/Signup";
import { Unauthorized } from "./components/User/Unauthorized";
import { ChangePassword } from "./components/User/ChangePassword";
import UserProvider from "./components/User/UserProvider";
import { Auth } from "./components/User/Auth";
import { ListaClientes } from "./components/proceso/otro/listaClientes";
import { ActualizarAdminCentro } from "./components/mantenimiento/MantenimientoAdminCentro/ActualizarAdminCentro";
import TablaAdminCentros from "./components/mantenimiento/MantenimientoAdminCentro/TablaAdminCentros";
import { CrearAdminCentro } from "./components/mantenimiento/MantenimientoAdminCentro/CrearAdminCentro";
import { BilleteraVirtual } from "./components/billeteraVirtual/BilleteraVirtual";
import { CrearCupon } from "./components/mantenimiento/MantenimientoCupones/CrearCupon";
import TablaCupones from "./components/mantenimiento/MantenimientoCupones/TablaCupones";
import { ActualizarCupon } from "./components/mantenimiento/MantenimientoCupones/ActualizarCupon";
import { ReporteCanjesMesActual } from "./components/reportes/adminCentroAcopio/ReporteCanjesMesActual";
import { ReporteCanjesAnnioActual } from "./components/reportes/adminCentroAcopio/ReporteCanjesAnnioActual";
import { ReporteEcomonedasGeneradas } from "./components/reportes/adminCentroAcopio/ReporteEcomonedasGeneradas";
import { ReporteGeneralCanjesMesActual } from "./components/reportes/administrador/ReporteGeneralCanjesMesActual";
import { ReporteEcomonedasGeneradasCentro } from "./components/reportes/administrador/ReporteEcomonedasGeneradasCentro";
import { ReporteEcomonedasGeneradasGeneral } from "./components/reportes/administrador/ReporteEcomonedasGeneradas";
import { ReporteCanjeCupon } from "./components/reportes/administrador/ReporteCanjeCupon";

//import { ListaClientes } from "./components/proceso/otro/listaClientes";
//import { Homeicon } from "@mui/icons-material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador"]} />,
    children: [
      //**************************Mantenimientos**************************
      //material
      {
        path: "/clientes",
        element: <ListaClientes />,
      },
      {
        path: "/tabla/adminsCentros",
        element: <TablaAdminCentros />,
      },
      {
        path: "/actualizar/adminCentros/:id",
        element: <ActualizarAdminCentro />,
      },
      {
        path: "/crear/adminCentros/",
        element: <CrearAdminCentro />,
      },
      {
        path: "/cupon/crear/",
        element: <CrearCupon />,
      },
      {
        path: "/cupon/actualizar/:id",
        element: <ActualizarCupon />,
      },
      {
        path: "/tabla-cupones",
        element: <TablaCupones />,
      },
      {
        path: "/reporte/canje-mes-general",
        element: <ReporteGeneralCanjesMesActual />,
      },
      {
        path: "/reporte/ecomonedas-generadas",
        element: <ReporteEcomonedasGeneradasCentro />,
      },
      {
        path: "/reporte/ecomonedas-general",
        element: <ReporteEcomonedasGeneradasGeneral />,
      },
      {
        path: "/reporte/canjes-cupon",
        element: <ReporteCanjeCupon />,
      },
    ],
  },

  {
    path: "/",
    element: (
      <Auth allowedRoles={["Administrador", "Administrador Centro Acopio"]} />
    ),
    children: [
      //**************************Mantenimientos**************************
      //material
      {
        path: "/material/crear",
        element: <CrearMaterial />,
      },
      {
        path: "/material/actualizar/:id",
        element: <ActualizarMaterial />,
      },
      {
        path: "/tabla-materiales",
        element: <TablaMateriales />,
      },

      //centro de acopio
      {
        path: "/centroAcopio/crear",
        element: <CreateCentroAcopio />,
      },
      {
        path: "/centroAcopio/actualizar/:id",
        element: <UpdateCentroAcopio />,
      },
      {
        path: "/tabla-centrosAcopio",
        element: <TablaCentrosAcopio />,
      },
      //**************************proceso de canjeo**************************
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador Centro Acopio"]} />,
    children: [
      {
        path: "/proceso-canjeomateriales",
        element: <ProcesoCanjeoMateriales />,
      },
      {
        path: "/reporte/canjes-mes",
        element: <ReporteCanjesMesActual />,
      },
      {
        path: "/reporte/canjes-annio",
        element: <ReporteCanjesAnnioActual />,
      },
      {
        path: "/reporte/ecomonedas-generadas",
        element: <ReporteEcomonedasGeneradas />,
      },
      {
        path: "/canjeosmaterialesByAdmin",
        element: <ListCanjeoMaterialesByAdmin />,
      },
      {
        path: "/detalle-canjeoMaterialesByAdmin/:id",
        element: <DetalleCanjeoMateriales />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Cliente"]} />,
    children: [
      {
        path: "/billeteravirtual",
        element: <BilleteraVirtual />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <Auth
        allowedRoles={[
          "Administrador",
          "Administrador Centro Acopio",
          "Cliente",
        ]}
      />
    ),
    children: [
      //**************************Lista de materiales**************************
      {
        path: "/material",
        element: <ListMateriales />,
      },
      {
        path: "/detalle-material/:id",
        element: <DetalleMaterial />,
      },
      //**************************Lista de centros de acopio**************************
      {
        path: "/centroAcopio",
        element: <ListCentrosAcopio />,
      },
      {
        path: "/detalle-centroacopio/:id",
        element: <DetalleCentroAcopio />,
      },

      //**************************historial**************************
      {
        path: "/historial",
        element: <Historial />,
      },

      //**************************canjeos realizados**************************
      {
        path: "/canjeosmateriales",
        element: <ListCanjeoMateriales />, //cartas de los canjeos
      },
      {
        path: "/detalle-canjeoMateriales/:id",
        element: <DetalleCanjeoMateriales />,
      },

      //**************************cambiar contrasena**************************
      {
        path: "/user/changePassword",
        element: <ChangePassword />,
      },
    ],
  },

  //**************************login**************************
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/user/login",
    element: <Login />,
  },
  {
    path: "/user/logout",
    element: <Logout />,
  },
  {
    path: "/user/create",
    element: <Signup />,
  },
]);

export default function App() {
  return (
    <UserProvider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </UserProvider>
  );
}
