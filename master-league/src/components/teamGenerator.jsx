import { useState } from "react";

function Greeting() {
  const [players, setPlayers] = useState([]);
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [name, setName] = useState("");

  // New states for player attributes that i need to use in the login page maybe later
  const [position, setPosition] = useState("");
  const [def , setDef] = useState("");
  const [speed , setSpeed] = useState("");
  const [shooting , setShooting] = useState("");
  const [strength , setStrength] = useState("");
  const [imageUrl , setImageUrl] = useState("");

  const addPlayer = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      setPlayers([...players, name]);
      setName("");
    }
  };

  const generateTeams = () => {
    if (players.length < 2) {
      alert("Please enter at least two players");
      return;
    }
    if (players.length % 2 !== 0) {
      alert("Please enter an even number of players");
      return;
    }
    const shuffled = [...players].sort(() => 0.5 - Math.random());
    const mid = Math.floor(shuffled.length / 2);
    setTeamA(shuffled.slice(0, mid));
    setTeamB(shuffled.slice(mid));
  };

  return (
    <>
      <h1>Team Generator</h1>
      <form onSubmit={addPlayer} className="m-10 p-10">
        <input
          type="text"
          placeholder="Enter player" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Add Player</button>
      </form>

      <h2>Players List</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>

      <h2>Generate Teams</h2>
      <button onClick={generateTeams}>Generate</button>

      <h2>Team A</h2>
      <ul>
        {teamA.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>

      <h2>Team B</h2>
      <ul>
        {teamB.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </>
  );
}

export default Greeting;