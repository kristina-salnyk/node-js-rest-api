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

module.exports = {
  userSchema,
};
