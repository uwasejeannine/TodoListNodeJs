const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

// momory of todos
let todos = [
  { id: 1, text: "coding", deleted: false, completed: false, date: new Date() },
  { id: 2, text: "coding", deleted: false, completed: false, date: new Date() },
];

// Create a new TODO
app.post("/todos/post", (req, res) => {
  const { text } = req.body;
  const newTodo = {
    id: todos.length + 1,
    text,
    deleted: false,
    completed: false,
    date: new Date(),
  };

  todos.push(newTodo);
  return res.status(201).json(newTodo);
});

// List all TODOs
app.get("/todos", (req, res) => {
  const todo = todos.filter((todo) => todo.deleted === false);
  return res.status(200).send(todo);
});

// Update a TODO
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return res.status(404).send({ message: "The todo doesn't excist" });
  }
  const updatedtodo = {
    id: todo.id,
    text: req.body.text || todo.text,
  };
  const findeIndex = todos.findIndex((todo) => todo.id === id);

  todos[findeIndex] = updatedtodo;
  return res.status(200).send(updatedtodo);
});

// Delete a TODO by ID
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).send({ error: "The todo doen't excist" });
  }
  // todos.splice(todoIndex, 1);
  todos[todoIndex].deleted = true;
  return res
    .status(200)
    .send({ message: "The todo have been sucessfulyy deleted" });
  console.log(todos[todoIndex]);
});

// Mark a TODO as done by ID
app.patch("/todos/:id/done", (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).send({ error: "The todo doen't excist" });
  }
  todos[todoIndex].completed = true;
  return res.status(200).send({ message: "The todo was marked completed" });
  console.log(todos[todoIndex]);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
