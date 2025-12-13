import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li ><Link to="/addplayer">Add Player</Link></li>
        <li><Link to="/players">Players</Link></li>
        <li><Link to="/teams">Teams</Link></li>
        <li><Link to="/teamGenerator">Team Generator</Link></li>
        <li><Link to="/playerCard">Player Card</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
    </nav>
  );
}
            
export default Navbar;
