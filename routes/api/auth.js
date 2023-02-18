const express = require("express");
const authController = require("../../controller/auth.controller");

const authRouter = express.Router();

authRouter.get("/google", authController.googleAuth);

authRouter.get("/google-redirect", authController.googleRedirect);

module.exports = authRouter;
