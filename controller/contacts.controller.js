const service = require("../service/contacts");

const getContacts = async (req, res, next) => {
  const { user } = req;
  const { page = 1, limit = 0, favorite } = req.query;
  const skip = (page - 1) * limit;

  try {
    const contacts = await service.getContacts(user._id, skip, limit, favorite);

    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { user } = req;
  const { contactId } = req.params;

  try {
    const contact = await service.getContactById(user._id, contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  const { user } = req;
  const { name, email, phone, favorite } = req.body;

  try {
    const contact = await service.createContact(user._id, {
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
  const { user } = req;
  const { contactId } = req.params;

  try {
    const contact = await service.removeContact(user._id, contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { user } = req;
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;

  try {
    const contact = await service.replaceContact(user._id, contactId, {
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
  const { user } = req;
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    const contact = await service.updateContact(user._id, contactId, {
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
  updateContactStatus,
};
