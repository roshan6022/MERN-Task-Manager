import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("Connected to database");
  } catch (err) {
    console.error("Error connecting to database", err);
    process.exit(1);
  }
};

export default connectDB;
