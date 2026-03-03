import mongoose from 'mongoose';
// Source - https://stackoverflow.com/a/79892633
// Posted by Xoosk
// Retrieved 2026-02-21, License - CC BY-SA 4.0

import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);



const connectDB = async () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("❌ DATABASE_URL is not defined in .env file!");
    return;
  }
  try {
    await mongoose.connect(url);
    console.log("MongoDB Connected Successfully! 🔥");
  } catch (error) {
    console.error("Connection Fail:", error);
  }
};

export default connectDB;