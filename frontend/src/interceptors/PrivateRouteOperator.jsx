import { Outlet, Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const PrivateRouteOperator = ({ isAuth, rolIdRol }) => {
  if(!isAuth){
    return <Navigate to="/SingIn" />;
  }else if(rolIdRol === 1){
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

