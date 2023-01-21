const express = require("express");
const favoriteRouter = require("./favorite");
const contactsController = require("../../controller/contacts.controller");
const { validateBody, validateId } = require("../../middleware/validation");
const { auth } = require("../../middleware/auth");
const { contactSchema } = require("../../schemas/contactSchema");

const contactsRouter = express.Router();

contactsRouter.use("/:contactId/favorite", favoriteRouter);

contactsRouter.get("/", auth, contactsController.getContacts);

contactsRouter.get(
  "/:contactId",
  auth,
  validateId(),
  contactsController.getContactById
);

contactsRouter.post(
  "/",
  auth,
  validateBody(contactSchema),
  contactsController.createContact
);

contactsRouter.delete(
  "/:contactId",
  auth,
  validateId(),
  contactsController.removeContact
);

contactsRouter.put(
  "/:contactId",
  auth,
  validateId(),
  validateBody(contactSchema),
  contactsController.updateContact
);

module.exports = contactsRouter;
