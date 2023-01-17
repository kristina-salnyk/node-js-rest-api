const express = require("express");
const contactsController = require("../../controller/contacts.controller");
const { validateBody } = require("../../middleware/validation");
const { favoriteSchema } = require("../../schemas/favoriteSchema");

const favoriteRouter = express.Router({ mergeParams: true });

favoriteRouter.patch(
  "/",
  validateBody(favoriteSchema),
  contactsController.updateContactStatus
);

module.exports = favoriteRouter;
