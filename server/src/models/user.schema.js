import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    password: String,
    role: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);

const UserSchema = mongoose.model("user", userSchema);

export default UserSchema;
