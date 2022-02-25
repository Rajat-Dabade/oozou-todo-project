const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const morgan = require('morgan');

const app =  express();
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
    methods: 'GET, PUT, POST, PATCH, DELETE'
}

app.get('/', (req, res, next) => {
    res.json({
        message: "Application is running"
    });
});

module.exports = app;