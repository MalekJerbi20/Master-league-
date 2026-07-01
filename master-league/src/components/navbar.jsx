import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 backdrop-blur border-b border-emerald-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6">
        <ul className="flex items-center justify-between space-x-1 py-4">
          {/* Logo */}
          <li className="mr-8">
            <Link to="/" className="gradient-text text-2xl font-bold hover:scale-105 transition-transform">
              ⚽ MASTER LEAGUE
            </Link>
          </li>

          {/* Nav Links */}
          <div className="flex items-center space-x-4 flex-1">
            <NavLink to="/players" label="Players" />
            <NavLink to="/teams" label="Teams" />
            <NavLink to="/teamGenerator" label="Generator" />
            <NavLink to="/formation" label="Formation" />
            <NavLink to="/addplayer" label="Add Player" />
          </div>

          {/* Auth Links */}
          <div className="flex items-center space-x-3">
            <NavLink to="/login" label="Login" />
            <Link
              to="/signup"
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:from-emerald-500 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/50"
            >
              Signup
            </Link>
          </div>
        </ul>
      </div>
    </nav>
  );
}

function NavLink({ to, label }) {
  return (
    <li>
      <Link
        to={to}
        className="text-gray-300 font-medium hover:text-emerald-400 transition-all duration-300 relative group"
      >
        {label}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 group-hover:w-full transition-all duration-300"></span>
      </Link>
    </li>
  );
}
