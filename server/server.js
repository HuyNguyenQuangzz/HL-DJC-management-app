const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const requestRoutes = require("./routes/request.routes");
const dbConnect = require("./config/db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Kết nối MongoDB
dbConnect();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);

const PORT = process.env.PORT || 5000;
// show host and port
app.listen(PORT, () =>
  console.log(`Server running on\n Host: ${process.env.HOST} \n Port: ${PORT}`)
);
