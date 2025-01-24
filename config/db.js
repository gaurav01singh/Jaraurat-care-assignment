import e from "express";
import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected${conn.connection.host}`);
  } catch (error) {
    console.log(e)
  }
};

export default connectDB;