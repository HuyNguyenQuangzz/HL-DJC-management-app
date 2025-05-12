import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import ActivityHistory from "../pages/ActivityHistory";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  const { user } = useAuthStore();

  if (!user)
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );

  return (
    <Routes>
      {user.level === "admin" ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<ActivityHistory />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </>
      )}
    </Routes>
  );
}
