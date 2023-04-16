const express = require("express");
const router = express.Router();
const firebase = require("firebase/app");
require('firebase/auth')
const userModel = require("../models/user");

const { GoogleAuthProvider } = require("firebase/auth");
const { getAuth , signInWithPopup, signOut} = require('firebase/auth')
const { initializeApp } = require('firebase/app')


// Initialize the Firebase Client SDK
const firebaseConfig = {
  apiKey: "AIzaSyD4P8RoxpMGJpPU6JVxjGXF2qr_us4AdOg",
  authDomain: "moody-araon.firebaseapp.com",
  projectId: "moody-araon",
  storageBucket: "moody-araon.appspot.com",
  messagingSenderId: "672945645079",
  appId: "1:672945645079:web:d10335a8719b9d0346de52",
  measurementId: "G-2BQCBRQYQQ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// Define the Google authentication route
router.get("/login", (req, res, next) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const idToken = result.credential.accessToken;
      const user = result.user;

      userModel.findOneAndUpdate({ uid: user.uid }, { $set: user, $set: idToken }, { upsert: true })
      .then(() => {
        res.redirect("/api/dashboard");
      })
      .catch((error) => {
        console.error(error);
        res.redirect("/");
      });
      res.redirect("/api/dashboard");
    })
    .catch((error) => {
      console.error(error);
      res.redirect("/");
    });
});

// Define the logout route
router.get("/logout", (req, res, next) => {
  signOut(auth)
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.error(error);
      res.redirect("/");
    });
});

module.exports = router;
