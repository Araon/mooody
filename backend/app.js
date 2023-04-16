const express = require("express");
const app = express();
const admin = require("firebase-admin");
const firebase = require("firebase/app");

const serviceAccount = require("./config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mooody-1.firebaseio.com",
});

const todoModel = require("./models/todos");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");
const usersRoutes = require("./routes/users");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup / route to serve index page
app.get("/", (req, res) => {
  res.send("Hello World");
});

// use auth routes
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;