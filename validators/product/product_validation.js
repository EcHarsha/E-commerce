const product =require('./product_schema')
module.exports = {
  productValidation: async (req, res, next) => {
    const value = await product.productValidation.validate(req.body, {
      abortEarly: false,
    });
    if (value.error) {
      res.json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
