import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { UserCheck, Dumbbell, Users, Plus, Award, Loader2, Calendar, BarChart2 } from "lucide-react";
import api from "../../api/axiosConfig";

export default function CoachDashboard() {
  const { user } = useAuth();

  const [members, setMembers]   = useState([]);
  const [routines, setRoutines] = useState([]);
  const [stats, setStats]       = useState({ totalMembers: 0, totalRoutines: 0, totalBookings: 0 });
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [membersRes, routinesRes, statsRes] = await Promise.all([
          api.get("/coach/members"),
          api.get("/coach/routines"),
          api.get("/coach/stats"),
        ]);
        setMembers(membersRes.data);
        setRoutines(routinesRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error("Erreur chargement dashboard coach:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Formate la date d'inscription en "il y a X jours"
  const formatLastSeen = (dateStr) => {
    if (!dateStr) return "Aucune séance";
    const diff = Math.floor((Date.now() - new Date(dateStr)) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Aujourd'hui";
    if (diff === 1) return "Hier";
    return `Il y a ${diff} jours`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-amber-500 tracking-widest flex items-center gap-1.5 mb-1">
              <UserCheck className="w-4 h-4" /> Espace Entraîneur
            </span>
            <h1 className="text-3xl font-black text-white">Tableau de Bord Coach</h1>
            <p className="text-slate-400 text-sm">
              Bienvenue, <span className="text-amber-400 font-semibold">{user?.name}</span> — gérez vos membres et programmes.
            </p>
          </div>
          <Link
            to="/coach/builder"
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-amber-600/20 transition-all"
          >
            <Plus className="w-4 h-4" /> Créer un Programme
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-500" /> Membres Inscrits
            </span>
            <div className="text-3xl font-extrabold text-white mt-2">{stats.totalMembers}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4 text-amber-500" /> Programmes Créés
            </span>
            <div className="text-3xl font-extrabold text-white mt-2">{stats.totalRoutines}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-500" /> Réservations Totales
            </span>
            <div className="text-3xl font-extrabold text-amber-400 mt-2">{stats.totalBookings}</div>
          </div>
        </div>

        {/* Members List */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" /> Membres Inscrits
            <span className="ml-auto text-xs font-normal text-slate-500 bg-slate-800 px-2 py-1 rounded-full">
              {members.length} membre{members.length !== 1 ? "s" : ""}
            </span>
          </h3>

          {members.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              <Users className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p>Aucun membre inscrit pour l'instant.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((m) => (
                <div key={m._id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 hover:border-amber-500/30 transition-all">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                        {m.name?.charAt(0).toUpperCase()}
                      </div>
                      <h4 className="font-bold text-white text-sm">{m.name}</h4>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold rounded-full border border-emerald-500/20">
                      Actif
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{m.email}</p>
                  <div className="flex gap-3 text-[11px] text-slate-500 pt-1 border-t border-slate-800">
                    <span>🏋️ <strong className="text-slate-300">{m.workoutsCount}</strong> séances</span>
                    <span>📅 <strong className="text-slate-300">{m.bookingsCount}</strong> réservations</span>
                  </div>
                  <div className="text-[10px] text-slate-600">
                    Inscrit le : {new Date(m.createdAt).toLocaleDateString("fr-FR")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Routines */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-amber-500" /> Programmes Disponibles
            <span className="ml-auto text-xs font-normal text-slate-500 bg-slate-800 px-2 py-1 rounded-full">
              {routines.length} programme{routines.length !== 1 ? "s" : ""}
            </span>
          </h3>

          {routines.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              <Dumbbell className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p>Aucun programme créé.{" "}
                <Link to="/coach/builder" className="text-amber-400 hover:underline">Créer le premier</Link>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {routines.map((r) => (
                <div key={r._id || r.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2 hover:border-amber-500/30 transition-all">
                  <h4 className="font-bold text-white text-base">{r.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>Niveau: <strong className="text-slate-200">{r.target}</strong></span>
                    <span>•</span>
                    <span>{r.exercisesCount} exercices</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
