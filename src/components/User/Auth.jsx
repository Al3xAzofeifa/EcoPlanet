import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
export function Auth(allowedRoles) {
  const location = useLocation();
  const { user, autorize } = useContext(UserContext);
  let render = "";
  // Especificar el render si el usuario esta autorizado
  if (user && autorize(allowedRoles)) {
    render = <Outlet />;
  } else {
    render = <Navigate to="/unauthorized" state={{ from: location }} />;
  }

  return <div>{render}</div>;
}
