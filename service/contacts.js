const Contact = require("../models/contact");

const getContacts = () => {
  return Contact.find();
};

const getContactById = (contactId) => {
  return Contact.findOne({ _id: contactId });
};

const removeContact = (contactId) => {
  return Contact.findOneAndRemove({ _id: contactId });
};

const createContact = (fields) => {
  return Contact.create(fields);
};

const replaceContact = (contactId, fields) => {
  return Contact.findOneAndReplace({ _id: contactId }, fields, {
    new: true,
    runValidators: true,
  });
};

const updateContact = (contactId, fields) => {
  return Contact.findOneAndUpdate({ _id: contactId }, fields, {
    new: true,
    unValidators: true,
  });
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  createContact,
  replaceContact,
  updateContact,
};
