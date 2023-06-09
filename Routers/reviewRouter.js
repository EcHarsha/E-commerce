const express = require("express");
const router = express.Router();

const review = require("../controller/reviewController");
const { isAdmin, isVendor, isUser } = require("../middleware/authorization");

router.post("/addreview/:userid/:productid",review.addReviewApi);
router.get("/listreview", review.listOfReview);
router.delete("/removereview/:ReviewID", isVendor, review.removeReview);
router.patch("/updatereview/:ReviewID", review.updateReview);

module.exports = router;
