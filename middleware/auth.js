const passport = require("passport");

const auth = (req, res, next) => {
  console.log(passport.Strategy);
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return next(err);
    }

    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = { auth };
