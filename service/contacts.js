const Contact = require("../models/contact");

const getContacts = (owner, skip, limit, favorite) => {
  const filters = { owner };
  if (favorite !== undefined) {
    filters.favorite = favorite;
  }

  return Contact.find(filters, "_id name email phone favorite", {
    skip,
    limit,
  });
};

const getContactById = (owner, contactId) => {
  return Contact.findOne(
    { owner, _id: contactId },
    "_id name email phone favorite"
  );
};

const createContact = (owner, fields) => {
  return Contact.create({ ...fields, owner });
};

const removeContact = (owner, contactId) => {
  return Contact.findOneAndRemove({ owner, _id: contactId });
};

const replaceContact = (owner, contactId, fields) => {
  return Contact.findOneAndReplace(
    { owner, _id: contactId },
    { ...fields, owner },
    {
      new: true,
      runValidators: true,
    }
  );
};

const updateContact = (owner, contactId, fields) => {
  return Contact.findOneAndUpdate({ owner, _id: contactId }, fields, {
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
