// const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    const e = new Error("Not authorized");
    e.status = 401;
    return next(e);
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ _id: id });

    if (!user || token !== user.token) {
      const e = new Error("Not authorized");
      e.status = 401;
      return next(e);
    }

    req.user = user;
    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      const e = new Error("Not authorized");
      e.status = 401;
      return next(e);
    }
    next(error);
  }

  // USING OF JWT-STRATEGY
  //   passport.authenticate("jwt", { session: false }, (err, user) => {
  //     if (!user || err) {
  //       const e = new Error("Not authorized");
  //       e.status = 401;
  //       return next(e);
  //     }

  //     req.user = user;
  //     return next();
  //   })(req, res, next);
};

module.exports = { auth };
