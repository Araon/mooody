const express = require("express");
const router = express.Router();
const firebase = require("firebase/app");
const userModel = require("../models/user");

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
firebase.initializeApp(firebaseConfig);



// Define the Google authentication route
router.get("/signup", (req, res, next) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const idToken = result.credential.accessToken;
      const user = result.user;

      userModel.findOneAndUpdate({ uid: user.uid }, { $set: user }, { upsert: true })
      .then(() => {
        res.redirect("/dashboard");
      })
      .catch((error) => {
        console.error(error);
        res.redirect("/");
      });
      res.redirect("/dashboard");
    })
    .catch((error) => {
      console.error(error);
      res.redirect("/");
    });
});

// Define the logout route
router.get("/logout", (req, res, next) => {
  firebase.auth().signOut()
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.error(error);
      res.redirect("/");
    });
});

module.exports = router;