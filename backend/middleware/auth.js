const admin = require("firebase-admin");

module.exports = (req, res, next) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];
  admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      console.error(error);
      res.status(401).json({ error: "Unauthorized" });
    });
};
