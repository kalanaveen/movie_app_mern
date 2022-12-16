require('express-async-errors');
const express = require('express');
const userRouter = require('./routes/user');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/error');
require('dotenv').config();
require('./db');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/user', userRouter);

app.use(errorHandler);

app.listen(8000, () => {
    console.log("the port is listening on port 8000");
})