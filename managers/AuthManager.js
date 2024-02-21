"use-strict";

const User = require("../models/user.model");
const { generateToken } = require("../modules/jwt_token");
const bcrypt = require("bcrypt");

//================ CREATE USER MANAGER =================
module.exports.registerUserManager = async (reqObj) => {
  try {
    let result = "";

    const isUserExist = await User.findOne({ email: reqObj.email });
    if (isUserExist) {
      result = { status: 409, message: "User Already exists.Please Login" };
      return result;
    }
    const user = new User(reqObj);
    await user.save();

    const token = await generateToken(user);
    result = {
      status: 201,
      message: "Account Created successfully",
      user: user,
      token: token,
    };
    return result;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
// =============== LOGIN USER MANAGER =============================
module.exports.loginUserManager = async (reqObj) => {
  try {
    const { email, password } = reqObj;
    let result = "";
    const user = await User.findOne({ email });

    if (!user) {
      result = { status: 200, message: "Invalid Credentials" };
      return result;
    }

    if (!user || !(await user.passwordCompare(password))) {
      result = { status: 400, message: "Invalid Credentials" };
      return result;
    }

    const token = generateToken(user);

    result = {
      status: 200,
      message: "Successfully logged in",
      user,
      token,
    };
    return result;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
