import express from "express";
import {
  addStation,
  deleteStationById,
  getAllStations,
  updateStation,
} from "../controllers/station.controller.js";
const router = express.Router();

router.get("/", getAllStations);
router.post("/", addStation);
router.put("/:stationId", updateStation);
router.delete("/:stationId", deleteStationById);

export default router;
