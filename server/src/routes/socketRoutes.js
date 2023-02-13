import express from "express";
import { addSocket, deleteSocketById, getAllSockets, updateSocket } from "../controllers/socketControllers.js";
const router = express.Router();

router.get("/", getAllSockets);
router.post("/", addSocket);
router.put("/:socketId", updateSocket);
router.delete("/:socketId", deleteSocketById);

export default router;