import { del, get, set } from "../utils/cache.util.js";
import { createToken, verifyToken } from "../utils/jwt.util.js";

const authorizeUser = async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  if (token) {
    try {
      token = token.trim();
      const isBlackListed = await get(token);
      if (isBlackListed) {
        return res.status(401).json({ message: "No access" });
      }
      const decoded = await verifyToken(token);
      req.user = decoded;
      req.token = token;
      if ((req.user.role === "user")) next();
      else res.status(401).json({ message: "unauthorized access" });
    } catch (error) {
      return res.status(401).json({ message: "No access" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Authorization header not present" });
  }
};

const authorizeAdmin = async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  if (token) {
    try {
      token = token.trim();
      const isBlackListed = await get(token);
      if (isBlackListed) {
        return res.status(401).json({ message: "No access" });
      }
      const decoded = await verifyToken(token);
      req.user = decoded;
      req.token = token;
      if (req.user.role === "admin") next();
      else res.status(401).json({ message: "unauthorized access" });
    } catch (error) {
      return res.status(401).json({ message: "No access" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Authorization header not present" });
  }
};

export { authorizeUser, authorizeAdmin };
