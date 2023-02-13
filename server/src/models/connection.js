import mongoose from "mongoose";
import { config } from "../config/database.config.js";
mongoose.connect(config.uri);
const conn = mongoose.connection;
conn.on("error", (err) =>
  console.log(`error in connnection to database ${err}`)
);
conn.once("open", () => console.log("connection successful"));
export { conn };