const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const checkoutSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    fname: String,
    lname: String,
    phone: String,
    email: String,
    // country: {
    //   type: String,
    // },
    // street: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   min: 10,
    // },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    province: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    nearPlace: {
      type: String,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          required: true,
        },
        // sellPrice: {
        //   type: Number,
        // },
      },
    ],
    // totalPrice: {
    //   type: Number,
    //   required: true,
    // },
    // totalQty: {
    //   type: Number,
    //   required: true,
    // },
    method: {
      type: String,
      default: "COD",
    },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

checkoutSchema.pre(/^find/, function () {
  this.populate({
    path: "user",
  });
  this.populate({
    path: "products.product",
  });
});

// checkoutSchema.pre("save", function () {
//   this.populate({
//     path: "dropShipper.product",
//   });
// });

module.exports = model("Checkout", checkoutSchema);
