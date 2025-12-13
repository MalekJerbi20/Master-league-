import { useState } from "react";

function addPlayer() {
    
      const [players, setPlayers] = useState([]);
      const [teamA, setTeamA] = useState([]);
      const [teamB, setTeamB] = useState([]);
      const [name, setName] = useState("");

      const playerAdd = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      setPlayers([...players, name]);
      setName("");
    }
    };
    return (
        <>
        <h1>Team Generator</h1>
      <form onSubmit={playerAdd} className="m-10 p-10">
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
        </>
   
    )

}export default addPlayer