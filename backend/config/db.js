import mongoose from "mongoose";

const connectDB = async (DB_URL) => {
  try {
    await mongoose.connect(DB_URL);
    console.log("[DB]: Connected Successfully");
  } catch (error) {
    console.log(`[DB]: Failed to connect ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
