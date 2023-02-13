import dotenv from "dotenv";
dotenv.config();
let config = {
  uri: process.env.MONGO_URI,
};
export { config };