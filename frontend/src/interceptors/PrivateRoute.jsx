import { Outlet, Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ isAuth, rolIdRol }) => {
  if(isAuth){
    if(rolIdRol === 1){
      return <Navigate to="/Store" />;
    }else{
      return <Navigate to="/" />;
    }
  }
  return <Outlet/>;
};

