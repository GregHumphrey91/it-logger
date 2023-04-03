import mongoose, { Mongoose } from 'mongoose';
import config from 'config';

const db: string = config.get('mongoURI');

const connectMongoDatabase = async () => {
  try {
    const mongoConnection: Mongoose = await mongoose.connect(db);
    console.log('Mongo Connected');
    return mongoConnection;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default connectMongoDatabase;
