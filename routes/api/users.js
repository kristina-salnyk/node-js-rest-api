const express = require("express");
const usersController = require("../../controller/users.controller");
const { validateBody } = require("../../middleware/validation");
const { auth } = require("../../middleware/auth");
const { userSchema } = require("../../schemas/userSchema");

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validateBody(userSchema),
  usersController.register
);

usersRouter.post("/login", validateBody(userSchema), usersController.login);

usersRouter.post("/logout", auth, usersController.logout);

usersRouter.post("/current", auth, usersController.current);

module.exports = usersRouter;
