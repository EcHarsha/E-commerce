const mongoose = require("mongoose");
require("./userSchema");
require("./productSchema");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "user",
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "product",
  },

  isActive: {
    type: Boolean,
    default: true,
  },
});
cartSchema.set("timestamps", true);
module.exports = mongoose.model("cart", cartSchema);
