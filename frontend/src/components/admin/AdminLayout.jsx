import React from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ShieldCheck, LayoutDashboard, Calendar, LogOut, Globe } from "lucide-react";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen dark:bg-[#0b0c10] bg-slate-50 dark:text-white text-slate-900 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 dark:bg-[#12141a] bg-white border-r dark:border-slate-800 border-slate-200/50 p-6 flex flex-col justify-between space-y-8">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-600/20 text-red-500 rounded-xl border border-red-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold dark:text-white text-slate-900 text-base leading-tight">Admin Fitness</h2>
              <p className="text-[10px] dark:text-slate-400 text-slate-600">Panneau de Contrôle</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            <Link
              to="/admin"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                location.pathname === "/admin"
                  ? "bg-red-600 dark:text-white text-slate-900 shadow-lg shadow-red-600/20"
                  : "dark:text-slate-400 text-slate-600 hover:dark:text-white hover:text-slate-900 hover:bg-slate-800/60"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Vue d'Ensemble
            </Link>
            <Link
              to="/admin/schedule"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                location.pathname === "/admin/schedule"
                  ? "bg-red-600 dark:text-white text-slate-900 shadow-lg shadow-red-600/20"
                  : "dark:text-slate-400 text-slate-600 hover:dark:text-white hover:text-slate-900 hover:bg-slate-800/60"
              }`}
            >
              <Calendar className="w-4 h-4" />
              Gestion du Planning
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t dark:border-slate-800 border-slate-200/50 space-y-3">
          <div className="text-xs dark:text-slate-400 text-slate-600 px-2">
            Connecté: <strong className="dark:text-white text-slate-900 block">{user?.name || "Administrateur"}</strong>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium dark:text-slate-400 text-slate-600 hover:dark:text-white hover:text-slate-900 transition-colors"
          >
            <Globe className="w-4 h-4" /> Voir le site public
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" /> Se Déconnecter
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
