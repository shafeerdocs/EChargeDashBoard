import SocketSchema from "../models/socket.schema.js";

export const getAllSockets = async (req, res) => {
  try {
    const sockets = await SocketSchema.find();
    res.status(200).json(sockets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addSocket = async (req, res) => {
  const socket = req.body;
  const newSocket = new SocketSchema(socket);
  try {
    await newSocket.save();
    res.status(200).json(newSocket);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateSocket = async (req, res) => {
  const socketId = req.params.socketId;
  const dataToChange = req.body;
  try {
    const updatedSocket = await SocketSchema.findByIdAndUpdate(
      socketId,
      dataToChange,
      {
        returnDocument: "after",
      }
    );
    res.status(200).json(updatedSocket);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteSocketById = async (req, res) => {
  try {
    const deletedSocket = await SocketSchema.findByIdAndDelete(
      req.params.socketId
    );
    res.status(200).json(deletedSocket);
  } catch (error) {
    res.status(409).json(error);
  }
};
