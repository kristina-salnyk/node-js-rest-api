const service = require("../service/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
  const { email, password, subscription } = req.body;

  try {
    const existUser = await service.getUserByEmail(email);

    if (existUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const avatarURL = gravatar.url(email, { protocol: "http", s: 250 });

    const user = await service.createUser({
      email,
      password: hashedPassword,
      subscription,
      avatarURL,
    });

    res
      .status(201)
      .json({ user: { email: user.email, subscription: user.subscription } });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existUser = await service.getUserByEmail(email);

    if (!existUser) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isValidPassword = await bcrypt.compare(password, existUser.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const payload = { id: existUser._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    const user = await service.updateUser(existUser._id, { token });

    res.json({
      token: user.token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const { user } = req;

  try {
    await service.updateUser(user._id, { token: "" });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const current = async (req, res, next) => {
  const { user } = req;

  try {
    res.json({ email: user.email, subscription: user.subscription });
  } catch (error) {
    next(error);
  }
};

const updateUserSubscription = async (req, res, next) => {
  const { user } = req;
  const { subscription } = req.body;

  try {
    const existUser = await service.updateUser(user._id, {
      subscription,
    });

    if (!existUser) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ email: existUser.email, subscription: existUser.subscription });
  } catch (error) {
    next(error);
  }
};

const updateUserAvatar = async (req, res, next) => {
  const { user } = req;
  const { filename } = req.file;
  const {
    protocol,
    headers: { host },
  } = req;

  const uploadPath = path.resolve("./tmp", filename);
  const publicPath = path.resolve("./public/avatars", filename);

  try {
    const img = await Jimp.read(uploadPath);
    img.cover(250, 250).write(publicPath);

    await fs.unlink(uploadPath);

    const existUser = await service.updateUser(user._id, {
      avatarURL: `/avatars/${path.basename(publicPath)}`,
    });

    if (!existUser) {
      return res.status(404).json({ message: "Not found" });
    }

    const avatarURL = existUser.avatarURL.startsWith("/avatars")
      ? `${protocol}://${host}${existUser.avatarURL}`
      : existUser.avatarURL;

    res.json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  current,
  updateUserSubscription,
  updateUserAvatar,
};
