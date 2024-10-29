const mongoose = require("mongoose");

// Image Schema
const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: false,
  },
  altText: String,
});
// Color variations  Schema
const colorVariantSchema = new mongoose.Schema({
  color: {
    type: String,
    required: false,
  },
  images: [imageSchema],
  stockQuantity: {
    type: Number,
    required: false,
    min: 0,
  },
});
// Parent Schema
module.exports = (mongoose, collectionName) => {
  const schema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      createdBy: {
        type: String,
        default: "",
    },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      category: {
        type: String,
        required: true,
      },
      brand: String,
      colorVariants: [colorVariantSchema],
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("Product", schema, collectionName);
};
