import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Login from "./Login";

const ProtectedRoute = ({ children, allowedLevel }) => {
  const { isAuthenticated, userLevel } = useContext(AuthContext);
  if (!isAuthenticated) return <Login />;
  if (allowedLevel && userLevel !== allowedLevel)
    return <div className="p-4">Access Denied</div>;
  return children;
};

export default ProtectedRoute;
