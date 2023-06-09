const { search } = require("../Routers/userRouter");
const Product = require("../model/productSchema");

//add Product
const addProductApi = async (req, res) => {
  const { productQuantity, productName } = req.body;
  try {
    let existingProduct = await Product.findOne({ productName });

    if (existingProduct) {
      const numberQty = parseInt(productQuantity);
      existingProduct.productQuantity += numberQty;
      await existingProduct.save();

      res.status(200).json({
        success: true,
        message: "Product quantity updated successfully",
        updatedProduct: existingProduct,
      });
    } else {
      const newProduct = new Product(req.body);
      newProduct.productImg = `/uploads/${req.file.filename}`;
      await newProduct.save();

      res.status(200).json({
        success: true,
        message: "Product added successfully",
        newProduct: newProduct,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//list of all Product
const productListApi = async (req, res) => {
  try {
    const productList = await Product.find();
    res.status(200).json({
      success: true,
      message: "Here is the list of product",
      listOfProduct: productList,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//search by productName
const searchByProductName = async (req, res) => {
  const { productName } = req.params;
  try {
    const productList = await Product.find({ productName: productName });
    if (productList.length > 0) {
      res.status(200).json({
        success: true,
        message: `This is what we found with name ${productName}`,
        productList: productList,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Nothing is found with name ${productName}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//remove Product item
const deleteProductItem = async (req, res) => {
  const { productID } = req.params;
  try {
    const productToDelete = await Product.findByIdAndDelete(productID);
    if (productToDelete) {
      res.status(200).json({
        success: true,
        message: "Data deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "ID not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//update Product
const updateProductItem = async (req, res) => {
  const { productID } = req.params;
  try {
    const toUpdateProduct = await Product.findByIdAndUpdate(
      productID,
      req.body,
      { new: true } 
    );

    if (toUpdateProduct != null) {
      await toUpdateProduct.save()
      res.status(200).json({
        success: true,
        message: "Data updated successfully",
        toUpdateProduct: toUpdateProduct,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Product not found",
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
  addProductApi,
  productListApi,
  searchByProductName,
  deleteProductItem,
  updateProductItem,
};
