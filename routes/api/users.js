const express = require("express");
const usersController = require("../../controller/users.controller");
const { validateBody } = require("../../middleware/validation");
const { auth } = require("../../middleware/auth");
const { userSchema, subscriptionSchema } = require("../../schemas/userSchema");
const avatarsRouter = require("./avatars");

const usersRouter = express.Router();

usersRouter.use("/avatars", avatarsRouter);

usersRouter.post(
  "/register",
  validateBody(userSchema),
  usersController.register
);

usersRouter.get("/login", validateBody(userSchema), usersController.login);

usersRouter.post("/logout", auth, usersController.logout);

usersRouter.get("/current", auth, usersController.current);

usersRouter.patch(
  "/",
  auth,
  validateBody(subscriptionSchema),
  usersController.updateUserSubscription
);

module.exports = usersRouter;
