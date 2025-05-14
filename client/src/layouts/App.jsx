// src/App.jsx
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import LoadingSpinner from "../components/LoadingSpinner";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Register from "../pages/Signup";
import Layout from "./Layout";
import Home from "../pages/Home";

function App() {
  const { initialize, isAuthenticated, loading } = useAuthStore();

  // Initialize auth state on app load
  useEffect(() => {
    initialize();
  }, [initialize]);

  if (loading) {
    return (
      <div className="app-loading">
        <LoadingSpinner />
        <p>Initializing application...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="register"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
            }
          />

          {/* Protected routes */}
          <Route
            path="dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />

          {/* 404 page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
