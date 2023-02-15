import bcrypt from "bcrypt";
import { config } from "../config/jwt.config.js";
import UserSchema from "../models/user.schema.js";
import { createToken } from "../utils/jwt.util.js";

const register = async (req, res) => {
  const isExist = await UserSchema.findOne({
    phonenumber: req.body.phonenumber,
  });
  if (isExist) {
    return res
      .status(400)
      .json({ message: "User already registered. Please login to continue." });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await UserSchema.create({
    name: req.body.name,
    phonenumber: req.body.phonenumber,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role || "user",
  });
  try {
    await user.save();
    return res
      .status(200)
      .json({ success: true, data: "user registered successfully" });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await UserSchema.findOne({
      phonenumber: req.body.phonenumber,
    });
    if (user.length !== 0) {
      const isMatched = await bcrypt.compare(req.body.password, user.password);
      if (isMatched) {
        const token = await createToken({ _id: user._id, role: user.role });
        return res.json({
          access_token: token,
          token_type: "Bearer",
          expires_in: config.ttl,
        });
      }
    }
    return res.status(400).json({ message: "Invalid credentails." });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

const logout = async (req, res) => {
  const token = req.token;
  const now = new Date();
  const expire = new Date(req.user.exp);
  const milliseconds = now.getTime() - expire.getTime();
  //BlackList Token
  await set(token, token, milliseconds);

  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

export { register, login, logout };
