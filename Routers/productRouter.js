const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/imageStorage");
const product = require("../controller/productController");
const { isUser, isAdmin, isVendor } = require("../middleware/authorization");
const validate = require("../validators/product/product_validation");

router.post(
  "/addproduct",
  upload.single("productImg"),
  validate.productValidation,
  isVendor,
  product.addProductApi
);
router.get("/listproduct", product.productListApi);
router.delete("/removeproduct/:productID", isVendor, product.deleteProductItem);
router.patch(
  "/updateproduct/:productID",
  upload.single("productImg"),
  isVendor,
  product.updateProductItem
);
router.get("/searchproduct/:productName", product.searchByProductName);

module.exports = router;
