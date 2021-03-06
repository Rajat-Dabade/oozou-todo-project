const db = require('../models');

const SubTask = db.subTask;


exports.createSubTask = (req, res) => {
    SubTask.create({
        title: req.body.title,
        status: req.body.status,
        todoId: req.body.todoId
    }).then(task => {
        if(task !== undefined) {
            return res.status(200).send({
                apiStatus: 200,
                message: "Subtask created successfully"
            });
        } else {
            return res.status(200).send({
                apiStatus: 201,
                message: "Subtask creation failed"
            })
        }
    }).catch(err => {
        return res.status(400).send({
            apiStatus: 400,
            message: "Db side error"
        })
    });
}

exports.updateSubTask = (req, res) => {
    console.log(req.body.status);
    SubTask.update({
        status: req.body.status
    }, {
        where: {
            id: req.body.id,
            todoId: req.body.todoId
        }
    }).then(data => {
        return res.status(200).send({
            apiStatus: 200,
            message: "Update status"  
        })
    }).catch(err => {
        return res.status(400).send({
            apiStatus: 400,
            message: "Failed to update status"
        })
    })
}