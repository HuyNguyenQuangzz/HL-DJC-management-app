import ProtectedRoute from "./components/ProtectedRoute";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import Navbar from "./components/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import CreateRequest from "./pages/CreateRequest";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ItemTypeManagement from "./pages/ItemTypeManagement";
import ItemTypes from "./pages/ItemTypes";
const App = () => {
  const { isAuthenticated, userLevel } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-request" element={<CreateRequest />} />
          <Route path="/item-type" element={<ItemTypeManagement />} />
          <Route
            path="/item-types"
            element={
              // <ProtectedRoute allowedLevel="admin">
              // {userLevel === "admin" &&
              <ItemTypes />
              // }
              // </ProtectedRoute>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
