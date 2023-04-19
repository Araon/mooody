const express = require("express");
const router = express.Router();

const { tododb, userModel } = require("../models/todos");
const isLoggedIn = require("../middleware/auth");


//gettin all todos
router.get("/todo", isLoggedIn, async (req, res) => {
  try {
    const todos = await todoModel.find({ uid: req.user.uid});
    res.send(todos);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


//creating a new todo
router.post("/todo", isLoggedIn, async (req, res) => {
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



module.exports = router;
