import mongoose from "mongoose";
import env from "./env";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;