import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { LayoutContext } from "../context/LayoutContext";
import { useAuth } from "../context/AuthContext";
import { User, ShieldCheck, Calculator } from "lucide-react";

const NAV_LINKS = [
  { label: "HOME", path: "/" },
  { label: "SCHEDULE", path: "/schedule" },
  { label: "CALCULATEURS", path: "/calculators" },
  { label: "ABOUT US", path: "/about-us" },
  { label: "GALLERY", path: "/gallery" },
  { label: "BLOG", path: "/blog" },
];

function NavBar() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { data, dispatch } = useContext(LayoutContext);
  const { user, logout } = useAuth();
  const isOpen = data.navbarHamburger;

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-md">
      <nav className="relative h-20 w-full px-4 lg:px-8 flex justify-between items-center border-b border-white/10 shadow-sm bg-white text-black dark:bg-slate-950 dark:text-white text-slate-900 transition-all duration-300">
        <Link to="/" aria-label="Home" className="group shrink-0">
          <div className="flex gap-2.5 text-2xl items-center">
            <div className="p-2 rounded-xl bg-orange-100 dark:bg-red-500/10 transition-colors duration-300 group-hover:bg-red-500">
              <i className="fa-solid fa-dumbbell text-red-500 transition-colors duration-300 group-hover:dark:text-white hover:text-slate-900"></i>
            </div>
            <span className="font-black tracking-tight bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
              ACTIVITAR
            </span>
          </div>
        </Link>

        <ul className="hidden lg:flex gap-5 xl:gap-8 dark:text-white text-slate-900 text-black font-semibold text-xs xl:text-sm tracking-wide">
          {NAV_LINKS.map(({ label, path }) => (
            <li key={label} className="whitespace-nowrap">
              <Link
                to={path}
                className="relative pb-1 text-black dark:text-slate-200 text-slate-800 hover:text-red-400 transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* User Auth state */}
          {user ? (
            <div className="flex items-center gap-2">
              {user.role === "admin" ? (
                <Link
                  to="/admin"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 dark:text-white text-slate-900 text-xs font-bold rounded-xl transition-all shadow-md shadow-red-600/20"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin
                </Link>
              ) : user.role === "coach" ? (
                <Link
                  to="/coach"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 dark:text-white text-slate-900 text-xs font-bold rounded-xl transition-all shadow-md shadow-amber-600/20"
                >
                  <User className="w-3.5 h-3.5" /> Coach
                </Link>
              ) : (
                <Link
                  to="/my-dashboard"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-red-600/20"
                >
                  <User className="w-3.5 h-3.5" /> Espace Membre
                </Link>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="flex items-center justify-center px-4 py-2 bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-red-600/10 cursor-pointer"
              >
                Connexion
              </Link>
              <Link
                to="/login"
                state={{ isSignUp: true }}
                className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-red-600/20 cursor-pointer"
              >
                S'inscrire
              </Link>
            </div>
          )}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-black dark:text-white text-slate-900 cursor-pointer text-xl transition-all duration-300 hover:text-red-400 p-1"
          >
            <i className={`fa-solid ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
          </button>

          <button
            onClick={() => dispatch({ type: "TOGGLE_NAVBAR" })}
            className="lg:hidden flex items-center gap-2 bg-gray-200 dark:bg-slate-800 text-black dark:text-white text-slate-900 text-xl sm:text-sm px-3 py-2 rounded hover:bg-gray-300 dark:hover:bg-slate-700 transition"
          >
            <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"} w-4 text-center`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden absolute top-20 left-0 w-full bg-slate-950/95 backdrop-blur-lg border-b border-white/10 transition-all duration-300 z-40 overflow-y-auto ${
          isOpen ? "max-h-96 p-6" : "max-h-0 p-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col gap-4">
          {NAV_LINKS.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              onClick={() => dispatch({ type: "TOGGLE_NAVBAR" })}
              className="dark:text-white text-slate-900 hover:text-red-400 font-semibold text-sm transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => dispatch({ type: "TOGGLE_NAVBAR" })}
            className="text-sm text-red-500 font-bold"
          >
            Connexion / Inscription
          </Link>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
