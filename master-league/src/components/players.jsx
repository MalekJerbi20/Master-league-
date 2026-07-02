// Players.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import PlayerCard from "./playerCard";

function Players() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/players");
        setPlayers(res.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="gradient-text text-4xl md:text-5xl font-bold mb-2">Players</h1>
          <p className="text-gray-400 text-lg">Explore all registered players</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500/30 border-t-emerald-500"></div>
          </div>
        ) : players.length === 0 ? (
          <div className="card-modern p-8 text-center">
            <p className="text-gray-400">No players found. Add some players to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {players.map((p) => (
              <div key={p._id} className="transform hover:scale-105 transition-transform duration-300">
                <PlayerCard player={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Players;