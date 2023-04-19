const express = require("express");
const router = express.Router();
const passport = require("passport");
const isLoggedIn = require("../middleware/auth");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const { userModel } = require("../models/todos");

router.use(passport.initialize());
router.use(passport.session());


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        let user = await userModel.findOne({ uid: profile.id });
        if (!user) {
          user = new userModel({
            uid: profile.id, 
            name: profile.displayName,
            email: profile.email,
            profilePicture: profile.picture,
          });
          await user.save();
        }
        return done(null, profile);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Define the Google authentication route
router.get("/login", (req, res, next) => {
  res.send('<a href="/google">Login with Google</a>');
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/profile", isLoggedIn, (req, res, next) => {
  res.send(`<h1>Hello ${req.user.displayName}</h1>
  <img src="${req.user.picture}"/>
  <a href="/logout">Logout</a>`);
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

module.exports = router;
