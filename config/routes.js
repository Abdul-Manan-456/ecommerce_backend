"use-strict";

module.exports = (app) => {
  // app.use("/api/v1/hi", (req, res) => {
  //   res.status(200).send("hi from backend");
  // });
  app.use("/api/v1/auth", require("../controller/AuthController"));
  app.use("/api/v1/product", require("../controller/ProductController"));
  app.use("/api/v1/checkout", require("../controller/CheckoutController"));

  app.use("/api/v1/user", require("../controller/UserController"));
};
