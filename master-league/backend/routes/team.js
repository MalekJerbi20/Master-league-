import express from "express";
import Team from "../models/team.js";

const router = express.Router();


// Save a team
router.post("/", async (req, res) => {
  const { name, teamA, teamB } = req.body;
  try {
    const team = new Team({
      name,
      teamA,
      teamB,
      createdAt: new Date(),
    });
    await team.save();
    res.status(201).json({ message: "Team saved successfully", team });
  } catch (error) {
    res.status(400).json({ message: "Error saving team", error: error.message });
  }
});

// Get all teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find().populate("teamA").populate("teamB");
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams", error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting team", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { name, teamA, teamB } = req.body;
  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      { name, teamA, teamB },
      { new: true }
    ).populate("teamA").populate("teamB");

    if (!updatedTeam) return res.status(404).json({ message: "Team not found" });
    res.json({ message: "Team updated successfully", team: updatedTeam });
  } catch (error) {
    res.status(400).json({ message: "Error updating team", error: error.message });
  }
});



export default router;