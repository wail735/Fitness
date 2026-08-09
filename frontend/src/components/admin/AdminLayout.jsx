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
    <div className="min-h-screen bg-[#0b0c10] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#12141a] border-r border-slate-800/50 p-6 flex flex-col justify-between space-y-8">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-600/20 text-red-500 rounded-xl border border-red-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-base leading-tight">Admin Fitness</h2>
              <p className="text-[10px] text-slate-400">Panneau de Contrôle</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            <Link
              to="/admin"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                location.pathname === "/admin"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Vue d'Ensemble
            </Link>
            <Link
              to="/admin/schedule"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                location.pathname === "/admin/schedule"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Calendar className="w-4 h-4" />
              Gestion du Planning
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800/50 space-y-3">
          <div className="text-xs text-slate-400 px-2">
            Connecté: <strong className="text-white block">{user?.name || "Administrateur"}</strong>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
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
