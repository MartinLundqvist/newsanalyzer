import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_STRING = process.env.DB_STRING || '';

export const connectToDB = async () => {
  try {
    console.log('Mongoose ready state is: ' + mongoose.connection.readyState);
    await mongoose.connect(DB_STRING);
    console.log('Mongoose ready state is: ' + mongoose.connection.readyState);
    console.log('Connected to mongodb');
  } catch (err) {
    console.log(err);
  }
};
