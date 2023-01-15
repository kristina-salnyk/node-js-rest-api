const db = require("../db/contacts");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await db.getContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await db.getContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    const contact = await db.createContact({
      name,
      email,
      phone,
      favorite,
    });

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await db.removeContact(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone, favorite } = req.body;
    const contact = await db.replaceContact(contactId, {
      name,
      email,
      phone,
      favorite,
    });

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const updateContactStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const contact = await db.updateContact(contactId, {
      favorite,
    });

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
  updateContactStatus
};
