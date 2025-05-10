import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import "./index.css";

function App() {
  const token = localStorage.getItem("token");
  const level = localStorage.getItem("level");

  return (
    <Router>
      {token && <Navbar />}
      {level === "admin" ? <AdminRoutes /> : <PrivateRoutes />}
      <PublicRoutes />
    </Router>
  );
}

export default App;
