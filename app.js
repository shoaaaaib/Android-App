require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/config");
const colors = require("colors");
const app = express();
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");

connectDB();
app.use(morgan("dev"));
app.use("/media", express.static(path.join(__dirname, "/media")));

app.use(cors());
app.set("view engine", "ejs");
// app.use(express.urlencoded({extended:true}))

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./Routes/userRoutes"));

// app.use(Error404); //custom 404 error msg if NO route found
// app.use(Error500); //custom 500 error msg for internal server error

var port = process.env.PORT || 4040;
app.set(port);
app.listen(4040, () => {
  console.log(
    `Server up on http://${require("ip").address()}:4040`.cyan.inverse.bold
  );
});

module.exports = app;
