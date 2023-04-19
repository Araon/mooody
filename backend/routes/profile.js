const express = require("express");

const router = express.Router();

const todoModel = require("../models/todos");
const authMiddleware = require("../middleware/auth");

// showing dashboard , show all the todos
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.send(todos);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
