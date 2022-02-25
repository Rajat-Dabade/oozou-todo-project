const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./models');

const app = express();
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
    methods: 'GET, PUT, POST, PATCH, DELETE'
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json({
        message: "Application is running"
    });
});

db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and resync db");
}).catch(err => {
    console.log("Cant able to connect to database");
});

require('./routes/task.routes')(app);
require('./routes/subtask.routes')(app);



module.exports = app;