import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function ProtectedRoute({ children, requiredLevel }) {
  const { user } = useAuthStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredLevel && user.level !== requiredLevel) {
    return (
      <Navigate to={user.level === "admin" ? "/dashboard" : "/home"} replace />
    );
  }

  return children;
}

export default ProtectedRoute;
