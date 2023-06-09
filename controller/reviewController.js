const review = require("../model/reviewSchema");

//add
const addReviewApi = async (req, res) => {
  const { userid, productid } = req.params;
  try {
    const reviewData = new review(req.body);
    if (reviewData != "") {
      (reviewData.userId = userid),
        (reviewData.productId = productid),
        await reviewData.save();
      res.status(200).json({
        success: true,
        message: "New review added successfully",
        reviewData: reviewData,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "No comment added",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//list of all reviw
const listOfReview = async (req, res) => {
  try {
    const reviews = await review.find();
    res.status(200).json({
      success: true,
      message: "Here are all the Reviews",
      listAll: reviews,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//remove
const removeReview = async (req, res) => {
  const { ReviewID } = req.params;
  try {
    const reviewToRemove = await review.findByIdAndDelete(ReviewID);
    if (reviewToRemove) {
      return res.status(200).json({
        success: true,
        message: "Data deleted successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        error: "ReviewID not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//update
const updateReview = async (req, res) => {
  const { ReviewID } = req.params;
  try {
    const toUpdateReview = await review.findByIdAndUpdate(ReviewID, req.body);
    if (toUpdateReview) {
      await toUpdateReview.save();
      return res.status(200).json({
        success: true,
        message: "Review updated successfully",
        toUpdateReview: toUpdateReview,
      });
    } else {
      return res.status(404).json({
        success: false,
       message: "ReviewID not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
module.exports = {
  addReviewApi,
  listOfReview,
  removeReview,
  updateReview,
};
