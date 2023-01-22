const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");

const validateBody = (schema) => {
  return (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return next(createError(400, "Missing fields"));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      return next(createError(400, error.message));
    }

    return next();
  };
};

const validateId = (schema) => {
  return (req, res, next) => {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId)) {
      return next(createError(400, `${contactId} is not correct`));
    }

    return next();
  };
};

module.exports = {
  validateBody,
  validateId,
};
