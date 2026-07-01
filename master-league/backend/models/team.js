import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teamA: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  teamB: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Team", teamSchema);