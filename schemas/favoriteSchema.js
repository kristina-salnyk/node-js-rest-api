const Joi = require("joi");

const favoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "Missing field favorite" }),
});

module.exports = {
  favoriteSchema,
};
