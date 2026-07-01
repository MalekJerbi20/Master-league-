function PlayerCard({ player }) {
  // Calculate overall rating safely
  const calculateRating = (stats) => {
    if (!stats || typeof stats !== "object") return 50; // fallback if stats missing
    const values = Object.values(stats);
    if (!values.length) return 50;
    const total = values.reduce((sum, val) => sum + (Number(val) || 0), 0);
    return Math.round(total / values.length);
  };

  const rating = calculateRating(player?.stats);
  const getPositionColor = (position) => {
    if (!position) return "from-slate-600 to-slate-700";
    if (position.includes("GK")) return "from-orange-600 to-orange-700";
    if (position.includes("D") || position.includes("B")) return "from-red-600 to-red-700";
    if (position.includes("M")) return "from-blue-600 to-blue-700";
    if (position.includes("F") || position.includes("W") || position.includes("S")) return "from-emerald-600 to-emerald-700";
    return "from-slate-600 to-slate-700";
  };

  return (
    <div className="card-modern overflow-hidden group transform hover:scale-105 transition-all duration-300">
      {/* Header with position and rating */}
      <div className={`bg-gradient-to-r ${getPositionColor(player?.position)} p-4 relative`}>
        <div className="flex justify-between items-start">
          <div className="bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white">
            {player?.position ?? "N/A"}
          </div>
          <div className="bg-yellow-500/90 px-3 py-1 rounded-full text-xs font-bold text-black">
            {rating} OVR
          </div>
        </div>
      </div>

      {/* Player Image */}
      <div className="relative p-4 flex justify-center bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-500/0 rounded-full blur-xl"></div>
          <img
            src={
              player?.imageUrl
                ? `http://localhost:5000${player.imageUrl}`
                : "/default-player.png"
            }
            alt={player?.name ?? "Unknown Player"}
            className="w-28 h-28 rounded-full border-4 border-emerald-500/50 object-cover relative z-10 group-hover:border-emerald-400 transition-colors"
          />
        </div>
      </div>

      {/* Player Info */}
      <div className="p-5 bg-gradient-to-b from-slate-800/50 to-slate-900">
        <h2 className="text-center text-lg font-bold text-white mb-1">
          {player?.name ?? "Unnamed"}
        </h2>
        <p className="text-center text-xs text-emerald-400 mb-4 font-semibold">Elite Player</p>

        {/* Stats Grid */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <StatBar label="Shooting" value={player?.stats?.shooting ?? 50} />
            <StatBar label="Passing" value={player?.stats?.passing ?? 50} />
            <StatBar label="Dribbling" value={player?.stats?.dribbling ?? 50} />
            <StatBar label="Defense" value={player?.stats?.defense ?? 50} />
            <StatBar label="Pace" value={player?.stats?.pace ?? 50} />
            <StatBar label="Physical" value={player?.stats?.physical ?? 50} />
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full mt-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold rounded-lg transition-all text-xs">
          Select Player
        </button>
      </div>
    </div>
  );
}

function StatBar({ label, value }) {
  const maxValue = 100;
  const percentage = Math.min(value, maxValue);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-300 font-semibold">{label}</span>
        <span className="text-emerald-400 font-bold">{value}</span>
      </div>
      <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default PlayerCard;