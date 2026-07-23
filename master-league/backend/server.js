import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import playerRoutes from "./routes/player.js"; 
import teamRoutes from "./routes/team.js";


const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from uploads folder
app.use("/uploads", express.static("uploads"));
app.use("/api/teams", teamRoutes);

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/players", playerRoutes); // <-- mount player routes

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) => console.error("Could not connect to MongoDB Atlas", err));

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));