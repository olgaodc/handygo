/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import categoryRouter from './routes/category';
import businessRouter from './routes/business';
import bookingRouter from './routes/booking';
import userRouter from './routes/user';

config();

const server = express();
const port = process.env.PORT || 3000;
const mongoConnect = process.env.MONGO_CONNECT;

server.use(express.json());
server.use(cors());

server.use(express.json({ limit: '50mb' }));

server.use(categoryRouter);
server.use(businessRouter);
server.use(bookingRouter);
server.use(userRouter);

mongoose.connect(mongoConnect!)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.log('err', err);
  });

server.listen(port, () => {
  console.log('Server works!!!');
});
