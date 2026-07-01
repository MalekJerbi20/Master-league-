import { useState, useEffect } from "react";
import axios from "axios";
import SoccerPitch from "../components/pitch.jsx";

function FormationPage() {
  const [players, setPlayers] = useState([]);
  const [formation, setFormation] = useState({});
  const [preset, setPreset] = useState("4-3-3");
  const [draggedElement, setDraggedElement] = useState(null);

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

  const handleDragStart = (player, positionId = null) => (e) => {
    if (!player) return;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("player", JSON.stringify(player));
    e.dataTransfer.setData("sourcePosition", positionId || "");
    
    // Add visual feedback
    setDraggedElement(positionId);
    e.currentTarget.style.opacity = "0.7";
  };

  const handleDrop = (posId) => (e) => {
    e.preventDefault();
    setDraggedElement(null);

    const playerPayload = e.dataTransfer.getData("player");
    if (!playerPayload) return;

    const incomingPlayer = JSON.parse(playerPayload);
    const sourcePosition = e.dataTransfer.getData("sourcePosition") || "";

    setFormation((prev) => {
      const next = { ...prev };

      if (sourcePosition && sourcePosition !== posId) {
        const targetPlayer = prev[posId];
        next[sourcePosition] = targetPlayer;
        next[posId] = incomingPlayer;
      } else if (sourcePosition === posId) {
        return prev;
      } else {
        next[posId] = incomingPlayer;
      }

      return next;
    });
  };

  const allowDrop = (e) => e.preventDefault();

  const handleDragEnd = () => {
    setDraggedElement(null);
  };

  const formations = {
    "4-3-3": [
      // Goalkeeper
      { id: "GK", top: "95%", left: "50%" },
      // Defenders (4)
      { id: "LB", top: "72%", left: "15%" },
      { id: "CB1", top: "72%", left: "35%" },
      { id: "CB2", top: "72%", left: "65%" },
      { id: "RB", top: "72%", left: "85%" },
      // Midfielders (3)
      { id: "LM", top: "50%", left: "25%" },
      { id: "CM", top: "50%", left: "50%" },
      { id: "RM", top: "50%", left: "75%" },
      // Forwards (3)
      { id: "LW", top: "20%", left: "20%" },
      { id: "ST", top: "15%", left: "50%" },
      { id: "RW", top: "20%", left: "80%" },
    ],
    "4-4-2": [
      // Goalkeeper
      { id: "GK", top: "95%", left: "50%" },
      // Defenders (4)
      { id: "LB", top: "72%", left: "15%" },
      { id: "CB1", top: "72%", left: "35%" },
      { id: "CB2", top: "72%", left: "65%" },
      { id: "RB", top: "72%", left: "85%" },
      // Midfielders (4)
      { id: "LM", top: "48%", left: "15%" },
      { id: "CM1", top: "48%", left: "38%" },
      { id: "CM2", top: "48%", left: "62%" },
      { id: "RM", top: "48%", left: "85%" },
      // Forwards (2)
      { id: "ST1", top: "18%", left: "38%" },
      { id: "ST2", top: "18%", left: "62%" },
    ],
    "4-2-3-1": [
      // Goalkeeper
      { id: "GK", top: "95%", left: "50%" },
      // Defenders (4)
      { id: "LB", top: "72%", left: "15%" },
      { id: "CB1", top: "72%", left: "35%" },
      { id: "CB2", top: "72%", left: "65%" },
      { id: "RB", top: "72%", left: "85%" },
      // Defensive Midfielders (2)
      { id: "CDM1", top: "55%", left: "38%" },
      { id: "CDM2", top: "55%", left: "62%" },
      // Attacking Midfielders (3)
      { id: "CAM1", top: "35%", left: "25%" },
      { id: "CAM2", top: "35%", left: "50%" },
      { id: "CAM3", top: "35%", left: "75%" },
      // Forward (1)
      { id: "ST", top: "15%", left: "50%" },
    ],
    "3-5-2": [
      // Goalkeeper
      { id: "GK", top: "95%", left: "50%" },
      // Defenders (3)
      { id: "CB1", top: "72%", left: "25%" },
      { id: "CB2", top: "72%", left: "50%" },
      { id: "CB3", top: "72%", left: "75%" },
      // Midfielders (5)
      { id: "LWB", top: "50%", left: "10%" },
      { id: "CM1", top: "50%", left: "35%" },
      { id: "CM2", top: "50%", left: "50%" },
      { id: "CM3", top: "50%", left: "65%" },
      { id: "RWB", top: "50%", left: "90%" },
      // Forwards (2)
      { id: "ST1", top: "18%", left: "38%" },
      { id: "ST2", top: "18%", left: "62%" },
    ],
    "3-4-3": [
      // Goalkeeper
      { id: "GK", top: "95%", left: "50%" },
      // Defenders (3)
      { id: "CB1", top: "72%", left: "25%" },
      { id: "CB2", top: "72%", left: "50%" },
      { id: "CB3", top: "72%", left: "75%" },
      // Midfielders (4)
      { id: "LM", top: "50%", left: "15%" },
      { id: "CM1", top: "50%", left: "38%" },
      { id: "CM2", top: "50%", left: "62%" },
      { id: "RM", top: "50%", left: "85%" },
      // Forwards (3)
      { id: "LW", top: "18%", left: "20%" },
      { id: "ST", top: "15%", left: "50%" },
      { id: "RW", top: "18%", left: "80%" },
    ],
    "5-3-2": [
      // Goalkeeper
      { id: "GK", top: "95%", left: "50%" },
      // Defenders (5)
      { id: "LWB", top: "72%", left: "10%" },
      { id: "CB1", top: "72%", left: "32%" },
      { id: "CB2", top: "72%", left: "50%" },
      { id: "CB3", top: "72%", left: "68%" },
      { id: "RWB", top: "72%", left: "90%" },
      // Midfielders (3)
      { id: "CM1", top: "48%", left: "35%" },
      { id: "CM2", top: "48%", left: "50%" },
      { id: "CM3", top: "48%", left: "65%" },
      // Forwards (2)
      { id: "ST1", top: "18%", left: "38%" },
      { id: "ST2", top: "18%", left: "62%" },
    ],
    "4-1-4-1": [
      // Goalkeeper
      { id: "GK", top: "95%", left: "50%" },
      // Defenders (4)
      { id: "LB", top: "72%", left: "15%" },
      { id: "CB1", top: "72%", left: "35%" },
      { id: "CB2", top: "72%", left: "65%" },
      { id: "RB", top: "72%", left: "85%" },
      // Defensive Midfielder (1)
      { id: "CDM", top: "55%", left: "50%" },
      // Attacking Midfielders (4)
      { id: "LM", top: "35%", left: "15%" },
      { id: "CAM1", top: "35%", left: "38%" },
      { id: "CAM2", top: "35%", left: "62%" },
      { id: "RM", top: "35%", left: "85%" },
      // Forward (1)
      { id: "ST", top: "15%", left: "50%" },
    ],
    "3-6-1": [
      // Goalkeeper
      { id: "GK", top: "95%", left: "50%" },
      // Defenders (3)
      { id: "CB1", top: "72%", left: "25%" },
      { id: "CB2", top: "72%", left: "50%" },
      { id: "CB3", top: "72%", left: "75%" },
      // Midfielders (6)
      { id: "LWB", top: "52%", left: "10%" },
      { id: "CM1", top: "52%", left: "30%" },
      { id: "CM2", top: "52%", left: "40%" },
      { id: "CM3", top: "52%", left: "60%" },
      { id: "CM4", top: "52%", left: "70%" },
      { id: "RWB", top: "52%", left: "90%" },
      // Forward (1)
      { id: "ST", top: "15%", left: "50%" },
    ],
    "5-4-1": [
      // Goalkeeper
      { id: "GK", top: "95%", left: "50%" },
      // Defenders (5)
      { id: "LWB", top: "72%", left: "10%" },
      { id: "CB1", top: "72%", left: "32%" },
      { id: "CB2", top: "72%", left: "50%" },
      { id: "CB3", top: "72%", left: "68%" },
      { id: "RWB", top: "72%", left: "90%" },
      // Midfielders (4)
      { id: "LM", top: "48%", left: "15%" },
      { id: "CM1", top: "48%", left: "38%" },
      { id: "CM2", top: "48%", left: "62%" },
      { id: "RM", top: "48%", left: "85%" },
      // Forward (1)
      { id: "ST", top: "15%", left: "50%" },
    ],
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 md:px-8 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <h1 className="gradient-text text-4xl md:text-5xl font-bold mb-8">Build Your Formation</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Players Panel */}
          <div className="w-full lg:w-1/3 card-modern p-6 h-fit sticky top-24">
            <h2 className="text-xl font-bold text-emerald-400 mb-2">Available Players</h2>
            <p className="text-gray-400 text-sm mb-6">Drag players to the pitch to build your team</p>
            
            <div className="flex flex-wrap gap-3 mb-8 max-h-96 overflow-y-auto">
              {players.map((p) => (
                <div
                  key={p._id}
                  draggable
                  onDragStart={handleDragStart(p)}
                  onDragEnd={handleDragEnd}
                  className="group cursor-grab active:cursor-grabbing transform hover:scale-110 transition-all duration-300 ease-out"
                >
                  <div className="relative">
                    <img
                      src={`http://localhost:5000${p.imageUrl}`}
                      alt={p.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500/50 group-hover:border-emerald-400 shadow-lg group-hover:shadow-emerald-500/50 transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/0 to-emerald-500/20 group-hover:to-emerald-500/40 transition-all duration-300"></div>
                  </div>
                  <p className="text-xs font-bold text-center mt-1 text-gray-300">{p.name}</p>
                  <p className="text-[10px] text-gray-500 text-center">{p.position}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-emerald-400">Choose Formation</label>
              <select
                value={preset}
                onChange={(e) => setPreset(e.target.value)}
                className="form-input w-full"
              >
                <option value="4-3-3" className="bg-slate-900">4-3-3 Balanced</option>
                <option value="4-4-2" className="bg-slate-900">4-4-2 Classic</option>
                <option value="4-2-3-1" className="bg-slate-900">4-2-3-1 Defensive</option>
                <option value="4-1-4-1" className="bg-slate-900">4-1-4-1 Modern</option>
                <option value="3-5-2" className="bg-slate-900">3-5-2 Attacking</option>
                <option value="3-4-3" className="bg-slate-900">3-4-3 Aggressive</option>
                <option value="3-6-1" className="bg-slate-900">3-6-1 Ultra Defensive</option>
                <option value="5-3-2" className="bg-slate-900">5-3-2 Defensive</option>
                <option value="5-4-1" className="bg-slate-900">5-4-1 Very Defensive</option>
              </select>
            </div>
          </div>

          {/* Pitch */}
          <div className="w-full lg:w-2/3 relative flex justify-center">
            <SoccerPitch>
              <div className="absolute inset-0">
                {formations[preset].map((pos) => {
                  const assignedPlayer = formation[pos.id];
                  const isGK = pos.id === "GK";

                  return (
                    <div
                      key={pos.id}
                      onDrop={handleDrop(pos.id)}
                      onDragOver={allowDrop}
                      onDragLeave={() => setDraggedElement(null)}
                      onDragEnd={handleDragEnd}
                      draggable={Boolean(assignedPlayer)}
                      onDragStart={handleDragStart(assignedPlayer, pos.id)}
                      className={`absolute w-20 h-20 rounded-full flex flex-col items-center justify-center text-white transition-all ease-out ${
                        draggedElement === pos.id 
                          ? "duration-100 scale-120 shadow-2xl" 
                          : "duration-300"
                      } ${
                        assignedPlayer 
                          ? "cursor-grab active:cursor-grabbing shadow-2xl shadow-yellow-400/60 border-3 border-yellow-300 hover:scale-125 hover:shadow-yellow-400/80" 
                          : "cursor-pointer border-2 border-white/40 hover:border-white/70 hover:shadow-lg transition-all duration-200"
                      } ${isGK ? "bg-gradient-to-br from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600" : "bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600"}`}
                      style={{ 
                        top: pos.top, 
                        left: pos.left, 
                        transform: "translate(-50%, -50%)",
                        backdropFilter: "blur(4px)"
                      }}
                    >
                      {assignedPlayer ? (
                        <>
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <img
                              src={`http://localhost:5000${assignedPlayer.imageUrl}`}
                              alt={assignedPlayer.name}
                              className="w-full h-full rounded-full object-cover border-3 border-white/95 shadow-md transition-all duration-300"
                            />
                          </div>
                          <span className="text-[8px] font-bold mt-0.5 bg-black/70 px-1.5 py-0.5 rounded-full text-yellow-300 transition-all duration-300 whitespace-nowrap">{pos.id}</span>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-sm font-bold transition-all duration-300">{pos.id}</span>
                          <span className="text-[7px] opacity-60 text-center leading-tight">drop</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </SoccerPitch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormationPage;