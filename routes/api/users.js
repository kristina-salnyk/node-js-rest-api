const express = require("express");
const usersController = require("../../controller/users.controller");
const { validateBody } = require("../../middleware/validation");
const { userSchema } = require("../../schemas/userSchema");

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validateBody(userSchema),
  usersController.register
);

usersRouter.post("/login", validateBody(userSchema), usersController.login);

module.exports = usersRouter;
