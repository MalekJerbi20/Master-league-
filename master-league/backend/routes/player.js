import express from "express";
import multer from "multer";
import Player from "../models/player.js";

const router = express.Router();

// configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Create player with image + stats
router.post("/", upload.single("image"), async (req, res) => {
    console.log("req.body:", req.body);
  const { name, position, age, foot, jersey } = req.body;

  // ✅ Parse flat stats
  const stats = {
    shooting: parseInt(req.body.shooting) || 50,
    passing: parseInt(req.body.passing) || 50,
    dribbling: parseInt(req.body.dribbling) || 50,
    defense: parseInt(req.body.defense) || 50,
    pace: parseInt(req.body.pace) || 50,
    physical: parseInt(req.body.physical) || 50,
  };

  try {
    const player = new Player({
      name,
      position,
      age,
      foot,
      jersey,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      stats,
    });
    
    await player.save();
    res.status(201).json({ message: "Player created successfully", player });
  } catch (error) {
    res.status(400).json({ message: "Error creating player", error: error.message });
  }

});
// Get all players
router.get("/", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: "Error fetching players", error: error.message });
  }
});

export default router;