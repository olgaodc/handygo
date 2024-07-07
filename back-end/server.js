const express = require('express');
const server = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const categoryRouter = require('./api/routes/category');
const businessRouter = require('./api/routes/business');
//TO DO: const bookingRouter = require('./api/routes/booking');


server.use(express.json());
server.use(cors());

server.use(categoryRouter);
server.use(businessRouter);
//TO DO: server.use(bookingRouter);

mongoose.connect(process.env.MONGO_CONNECT)
  .then(console.log('Connected to MongoDB'))
  .catch((err) => {
    console.log('err', err);
  });

server.listen(process.env.PORT, () => {
  console.log('Server works!!!')
});