import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedUserRoute() {
  const user = useSelector((state) => state.user.user);

  return user ? <Navigate to="/" replace /> : <Outlet />;
}

export default ProtectedUserRoute;
