import mongoose from "mongoose";
import env from "dotenv/config"

const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI )
    const conn = await mongoose.connect(process.env.MONGODB_URI  || "mongodb://127.0.0.1:27017/highwaydelite");
    console.log("Database Connected Successfully ");

  } catch (error) {
    console.error(` Error: ${error.message}`);
    process.exit(1);  
  }
};

export default connectDB;
