// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
// import Footer from "./Footer";
import useAuthStore from "../store/authStore";

const Layout = () => {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <div className="app-container">
      <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />

      <main className="main-content">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
