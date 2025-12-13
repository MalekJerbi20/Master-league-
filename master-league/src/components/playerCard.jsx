function PlayerCard() {

  
const player = {
  fullName: "Jerbi Malek", 
  position: "Forward",
  imageUrl: "https://www.facebook.com/pasindu.herath.929039/posts/imagine-being-the-best-footballer-in-the-world-for-one-and-a-half-to-almost-two-/597823202703758/",

  stats: {
    def: 35,
    speed: 88,
    shooting: 92,
    strength: 70 , 
  }
  
};
  return (
    <div className="border p-4 rounded-lg shadow-lg w-64 text-center">
      <img src={player.imageUrl} alt={player.fullName} className="w-24 h-24 mx-auto rounded-full" />
      <h2 className="text-xl font-bold">{player.fullName}</h2>
      <p className="text-gray-600">{player.position}</p>
      <div className="mt-2">
        {Object.entries(player.stats).map(([stat, value]) => (
          <p key={stat}>{stat.toUpperCase()}: {value}</p>
        ))}
      </div>
    </div>
  );
}export default PlayerCard;