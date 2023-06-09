const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    require: true,
  },
  productDescription: {
    type: String,
    require: true,
  },
  productCompany: {
    type: String,
    require: true,
  },
  productCategory: {
    type: String,
    require: true,
  },
  productPrice: {
    type: Number,
    require: true,
  },
  productImg: {
    type: String,
  },
  productQuantity: {
    type: Number,
    require: true,
  },
  userRole: {
    type: String,
    default: "user",
  },
  isActive: {
    type: Boolean,
    require: true,
    dafault: true,
  },
});
productSchema.set("timestamps", true);
module.exports = mongoose.model("product", productSchema);
