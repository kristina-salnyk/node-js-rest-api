const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Missing required email field" }),
  password: Joi.string().min(6).max(20).required().messages({
    "any.required": "Missing required password field",
  }),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({ "any.required": "Missing field subscription" }),
});

const verifySchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Missing required email field" }),
});

module.exports = {
  userSchema,
  subscriptionSchema,
  verifySchema,
};
