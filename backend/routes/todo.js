const express = require("express");
const router = express.Router();

const todoModel = require("../models/todos");
const authMiddleware = require("../middleware/auth");

//creating a new todo

router.post("/todo", authMiddleware, async (req, res) => {
  try {
    const todo = new todo({
      name: req.body.name,
      desc: {
        points: req.body.desc.points,
      },
      task_by: req.body.task_by,
      deadline: req.body.deadline,
      mood: req.body.mood,
      crit: req.body.crit,
      metadata: {
        image_url: req.body.metadata.image_url,
      },
      created_at: new Date().toISOString(),
      last_updated: new Date().toISOString(),
      updated_by: req.body.updated_by,
    });
    const result = await todo.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//gettin all todos
router.get("/todo", authMiddleware , async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.send(todos);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;