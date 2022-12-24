require('express-async-errors');
const express = require('express');
const userRouter = require('./routes/user');
const morgan = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./middleware/error');
const { handleNotFound } = require('./utils/helper');
require('dotenv').config();
require('./db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/user', userRouter);

app.use('/*', handleNotFound);

app.use(errorHandler);

app.listen(8000, () => {
    console.log("the port is listening on port 8000");
})