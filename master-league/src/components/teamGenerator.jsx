import { useState, useEffect } from "react";
import axios from "axios";
import PlayerCard from "./playerCard"; // reuse your existing card

function TeamGenerator() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [teamName, setTeamName] = useState("");
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

  const togglePlayer = (id) => {
    setSelectedPlayers((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const generateTeams = () => {
    const chosen = players.filter((p) => selectedPlayers.includes(p._id));
    if (chosen.length < 2) {
      alert("Please select at least two players");
      return;
    }
    if (chosen.length % 2 !== 0) {
      alert("Please select an even number of players");
      return;
    }

    const shuffled = [...chosen].sort(() => 0.5 - Math.random());
    const mid = Math.floor(shuffled.length / 2);
    setTeamA(shuffled.slice(0, mid));
    setTeamB(shuffled.slice(mid));
  };

  const saveTeam = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/teams", {
        name: teamName || "Unnamed Team",
        teamA: teamA.map((p) => p._id),
        teamB: teamB.map((p) => p._id),
      });
      alert("Team saved successfully!");
      console.log("Saved team:", res.data);
      setTeamName("");
      setSelectedPlayers([]);
      setTeamA([]);
      setTeamB([]);
    } catch (error) {
      console.error("Error saving team:", error);
      alert("Failed to save team");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="gradient-text text-4xl md:text-5xl font-bold mb-2">Team Generator</h1>
          <p className="text-gray-400 text-lg">Create balanced teams from your player pool</p>
        </div>

        {/* Team Name Input */}
        <div className="card-modern p-6 mb-8">
          <label className="block text-sm font-semibold text-emerald-400 mb-2">Team Name</label>
          <input
            type="text"
            placeholder="Enter your team name..."
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="form-input w-full md:w-1/2"
          />
        </div>

        {/* Select Players Section */}
        <div className="mb-12">
          <h2 className="gradient-text text-2xl font-bold mb-6">Select Players</h2>
          <div className="text-sm text-gray-400 mb-4">
            {selectedPlayers.length} player{selectedPlayers.length !== 1 ? 's' : ''} selected
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500/30 border-t-emerald-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {players.map((player) => {
                const isSelected = selectedPlayers.includes(player._id);
                return (
                  <div
                    key={player._id}
                    onClick={() => togglePlayer(player._id)}
                    className={`cursor-pointer group relative rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                      isSelected 
                        ? "ring-2 ring-emerald-500 shadow-lg shadow-emerald-500/50" 
                        : "hover:shadow-lg"
                    }`}
                  >
                    <div className="card-modern p-4 flex flex-col items-center h-full">
                      <div className="relative mb-3">
                        <img
                          src={
                            player.imageUrl
                              ? `http://localhost:5000${player.imageUrl}`
                              : "/default-player.png"
                          }
                          alt={player.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500/50 group-hover:border-emerald-400"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-emerald-500/20">
                            <span className="text-2xl text-emerald-400">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-bold text-white text-center">{player.name}</p>
                      <p className="text-xs text-emerald-400 font-semibold">{player.position}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <button
            onClick={generateTeams}
            className="btn-primary flex-1"
            disabled={selectedPlayers.length < 2}
          >
            Generate Teams
          </button>
          {teamA.length > 0 && teamB.length > 0 && (
            <button
              onClick={saveTeam}
              className="btn-secondary flex-1"
            >
              Save Teams
            </button>
          )}
        </div>

        {/* Display Teams */}
        {teamA.length > 0 && teamB.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Team A */}
            <div className="card-modern p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">A</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Team A</h2>
                  <p className="text-sm text-gray-400">{teamA.length} Players</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {teamA.map((p) => (
                  <PlayerCard key={p._id} player={p} />
                ))}
              </div>
            </div>

            {/* Team B */}
            <div className="card-modern p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">B</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Team B</h2>
                  <p className="text-sm text-gray-400">{teamB.length} Players</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {teamB.map((p) => (
                  <PlayerCard key={p._id} player={p} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamGenerator;