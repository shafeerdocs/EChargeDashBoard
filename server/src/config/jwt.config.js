import dotenv from "dotenv";
dotenv.config();
const config = {
  secret: process.env.JWT_SECRET,
  ttl: 3600,
};
export { config };