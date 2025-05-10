import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ItemTypeManagement from "../pages/ItemTypeManagement";
import History from "../pages/History";
import Profile from "../pages/Profile";

const AdminRoutes = () => {
  const token = localStorage.getItem("token");
  const level = localStorage.getItem("level");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (level !== "admin") {
    return <Navigate to="/home" />;
  }

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/item-types" element={<ItemTypeManagement />} />
      <Route path="/history" element={<History />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AdminRoutes;
