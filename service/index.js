const Contact = require("./schemas/contact");

const getContacts = () => {
  return Contact.find();
};

const getContactById = (contactId) => {
  return Contact.findOne({ _id: contactId });
};

const removeContact = (contactId) => {
  return Contact.findByIdAndRemove({ _id: contactId });
};

const addContact = (fields) => {
  return Contact.create(fields);
};

const updateContact = (contactId, fields) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, fields, { new: true });
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
