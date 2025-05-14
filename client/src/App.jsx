import React, { useContext } from "react";
import { Button } from "antd";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

const App = () => {
  const { isAuthenticated, userLevel, user, logout } = useContext(AuthContext);

  return (
    <div>
      {isAuthenticated && (
        <div className="flex justify-end p-4">
          <span>
            Welcome, {user?.username} (Level: {userLevel})
          </span>
          <Button onClick={logout} type="primary" danger>
            Logout
          </Button>
        </div>
      )}
      <ProtectedRoute allowedLevel="user">
        {userLevel === "user" && <UserLayout />}
      </ProtectedRoute>
      <ProtectedRoute allowedLevel="admin">
        {userLevel === "admin" && <AdminLayout />}
      </ProtectedRoute>
    </div>
  );
};

export default App;
