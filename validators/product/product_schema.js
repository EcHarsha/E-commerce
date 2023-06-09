const joi = require("joi");

const productValidationSchema = {
  productValidation: joi
    .object({
      productName: joi
        .string()
        .max(100)
        .message("name length must be at most 100 characters"),
      productDescription: joi
        .string()
        .max(100)
        .message("must be at most 100 characters")
        .required(),

      productPrice: joi
        .number()
        //.message("name length must be at most 10 characters")
        .required(),

      productCompany: joi.string().max(20).required(),
      //.message("name length must be at most 20 characters"),

      productCategory: joi.string().required(),

      productQuantity: joi.number().required(),
    })
    .unknown(true),
};
module.exports = productValidationSchema;
