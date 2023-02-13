import axios from "axios";

export const url = "http://localhost:1337";

const stationUrl = `${url}/station`;
const socketUrl = `${url}/socket`;
const userUrl = `${url}/user`;

export const getStations = async () => await axios.get(stationUrl);
export const addStation = async (station) =>
  await axios.post(stationUrl, station);
export const deleteStationById = async (stationId) =>
  await axios.delete(`${stationUrl}/${stationId}`);

export const getSockets = async () => await axios.get(socketUrl);
export const addSocket = async (socket) => await axios.post(socketUrl, socket);
export const deleteSocketById = async (socketId) =>
  await axios.delete(`${socketUrl}/${socketId}`);
