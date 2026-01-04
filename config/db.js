import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

export const connectDB = async () => {
  await client.connect();
  console.log("MongoDB Connected");
  return client.db(process.env.DB_NAME);
};
