import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  age: { type: Number, default: 18 }, // optional default
  foot: { type: String, enum: ["Left", "Right", "Both"], default: "Right" },
  jersey: { type: Number, default: 0 },
  imageUrl: { type: String, default: null }, // safe default

  stats: {
    shooting: { type: Number, default: 50, min: 0, max: 99 },
    passing: { type: Number, default: 50, min: 0, max: 99 },
    dribbling: { type: Number, default: 50, min: 0, max: 99 },
    defense: { type: Number, default: 50, min: 0, max: 99 },
    pace: { type: Number, default: 50, min: 0, max: 99 },
    physical: { type: Number, default: 50, min: 0, max: 99 },
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Player", playerSchema);