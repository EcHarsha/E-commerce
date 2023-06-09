const express = require("express");
const router = express.Router();

const cart = require("../controller/cartController");

router.get("/addcart/:userid/:productid", cart.addCartApi);
router.get("/listcart", cart.listOfCart);
router.delete("/removecart/:cartID",cart.removeCartItem);


module.exports = router;
