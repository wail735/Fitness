import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  UserCheck, Dumbbell, Users, Plus, Calendar,
  Loader2, TrendingUp, Zap, Star, ChevronRight,
  Activity, Award, BarChart3, Clock, LogOut, ArrowUpRight
} from "lucide-react";
import api from "../../api/axiosConfig";

/* ─── Animated counter hook ──────────────────────────────────────────────── */
function useCounter(target, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
}

/* ─── Greeting ───────────────────────────────────────────────────────────── */
const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

/* ─── Stat Card ──────────────────────────────────────────────────────────── */
function StatCard({ icon: Icon, label, value, color, bg }) {
  const count = useCounter(value);
  return (
    <div className="bg-[#12141a] border border-slate-800/50 rounded-3xl p-6 flex flex-col justify-between group hover:border-slate-700 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center`}>
          <Icon size={24} className={color} />
        </div>
        <button className="w-8 h-8 rounded-full bg-[#1a1d24] flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
          <ArrowUpRight size={14} />
        </button>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-400 mb-1">{label}</p>
        <h3 className="text-3xl font-bold text-white">{count}</h3>
      </div>
    </div>
  );
}

/* ─── Main Dashboard ──────────────────────────────────────────────────────── */
export default function CoachDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [members, setMembers]   = useState([]);
  const [routines, setRoutines] = useState([]);
  const [stats, setStats]       = useState({ totalMembers: 0, totalRoutines: 0, totalBookings: 0 });
  const [loading, setLoading]   = useState(true);
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [mRes, rRes, sRes] = await Promise.all([
          api.get("/coach/members"),
          api.get("/coach/routines"),
          api.get("/coach/stats"),
        ]);
        setMembers(mRes.data);
        setRoutines(rRes.data);
        setStats(sRes.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="text-slate-400 text-sm">Chargement de l'espace coach...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-slate-400 text-sm mb-1">{getGreeting()},</p>
          <h1 className="text-3xl font-bold text-white tracking-tight">Coach {user?.name?.split(" ")[0] || ""}</h1>
        </div>
        <Link 
          to="/coach/builder"
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all self-start sm:self-auto"
        >
          <Plus size={16} /> Nouveau Programme
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={Users} label="Membres Inscrits" value={stats.totalMembers} color="text-blue-400" bg="bg-blue-500/10" />
        <StatCard icon={Dumbbell} label="Programmes Créés" value={stats.totalRoutines} color="text-purple-400" bg="bg-purple-500/10" />
        <StatCard icon={Calendar} label="Réservations" value={stats.totalBookings} color="text-emerald-400" bg="bg-emerald-500/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Members List */}
        <div className="bg-[#12141a] border border-slate-800/50 rounded-3xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-slate-200">Membres Récents</h3>
            <span className="text-xs font-semibold px-2.5 py-1 bg-[#1a1d24] text-slate-400 rounded-lg">{members.length} Total</span>
          </div>

          <div className="space-y-2 flex-1">
            {members.length === 0 ? (
              <div className="text-center py-10">
                <Users size={32} className="mx-auto text-slate-600 mb-3" />
                <p className="text-slate-400 text-sm">Aucun membre n'est inscrit pour l'instant.</p>
              </div>
            ) : (
              members.slice(0, 5).map((m, i) => {
                const initials = m.name?.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() || "MB";
                const colors = [
                  { bg: 'bg-amber-500/10', text: 'text-amber-500' },
                  { bg: 'bg-blue-500/10', text: 'text-blue-500' },
                  { bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
                  { bg: 'bg-purple-500/10', text: 'text-purple-500' },
                  { bg: 'bg-rose-500/10', text: 'text-rose-500' }
                ];
                const c = colors[i % colors.length];

                return (
                  <div key={m._id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#1a1d24] transition-colors border border-transparent hover:border-slate-800/50">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.text} flex items-center justify-center font-bold text-sm shrink-0`}>
                        {initials}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-200">{m.name}</h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:block text-right">
                        <p className="text-[10px] text-slate-400 mb-0.5"><Activity size={10} className="inline mr-1" />{m.workoutsCount} séances</p>
                        <p className="text-[10px] text-slate-500">Inscrit le {new Date(m.createdAt).toLocaleDateString("fr-FR")}</p>
                      </div>
                      <button className="text-slate-500 hover:text-white"><ChevronRight size={16} /></button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {members.length > 5 && (
            <button className="w-full mt-4 py-3 bg-[#1a1d24] hover:bg-[#252a36] transition-colors rounded-xl text-sm text-slate-300 font-medium text-center">
              Voir tous les membres
            </button>
          )}
        </div>

        {/* Routines List */}
        <div className="bg-[#12141a] border border-slate-800/50 rounded-3xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-slate-200">Programmes</h3>
            <Link to="/coach/builder" className="text-xs text-emerald-400 font-semibold hover:text-emerald-300">+ Ajouter</Link>
          </div>

          <div className="space-y-3 flex-1">
            {routines.length === 0 ? (
              <div className="text-center py-10">
                <Dumbbell size={32} className="mx-auto text-slate-600 mb-3" />
                <p className="text-slate-400 text-sm mb-3">Aucun programme créé.</p>
                <Link to="/coach/builder" className="text-xs text-emerald-400 font-semibold underline">Créer mon premier programme</Link>
              </div>
            ) : (
              routines.map((r, i) => {
                const levels = {
                  Débutant: { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                  Intermédiaire: { color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
                  Avancé: { color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
                };
                const lvl = levels[r.target] || levels["Intermédiaire"];

                return (
                  <div 
                    key={r._id || r.id} 
                    onClick={() => setSelectedRoutine(r)}
                    className="bg-gradient-to-r from-[#1a1d24] to-[#12141a] border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-slate-700 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${lvl.bg} border ${lvl.border} flex flex-col items-center justify-center shrink-0`}>
                        <Dumbbell size={18} className={lvl.color} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">{r.title}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${lvl.bg} ${lvl.color}`}>
                            {r.target}
                          </span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Activity size={10} /> {r.exercisesCount} exo.
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="text-slate-500 hover:text-white shrink-0 self-end sm:self-auto"><ChevronRight size={18} /></button>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* Routine Detail Modal */}
      {selectedRoutine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedRoutine(null)}>
          <div className="bg-[#12141a] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center shrink-0">
                  <Dumbbell size={18} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">{selectedRoutine.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">Créé le {new Date(selectedRoutine.createdAt || Date.now()).toLocaleDateString("fr-FR")}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-[#1a1d24] p-4 rounded-2xl flex justify-between items-center">
                <span className="text-sm font-medium text-slate-400">Niveau Cible</span>
                <span className="text-sm font-bold text-emerald-400">{selectedRoutine.target}</span>
              </div>
              <div className="bg-[#1a1d24] p-4 rounded-2xl flex justify-between items-center">
                <span className="text-sm font-medium text-slate-400">Nombre d'exercices</span>
                <span className="text-sm font-bold text-white">{selectedRoutine.exercisesCount} exercices</span>
              </div>
              <div className="bg-[#1a1d24] p-4 rounded-2xl flex justify-between items-center">
                <span className="text-sm font-medium text-slate-400">Membres assignés</span>
                <span className="text-sm font-bold text-white">Tous (Global)</span>
              </div>
            </div>

            <button 
              onClick={() => setSelectedRoutine(null)}
              className="w-full mt-8 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
