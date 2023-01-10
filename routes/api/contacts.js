const express = require("express");
const { contactSchema } = require("../../schemas/contactSchema");
const { validateBody } = require("../../middleware/validation");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateBody(contactSchema), async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const contact = await addContact({ name, email, phone });
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    await removeContact(contactId);
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:contactId",
  validateBody(contactSchema),
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const { name, email, phone } = req.body;
      const contact = await updateContact(contactId, { name, email, phone });
      res.json(contact);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
