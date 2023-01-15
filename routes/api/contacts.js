const express = require("express");
const favoriteRouter = require("./favorite");
const contactsController = require("../../controller/contacts.controller");
const { validateBody } = require("../../middleware/validation");
const { contactSchema } = require("../../schemas/contactSchema");

const contactsRouter = express.Router();

contactsRouter.use("/:contactId/favorite", favoriteRouter);

contactsRouter.get("/", contactsController.getContacts);

contactsRouter.get("/:contactId", contactsController.getContactById);

contactsRouter.post(
  "/",
  validateBody(contactSchema),
  contactsController.createContact
);

contactsRouter.delete("/:contactId", contactsController.removeContact);

contactsRouter.put(
  "/:contactId",
  validateBody(contactSchema),
  contactsController.updateContact
);

module.exports = contactsRouter;
