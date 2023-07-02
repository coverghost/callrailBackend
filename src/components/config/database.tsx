import mongoose from "mongoose";
import {env} from "../../env";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(env.mongodb.url);
    console.log("Connected to database on URL ", env.mongodb.url);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export const db = mongoose.connection;
