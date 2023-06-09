const express = require("express");
const router = express.Router();

const userRouter = require("../Routers/userRouter");
const productRouter = require("../Routers/productRouter");
const cartRouter = require("../Routers/cartRouter");
const reviewRouter = require("../Routers/reviewRouter");

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);
router.use("/review", reviewRouter);

module.exports = router;
