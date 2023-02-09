const User = require("../models/user");

const getUserByEmail = (email) => {
  return User.findOne({ email });
};

const createUser = (fields) => {
  return User.create(fields);
};

const updateUser = (userId, fields) => {
  return User.findOneAndUpdate({ _id: userId }, fields, {
    new: true,
    unValidators: true,
  });
};

const getUserByVerificationToken = (verificationToken) => {
  return User.findOne({ verificationToken });
};

module.exports = {
  getUserByEmail,
  createUser,
  updateUser,
  getUserByVerificationToken,
};
