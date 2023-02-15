import jwt from "jsonwebtoken";
import { config } from "../config/jwt.config.js";

const verifyToken = (token) => jwt.verify(token, config.secret);
const createToken = (data) =>
  jwt.sign(data, config.secret, { expiresIn: config.ttl });

export { verifyToken, createToken };