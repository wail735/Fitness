import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useFitness } from "../../context/FitnessContext";
import { Link } from "react-router-dom";
import { UserCheck, Dumbbell, Users, Plus, Award } from "lucide-react";

export default function CoachDashboard() {
  const { user } = useAuth();
  const { routines } = useFitness();

  const clients = [
    { id: "c1", name: "Marc Vasseur", goal: "Prise de Masse", status: "Actif", lastActive: "Aujourd'hui" },
    { id: "c2", name: "Sophie Martin", goal: "Sèche & Tonification", status: "Actif", lastActive: "Hier" },
    { id: "c3", name: "Thomas Dubois", goal: "Conditionnement Boxing", status: "Actif", lastActive: "Il y a 3 jours" },
  ];

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
            <p className="text-slate-400 text-sm">Gérez vos membres suivis et créez des programmes sur-mesure.</p>
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
            <span className="text-xs font-bold text-slate-400 uppercase">Membres Suivis</span>
            <div className="text-3xl font-extrabold text-white mt-1">{clients.length}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs font-bold text-slate-400 uppercase">Programmes Créés</span>
            <div className="text-3xl font-extrabold text-white mt-1">{routines.length}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs font-bold text-slate-400 uppercase">Taux de Satisfaction</span>
            <div className="text-3xl font-extrabold text-amber-400 mt-1">98 %</div>
          </div>
        </div>

        {/* Clients List */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" /> Membres Accompagnés
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {clients.map((c) => (
              <div key={c.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white">{c.name}</h4>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold rounded-full border border-emerald-500/20">
                    {c.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400">Objectif: <strong className="text-amber-400">{c.goal}</strong></p>
                <div className="text-[10px] text-slate-500">Dernière séance: {c.lastActive}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Workout Routines */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-amber-500" /> Programmes Disponibles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {routines.map((r) => (
              <div key={r.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2">
                <h4 className="font-bold text-white text-base">{r.title}</h4>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>Niveau: <strong className="text-slate-200">{r.target}</strong></span>
                  <span>•</span>
                  <span>{r.exercisesCount} exercices</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
