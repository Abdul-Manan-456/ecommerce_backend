"use strict";
require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./config/connnection");
const routes = require("./config/routes");

const app = express();
app.use(
  cors({
    origin: [
      "https://ecommerce-frontend-beta-two.vercel.app",
      "http://ecommerce-frontend-beta-two.vercel.app",
    ],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(helmet());

app.use("/test", (req, res) => {
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

  const url = req.url;
  res.status(200).json({
    message: "welcome to test",
    fullUrl: fullUrl,
    "url----------": url,
  });
});
require("./middlewares/Base").init(app);
require("./modules/sockets/socket").socketServer(app);
connectDB();
routes(app);

module.exports = app;
