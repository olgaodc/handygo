const express = require('express');
const server = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const categoryRouter = require('./api/routes/category');
//TO DO: const businessRouter = require('./api/routes/category');
//TO DO: const bookingRouter = require('./api/routes/category');


server.use(express.json());
server.use(cors());

server.use(categoryRouter);
//TO DO: app.use(businessRouter);
//TO DO: app.use(bookingRouter);

mongoose.connect(process.env.MONGO_CONNECT)
  .then(console.log('Connected to MongoDB'))
  .catch((err) => {
    console.log('err', err);
  });

server.listen(process.env.PORT, () => {
  console.log('Server works!!!')
});