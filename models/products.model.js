const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    // _id: {
    //   type: mongoose.Types.ObjectId,
    // },
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
    },

    price: {
      type: Number,
    },

    rating: {
      rate: {
        type: Number,
        min: 1,
        max: 5,
      },
      count: {
        type: Number,
      },
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["draft", "published", "deleted"],
      default: "draft",
    },
    image: {
      type: String,
    },
    // deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

productSchema.pre(/^find/, function () {
  this.populate({
    path: "brand",
  });
  this.populate({
    path: "category",
  });
  this.populate({
    path: "variations.variationIds",
  });
});

module.exports = model("Product", productSchema);
