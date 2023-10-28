const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Inisialisasi Sequelize
const sequelize = new Sequelize({
  dialect: 'postgres',
  username: 'postgres',
  password: '29122001',
  database: 'Todo_db',
  host: 'localhost',
});

// Membuat model Todo
const Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Menyinkronkan model dengan database
sequelize.sync();


// List All Todo
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil todos' });
  }
});

// Detail Todo
app.get('/todos/:id', async (req, res) => {
    const todoId = req.params.id;
    try {
      const todos = await Todo.findByPk(todoId);
      if (!todos) {
        return res.status(404).json({ error: 'Todo tidak ditemukan' });
      }
      res.json(todos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Gagal mengambil todo' });
    }
  });
  
// Create Todo
 app.post('/todos', async (req, res) => {
    try {
      const { title } = req.body;
      const todo = await Todo.create({ title });
      res.json(todo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Gagal menambahkan todo' });
    }
  });

  // Soft Delete Todo
  app.delete('/todos/:id', async (req, res) => {
    const todoId = req.params.id;
    try {
      const todo = await Todo.findByPk(todoId);
      if (!todo) {
        return res.status(404).json({ error: 'Todo tidak ditemukan' });
      }
      await todo.destroy();
      res.json({ message: 'Todo dihapus (soft delete)' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Gagal menghapus todo' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
