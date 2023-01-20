const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const User = require("../models/user");

const { JWT_SECRET } = process.env;

const params = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, function (payload, done) {
    User.findById(payload.id)
      .then((user) => {
        if (!user) {
          return done(new Error("User not found"));
        }
        return done(null, user);
      })
      .catch((err) => done(err));
  })
);
