const express = require('express');
const userRouter = require('./routes/user');
const morgan = require('morgan');
require('./db')
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/user',userRouter);
app.listen(8000, () => {
    console.log("the port is listening on port 8000");
})