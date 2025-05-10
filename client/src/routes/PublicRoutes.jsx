import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const PublicRoutes = () => {
  const token = localStorage.getItem("token");
  const level = localStorage.getItem("level");

  if (token) {
    return <Navigate to={level === "admin" ? "/dashboard" : "/home"} />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default PublicRoutes;
