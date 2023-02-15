import StationSchema from "../models/station.schema.js";

export const getAllStations = async (req, res) => {
  console.log(req.user)
  try {
    const stations = await StationSchema.find();
    res.status(200).json(stations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addStation = async (req, res) => {
  const station = req.body;
  const newStation = new StationSchema(station);
  try {
    await newStation.save();
    res.status(200).json(newStation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateStation = async (req, res) => {
  const stationId = req.params.stationId;
  const dataToChange = req.body;
  try {
    const updatedStation = await StationSchema.findByIdAndUpdate(
      stationId,
      dataToChange,
      {
        returnDocument: "after",
      }
    );
    res.status(200).json(updatedStation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteStationById = async (req, res) => {
  try {
    const deletedStation = await StationSchema.findByIdAndDelete(
      req.params.stationId
    );
    res.status(200).json(deletedStation);
  } catch (error) {
    res.status(409).json(error);
  }
};
