import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const URI = process.env.URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const DBconnect = async () => {
  if (cached.conn) {
    return cached.conn; // Return existing connection if available
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(URI, { dbName: 'A2ZKart', autoIndex: true })
      .then((mongoose) => {
        console.log('connected to db');
        return mongoose.connection.useDb('A2ZKart');
      })
      .catch((error) => {
        console.error('DB connection error:', error);
        throw error;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default DBconnect;
