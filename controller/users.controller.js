const service = require("../service/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const existUser = await service.getUserByEmail(email);

    if (existUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await service.createUser({
      email,
      password: hashedPassword,
      subscription,
    });

    res
      .status(201)
      // TODO: change to selection of certain fields from db in createUser request
      .json({ user: { email: user.email, subscription: user.subscription } });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
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

    res
      .status(201)
      // TODO: change to selection of certain fields from db in updateUser request
      .json({
        token: user.token,
        user: { email: user.email, subscription: user.subscription },
      });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
