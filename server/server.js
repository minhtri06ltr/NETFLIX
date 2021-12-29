const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/user");
const movieRoutes = require("./src/routes/movie");
const listRoutes = require("./src/routes/list");
//connect
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connect successfull"))
  .catch((error) => console.log(error));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/lists", listRoutes);
app.listen(5000, () => {
  console.log("Server is running ");
});
