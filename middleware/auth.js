const passport = require("passport");

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      const e = new Error("Not authorized");
      e.status = 401;
      return next(e);
    }

    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = { auth };
