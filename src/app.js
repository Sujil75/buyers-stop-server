const express = require('express');
const cors = require('cors');
const errMiddleware = require('./middlewares/errMiddleware');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello, Buyers stop backend starts here!");
});

app.use(errMiddleware);

module.exports = app;