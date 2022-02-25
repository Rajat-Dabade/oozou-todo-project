const controller = require('../controllers/todo.controller');

module.exports = app => {
    app.post('/api/task', controller.createTodo);
    app.get('/api/task', controller.fetchTodo);
}