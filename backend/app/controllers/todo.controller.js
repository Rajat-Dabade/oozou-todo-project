const db = require('../models');

const Todo = db.todo;

exports.createTodo = (req, res) => {
    Todo.create({
        title: req.body.title,
        status: req.body.status
    }).then(task => {
        if (task !== undefined) {
            return res.status(200).send({
                apiStatus: 200,
                message: "Task created successfully"
            });
        } else {
            return res.status(200).send({
                apiStatus: 201,
                message: "Task creation failed"
            });
        }
    }).catch(err => {
        return res.status(400).send({
            apiStatus: 400,
            message: "DB side error please contract technical team"
        });
    })
}

exports.fetchTodo = (req, res) => {
    Todo.findAll({ include: ["subtasks"] }).then(data => {
        if (data !== undefined && data.length !== 0) {
            return res.status(200).send({
                apiStatus: 200,
                data
            })
        } else {
            return res.status(201).send({
                apiStatus: 201,
                message: "No data available"
            })
        }
    }).catch(err => {
        return res.status(400).send({
            apiStatus: 400,
            message: "DB side error please contract technical team"
        });
    });
}

exports.updateTodo = (req, res) => {

    console.log("Updating subStatus");
    Todo.update({
        status: req.body.status
    }, {
        where: {
            id: req.body.id
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