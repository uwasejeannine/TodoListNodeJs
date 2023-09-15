const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

// In-memory storage for todos
let todos = [
  { id: 1, text: "coding" },
  { id: 1, text: "coding" },
];

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcometo to our todo list app" });
});

// Create a new TODO
app.post("/todos/post", (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  return res.status(201).json(todos);
});

// List all TODOs
app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

// Update a TODO by ID
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { text, done } = req.body;

  if (isNaN(id) || id < 0 || id >= app.locals.todos.length) {
    return res.status(404).json({ message: "TODO not found" });
  }

  if (text !== undefined) {
    app.locals.todos[id].text = text;
  }

  if (done !== undefined) {
    app.locals.todos[id].done = done;
  }

  res.json(app.locals.todos[id]);
});

// Delete a TODO by ID
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id < 0 || id >= app.locals.todos.length) {
    return res.status(404).json({ message: "TODO not found" });
  }

  const deletedTodo = app.locals.todos.splice(id, 1);
  res.json(deletedTodo[0]);
});

// Mark a TODO as done by ID
app.patch("/todos/:id/done", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id < 0 || id >= app.locals.todos.length) {
    return res.status(404).json({ message: "TODO not found" });
  }

  app.locals.todos[id].done = true;
  res.json(app.locals.todos[id]);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
