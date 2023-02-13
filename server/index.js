//import statements
import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { conn } from "./src/models/connection.js";
import stationRoutes from "./src/routes/stationRoutes.js";
import socketRoutes from "./src/routes/socketRoutes.js";

//initializations
dotenv.config();
const app = express();
const PORT = process.env.PORT || 1337;

//db
conn;

//middlewares
app.use(bodyParser.json({ limit: "100mb", extended: "true" }));
app.use(express.static("static"));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: "true" }));
app.use(cors());

//routes
app.use("/station", stationRoutes);
app.use("/socket", socketRoutes);

//listening
app.listen(PORT, () => {
  console.log(`database connected. server running on port: ${PORT}`);
});
