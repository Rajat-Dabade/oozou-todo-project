const config = require('../config/db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAlaises: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.todo = require('./todo.model')(sequelize, Sequelize.DataTypes);
db.subTask = require('./subtask.model')(sequelize, Sequelize.DataTypes);

db.todo.hasMany(db.subTask, {as: "subtasks"});
db.subTask.belongsTo(db.todo, {
    foreignKey: "todoId", 
    as: "todo"
});

module.exports = db;