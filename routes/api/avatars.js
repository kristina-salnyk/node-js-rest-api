const express = require("express");
const usersController = require("../../controller/users.controller");
const { auth } = require("../../middleware/auth");
const { upload } = require("../../middleware/upload");

const avatarsRouter = express.Router();

avatarsRouter.patch(
  "/",
  auth,
  upload.single("avatarURL"),
  usersController.updateUserAvatar
);

module.exports = avatarsRouter;
