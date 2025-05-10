import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  const level = localStorage.getItem("level");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (level === "admin") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default PrivateRoutes;
