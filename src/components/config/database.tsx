import mongoose from "mongoose";

const MONGO_URL = "mongodb://0.0.0.0:27017/call-rail"; 
// const MONGO_URL = "mongodb+srv://phonebook:phonebook@phonebook.xuqgq1w.mongodb.net/callrail?retryWrites=true&w=majority"

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to database on URL ",MONGO_URL);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export const db = mongoose.connection;
