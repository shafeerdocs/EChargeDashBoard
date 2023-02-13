import mongoose from "mongoose";
const { Schema } = mongoose;

const stationSchema = mongoose.Schema(
  {
    title: String,
    location: String,
    city: String,
    country: String,
    sockets: [{ type: Schema.Types.ObjectId, ref: "socket" }],
  },
  {
    timestamps: true,
  }
);

const StationSchema = mongoose.model("station", stationSchema);

export default StationSchema;
