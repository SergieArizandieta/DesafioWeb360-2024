import { Outlet, Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const PrivateRouteClient = ({isAuth, rolIdRol }) => {
  if(!isAuth){
    return <Navigate to="/SingIn" />;
  }else if(rolIdRol === 2){
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

