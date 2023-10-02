const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { Sequelize } = require('sequelize');

const Todo = require('../models/Todo');

const app = express();
app.use(bodyParser.json());

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

app.post('/todos/post', async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const newTodo = await Todo.create({
      title,
      description,
      status,
      deleted: false,
      completed: false,
      date: new Date(),
    });
    return res.status(201).json(newTodo);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { deleted: false } });
    return res.status(200).send(todos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.put('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const todo = await Todo.findOne({ where: { id } });

    if (!todo) {
      return res.status(404).send({ message: 'The todo doesn\'t exist' });
    }

    const updatedTodo = await todo.update({
      title: req.body.title || todo.title,
      description: req.body.description || todo.description,
      status: req.body.status || todo.status,
    });

    return res.status(200).send(updatedTodo);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const todo = await Todo.findOne({ where: { id } });

    if (!todo) {
      return res.status(404).send({ error: 'The todo doesn\'t exist' });
    }

    await todo.update({ deleted: true });

    return res.status(200).send({ message: 'The todo has been successfully deleted' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.patch('/todos/:id/done', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const todo = await Todo.findOne({ where: { id } });

    if (!todo) {
      return res.status(404).send({ error: 'The todo doesn\'t exist' });
    }

    await todo.update({ completed: true });

    return res.status(200).send({ message: 'The todo was marked completed' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
