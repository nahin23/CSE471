import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

function ProtectedRoute({ children }) {
  const { user } = useUserAuth();

  if (user && user.emailVerified) {
    return children;
  }
  return <Navigate to="/" />;
}

export default ProtectedRoute;
  