// db.connect
const mongoose = require("mongoose");
const dbConnect = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
  // show database url and port
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connected successfully");
  });
  console.log("Connected to MongoDB: ", process.env.MONGODB_URI);
};
module.exports = dbConnect;
