"use strict";
require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./config/connnection");
const routes = require("./config/routes");

const app = express();
const corsOpts = {
  origin: ["http://localhost:3000", "*"],

  methods: ["GET", "POST"],
  Credential: true,
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));
app.use(helmet());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use("/test", (req, res) => {
  res.status(200).json({
    message: "welcome to test",
  });
});
require("./middlewares/Base").init(app);
require("./modules/sockets/socket").socketServer(app);
connectDB();
routes(app);

module.exports = app;
