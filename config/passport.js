// USING OF JWT-STRATEGY
const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const User = require("../models/user");

const { JWT_SECRET } = process.env;

const params = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await User.findOne({ _id: payload.id });
      if (!user) {
        return done(false);
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);
