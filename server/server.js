const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConnect = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const dataRoutes = require("./routes/data.routes");
const itemTypeRoutes = require("./routes/itemType.routes");
const historyRoutes = require("./routes/history.routes");

require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Chỉ định origin thay vì dùng '*'
    credentials: true,
  })
);
app.use(express.json());

// Kết nối MongoDB
dbConnect();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/phe-duyet", dataRoutes);
app.use("/api/item-types", itemTypeRoutes);
app.use("/api/history", historyRoutes);

const PORT = process.env.PORT || 5000;
// show host and port
app.listen(PORT, () =>
  console.log(`Server running on\n Host: ${process.env.HOST} \n Port: ${PORT}`)
);
