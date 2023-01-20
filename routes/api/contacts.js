const express = require("express");
const favoriteRouter = require("./favorite");
const contactsController = require("../../controller/contacts.controller");
const { validateBody, validateId } = require("../../middleware/validation");
const { contactSchema } = require("../../schemas/contactSchema");
const { auth } = require("../../middleware/auth");

const contactsRouter = express.Router();

contactsRouter.use("/:contactId/favorite", favoriteRouter);

contactsRouter.get("/", auth, contactsController.getContacts);

contactsRouter.get(
  "/:contactId",
  validateId(),
  contactsController.getContactById
);

contactsRouter.post(
  "/",
  validateBody(contactSchema),
  contactsController.createContact
);

contactsRouter.delete(
  "/:contactId",
  validateId(),
  contactsController.removeContact
);

contactsRouter.put(
  "/:contactId",
  validateId(),
  validateBody(contactSchema),
  contactsController.updateContact
);

module.exports = contactsRouter;
