import mongoose from "mongoose";

const MONGO_URL = "mongodb://0.0.0.0:27017/call-rail"; // Replace with your MongoDB connection URL

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to database on URL ",MONGO_URL);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export const db = mongoose.connection;
