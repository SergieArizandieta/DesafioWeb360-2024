import { Outlet, Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const PrivateRouteOperator = ({ redirectTo, isAllowed }) => {
  if (!isAllowed)  return <Navigate to={redirectTo}/> ;
  return <Outlet />;
};

