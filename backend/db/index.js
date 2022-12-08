const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/review_app')
  .then(() => {
    console.log('db connected');
  })
  .catch((ex) => {
    console.log('db connection failed', ex);
  });