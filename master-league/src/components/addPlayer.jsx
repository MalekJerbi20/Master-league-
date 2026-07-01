import { useState, useEffect } from "react";
import axios from "axios";
import PlayerCard from "./playerCard"; 

function AddPlayer() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    age: "",
    foot: "",
    jersey: "",
    image: null,
    stats: {
      shooting: 50,
      passing: 50,
      dribbling: 50,
      defense: 50,
      pace: 50,
      physical: 50,
    },
  });

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/players");
        setPlayers(res.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    fetchPlayers();
  }, []);

  const playerAdd = async (e) => {
    e.preventDefault();
    if (formData.name.trim() !== "" && formData.position.trim() !== "") {
      setLoading(true);
      try {
        const data = new FormData();
        data.append("name", formData.name);
        data.append("position", formData.position);
        data.append("age", formData.age);
        data.append("foot", formData.foot);
        data.append("jersey", formData.jersey);
        if (formData.image) {
          data.append("image", formData.image);
        }

        // ✅ Flatten stats
        Object.entries(formData.stats).forEach(([key, value]) => {
          data.append(key, value); // e.g. "shooting": 75
        });

        const res = await axios.post("http://localhost:5000/api/players", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setPlayers([...players, res.data.player]);
        alert("Player added successfully!");
        setFormData({
          name: "",
          position: "",
          age: "",
          foot: "",
          jersey: "",
          image: null,
          stats: {
            shooting: 50,
            passing: 50,
            dribbling: 50,
            defense: 50,
            pace: 50,
            physical: 50,
          },
        });
      } catch (error) {
        console.error("Error adding player:", error);
        alert("Failed to add player");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="gradient-text text-4xl md:text-5xl font-bold mb-2">Add New Player</h1>
          <p className="text-gray-400 text-lg">Register talented players to your league</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={playerAdd} className="card-modern p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Player Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  required
                />

                <select
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="form-input"
                  required
                >
                  <option value="">Select Position</option>
                  <option value="GK">Goalkeeper (GK)</option>
                  <option value="CB">Center Back (CB)</option>
                  <option value="RB">Right Back (RB)</option>
                  <option value="LB">Left Back (LB)</option>
                  <option value="CDM">Defensive Mid (CDM)</option>
                  <option value="CM">Central Mid (CM)</option>
                  <option value="CAM">Attacking Mid (CAM)</option>
                  <option value="RM">Right Mid (RM)</option>
                  <option value="LM">Left Mid (LM)</option>
                  <option value="RW">Right Wing (RW)</option>
                  <option value="LW">Left Wing (LW)</option>
                  <option value="SS">Second Striker (SS)</option>
                  <option value="ST">Striker (ST)</option>
                </select>

                <input
                  type="number"
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="form-input"
                />

                <select
                  value={formData.foot}
                  onChange={(e) => setFormData({ ...formData, foot: e.target.value })}
                  className="form-input"
                >
                  <option value="">Preferred Foot</option>
                  <option value="Left">Left Foot</option>
                  <option value="Right">Right Foot</option>
                  <option value="Both">Ambidextrous</option>
                </select>

                <input
                  type="number"
                  placeholder="Jersey Number"
                  value={formData.jersey}
                  onChange={(e) => setFormData({ ...formData, jersey: e.target.value })}
                  className="form-input"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                  className="form-input cursor-pointer"
                />
              </div>

              {formData.image && (
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Preview"
                      className="w-32 h-32 rounded-full object-cover border-4 border-emerald-500/50"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/0 to-emerald-500/30"></div>
                  </div>
                </div>
              )}

              {/* Stats Section */}
              <div className="space-y-4 pt-4 border-t border-emerald-500/20">
                <h3 className="text-lg font-bold text-emerald-400">Player Attributes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["shooting", "passing", "dribbling", "defense", "pace", "physical"].map((stat) => (
                    <div key={stat} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-gray-300 capitalize">{stat}</label>
                        <span className="text-emerald-400 font-bold">{formData.stats[stat]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="99"
                        value={formData.stats[stat]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            stats: { ...formData.stats, [stat]: parseInt(e.target.value) },
                          })
                        }
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Adding Player..." : "Add Player"}
              </button>
            </form>
          </div>

          {/* Quick Stats Display */}
          <div className="card-modern p-6 h-fit">
            <h3 className="text-lg font-bold text-emerald-400 mb-4">Player Summary</h3>
            <div className="space-y-3">
              <div className="bg-slate-900/50 p-3 rounded-lg">
                <p className="text-xs text-gray-400">Name</p>
                <p className="text-white font-bold">{formData.name || "Not set"}</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg">
                <p className="text-xs text-gray-400">Position</p>
                <p className="text-white font-bold">{formData.position || "Not selected"}</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg">
                <p className="text-xs text-gray-400">Average Rating</p>
                <p className="text-emerald-400 font-bold text-lg">
                  {Math.round(
                    Object.values(formData.stats).reduce((a, b) => a + b) / 6
                  )}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {Object.entries(formData.stats).map(([key, value]) => (
                  <div key={key} className="bg-slate-900/50 p-2 rounded text-center">
                    <p className="text-[10px] text-gray-400 capitalize">{key}</p>
                    <p className="text-emerald-400 font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Players Grid */}
        <div className="mt-16">
          <h2 className="gradient-text text-3xl font-bold mb-8">Registered Players</h2>
          {players.length === 0 ? (
            <div className="card-modern p-12 text-center">
              <p className="text-gray-400">No players added yet. Create your first player above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {players.map((player) => (
                <PlayerCard key={player._id} player={player} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddPlayer;