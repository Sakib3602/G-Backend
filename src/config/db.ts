import mongoose from 'mongoose';
// Source - https://stackoverflow.com/a/79892633
// Posted by Xoosk
// Retrieved 2026-02-21, License - CC BY-SA 4.0

import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);



const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("MongoDB Connected Successfully! 🔥");
  } catch (error) {
    console.error("Connection Fail:", error);
  }
};

export default connectDB;