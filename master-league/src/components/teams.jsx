import { useState, useEffect } from "react";
import axios from "axios";
import PlayerCard from "./playerCard";

function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/teams");
        setTeams(res.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, []);

  const deleteTeam = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/teams/${id}`);
      setTeams((prev) => prev.filter((team) => team._id !== id));
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  const startEditing = (team) => {
    setEditingTeam(team._id);
    setNewName(team.name);
  };

  const saveEdit = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/teams/${id}`, {
        name: newName,
        teamA: teams.find((t) => t._id === id).teamA.map((p) => p._id),
        teamB: teams.find((t) => t._id === id).teamB.map((p) => p._id),
      });
      setTeams((prev) =>
        prev.map((t) => (t._id === id ? res.data.team : t))
      );
      setEditingTeam(null);
    } catch (error) {
      console.error("Error updating team:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Saved Teams</h1>
      {teams.map((team) => (
        <div key={team._id} className="mb-8 border p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            {editingTeam === team._id ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border p-1"
              />
            ) : (
              <h2 className="text-xl font-semibold">{team.name}</h2>
            )}
            <div className="flex gap-2">
              {editingTeam === team._id ? (
                <button
                  onClick={() => saveEdit(team._id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEditing(team)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteTeam(team._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">Team A</h3>
              {team.teamA.map((player) => (
                <PlayerCard key={player._id} player={player} />
              ))}
            </div>
            <div>
              <h3 className="font-bold mb-2">Team B</h3>
              {team.teamB.map((player) => (
                <PlayerCard key={player._id} player={player} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TeamsPage;