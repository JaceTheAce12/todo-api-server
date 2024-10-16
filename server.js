const express = require('express');
const app = express();
const port = 3000;
const todos = require('./modules/todos');

app.use(express.json());

app.get('/todos', (req, res) => {
    res.send(todos);
});

app.post('/todos', (req, res) => {
    const newTodo = {
        todoId: todos.length,
        todoText: req.body.todoText,
        todoComplete: req.body.todoComplete,
        category: req.body.category,
        dueDate: req.body.dueDate
    };
    todos.push(newTodo);
    res.send(newTodo);
});

app.put('/todos/:todoId', (req, res) => {
    const todoId = parseInt(req.params.todoId);
    const todo = todos.find(todo => todo.todoId === todoId);

    todo.todoText = req.body.todoText;
    todo.todoComplete = req.body.todoComplete;
    todo.category = req.body.category;
    todo.dueDate = req.body.dueDate;
    res.send(todo);
});

app.delete('/todos/:todoId', (req, res) => {
    const todoId = parseInt(req.params.todoId);
    const todoIndex = todos.findIndex(todo => todo.todoId === todoId);

    if (todoIndex > -1) {
        const deletedTodo = todos.splice(todoIndex, 1);
        res.send(deletedTodo);
    }
});

app.get('/todos/category/:category', (req, res) => {
    const category = req.params.category;
    const categoryTodos = todos.filter(todo => todo.category === category);
    res.send(categoryTodos);
});

app.get('/categories', (req, res) => {
    const categories = [...new Set(todos.map(todo => todo.category))];  
    res.send(categories);
});

app.post('/categories', (req, res) => {
    const category = req.body.category;
    res.send(category);
});

app.put('/categories/:todoId/:category', (req, res) => {
    const category = req.params.category;
    const newCategory = req.body.newCategory;

    todos.forEach(todo => {
        if (todo.category === category) {
            todo.category = newCategory;
        }
    });

    res.send(todos);
});

app.delete('/categories/:category', (req, res) => {
    const category = req.params.category;

    todos.forEach(todo => {
        if (todo.category === category) {
            delete todo.category;
        }
    });

    res.send(todos);
});

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});