const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({ "any.required": "Missing required name field" }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Missing required email field" }),
  phone: Joi.string()
    .min(10)
    .max(15)
    .pattern(/^\+?[0-9\-() ]+$/)
    .required()
    .messages({
      "any.required": "Missing required phone field",
      "string.pattern.base":
        "Phone number can includes digits, spaces or next symbols: +, -, (, )",
    }),
  favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "Missing field favorite" }),
});

module.exports = {
  contactSchema,
  favoriteSchema,
};
