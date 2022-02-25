const contoller  = require('../controllers/subTask.controller');

module.exports = app => {
    app.post('/api/subtask', contoller.createSubTask);
    app.put('/api/subtask', contoller.updateSubTask);
}