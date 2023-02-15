import mongoose from "mongoose";
const { Schema } = mongoose;

const socketSchema = mongoose.Schema(
  {
    title: String,
    type: String,
  },
  {
    timestamps: true,
  }
);

const SocketSchema = mongoose.model("socket", socketSchema);

export default SocketSchema;
