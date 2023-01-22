const express = require("express");
const contactsController = require("../../controller/contacts.controller");
const { favoriteSchema } = require("../../schemas/contactSchema");
const { validateBody } = require("../../middleware/validation");
const { auth } = require("../../middleware/auth");

const favoriteRouter = express.Router({ mergeParams: true });

favoriteRouter.patch(
  "/",
  auth,
  validateBody(favoriteSchema),
  contactsController.updateContactStatus
);

module.exports = favoriteRouter;
