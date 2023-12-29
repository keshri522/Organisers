// here i create the whole server where my backend is running...
const mongoose = require("mongoose"); // third party modules for node.js
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

const cors = require("cors");
const bodyParser = require("body-parser");
const DatabaseConnection = require("../Server/Database/config"); // connection to databases
// import routes...
const router = require("../Server/Routes/User");
DatabaseConnection();
// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // enabling the bodyparser to access as middle warre
app.use(bodyParser.json({ limit: "5mb" })); // increase the size if data is bigger.
app.use("", router);
const Port = process.env.PORT || 5000;
app.listen(Port, () => {
  console.log(`Server is running at the ${Port}`);
});
