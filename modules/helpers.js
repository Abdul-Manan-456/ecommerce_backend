"use strict";

const jwt = require("jsonwebtoken");
const _ = require("underscore");
const nodemailer = require("nodemailer");

module.exports.isAdmin = (req, res, next) => {
  try {
    if (req?.user?.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Access Denied" });
    }
  } catch (error) {
    throw error;
  }
};

module.exports.generateInvoiceNumber = () => {
  const timestamp = Date.now().toString(); // Get the current timestamp as a string
  const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
  const paddedNum = randomNum.toString().padStart(3, "0"); // Pad the random number with leading zeros if necessary
  return timestamp + paddedNum;
};

module.exports.verifyJWTToken = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRETE_KEY, (err, decoded) => {
    return { err: err, decoded: decoded };
  });
};
