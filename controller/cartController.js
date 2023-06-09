const cart = require("../model/cartSchema");

//add
const addCartApi = async (req, res) => {
  const { userid, productid } = req.params;
  try {
    let cartData = {
      userId: userid,
      productId: productid,
    };
    const data = new cart(cartData);
    await data.save();

    const cartDetails = await cart.findById(data).populate({
      path: "productId",
      select: [
        "productName",
        "productPrice",
        "productDescription",
        "productCompany",
      ],
    });
    await cartDetails.save();
    return res.status(200).json({
      success: true,
      message: "New item added successfully",
      cartDetails: cartDetails,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//list
const listOfCart = async (req, res) => {
  try {
    const listAll = await cart.find().populate({
      path: "productId",
      select: [
        "productName",
        "productPrice",
        "productDescription",
        "productCompany",
      ],
    });
    res.status(200).json({
      success: true,
      message: "ready to go",
      listAll: listAll,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//remove
const removeCartItem = async (req, res) => {
  const { cartID } = req.params;
  try {
    const cartToRemove = await cart.findByIdAndDelete(cartID);
    if (cartToRemove) {
      return res.status(200).json({
        message: "Item deleted successfully",
        success: true,
      });
    } else {
      return res.status(404).json({
        success: false,
        error: "ID not found",
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
  addCartApi,
  listOfCart,
  removeCartItem,
};
