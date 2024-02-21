"use strict";
const { httpsCodes } = require("../config/contants");
const { language } = require("../language/en/language");
const Checkout = require("../models/checkout.model");

class CheckoutManager {
  // ============ Create ========
  static async createCheckout(req, res) {
    try {
      let result = "";
      result = { status: httpsCodes.NOT_FOUND, message: language.NOT_FOUND };
      const chekcout = await Checkout.create(req.body);
      result = {
        status: httpsCodes.CREATED,
        message: "Thanks for Shopping",
      };
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // =========== Get All ============
  static async getAllCheckout() {
    try {
      let result = "";
      const data = await Checkout.find();
      result = { status: httpsCodes.NOT_FOUND, message: language.NOT_FOUND };

      if (data.length !== 0) {
        result = {
          status: httpsCodes.SUCCESS_CODE,
          counts: data.length,
          message: language.RECORD_FOUND,
          result: data,
        };
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  // ======= GET BY ID ======
  static async getCheckout(req) {
    try {
      let result = "";

      if (req?.user?._id) {
        var data = await Checkout.find({ user: req.user._id });
      }
      result = { status: httpsCodes.NOT_FOUND, message: language.NOT_FOUND };

      if (data) {
        result = {
          status: httpsCodes.SUCCESS_CODE,
          message: language.RECORD_FOUND,
          result: data,
        };
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  // ========== Update =========
  static async updateCheckout(id, reqBody) {
    try {
      let result = "";

      const data = await Checkout.findByIdAndUpdate(id, reqBody, { new: true });

      result = { status: httpsCodes.NOT_FOUND, message: language.NOT_FOUND };

      if (data) {
        result = {
          status: httpsCodes.CREATED,
          message: language.ONE_RECORD_UPDATE,
          result: data,
        };
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  // ======== Delete =========
  static async deleteCheckout(req) {
    try {
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CheckoutManager;
