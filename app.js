"use strict";
require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./config/connnection");
const routes = require("./config/routes");
// const corsOption = [
//   "https://ecommerce-frontend-beta-two.vercel.app",
//   "http://ecommerce-frontend-beta-two.vercel.app",
// ]

const app = express();
app.use(
  cors({
    origin: true,
  })
);
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
