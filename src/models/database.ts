import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const ENV = process.env.NODE_ENV;

const DB_STRING =
  ENV === 'production' ? process.env.DB_STRING : process.env.DB_STRING_LOCAL;

export const connectToDB = async () => {
  try {
    console.log('Mongoose ready state is: ' + mongoose.connection.readyState);
    await mongoose.connect(DB_STRING || '');
    console.log('Mongoose ready state is: ' + mongoose.connection.readyState);
    console.log('Connected to mongodb');
  } catch (err) {
    console.log(err);
  }
};

export const closeDBConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log('Mongoose connection closed');
  } catch (err) {
    console.log('Error closing mongoose connection');
  }
};
