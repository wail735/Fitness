import React, { useState } from "react";
import { useFitness } from "../../context/FitnessContext";
import { Dumbbell, Plus, Calendar, Flame, Clock } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export default function WorkoutTracker() {
  const { workouts, addWorkout } = useFitness();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(60);
  const [calories, setCalories] = useState(450);
  const [exName, setExName] = useState("");
  const [exSets, setExSets] = useState(4);
  const [exReps, setExReps] = useState(10);
  const [exWeight, setExWeight] = useState(70);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    addWorkout({
      date: new Date().toISOString().split("T")[0],
      name,
      durationMinutes: Number(duration),
      caloriesBurned: Number(calories),
      exercises: exName ? [{ name: exName, sets: Number(exSets), reps: Number(exReps), weightKg: Number(exWeight) }] : [],
    });

    setName("");
    setExName("");
    setShowModal(false);
  };

  const chartData = [...workouts].reverse().map((w) => ({
    date: w.date,
    calories: w.caloriesBurned,
    duration: w.durationMinutes,
  }));

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
              <Dumbbell className="w-8 h-8 text-red-500" /> Journal d'Entraînement
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Enregistrez vos séances et suivez vos performances musculaires.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-red-600/20 transition-all"
          >
            <Plus className="w-4 h-4" /> Enregistrer une Séance
          </button>
        </div>

        {/* Progress Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-sm font-semibold text-slate-400 mb-4 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" /> Évolution des Calories Brûlées
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="calColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff" }}
                />
                <Area type="monotone" dataKey="calories" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#calColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Workout History List */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Historique Récent</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workouts.map((w) => (
              <div key={w.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-white">{w.name}</h4>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {w.date}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                  <span className="flex items-center gap-1 text-amber-400">
                    <Flame className="w-3.5 h-3.5" /> {w.caloriesBurned} kcal
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Clock className="w-3.5 h-3.5" /> {w.durationMinutes} min
                  </span>
                </div>

                {w.exercises && w.exercises.length > 0 && (
                  <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
                    {w.exercises.map((ex, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-slate-300">
                        <span>• {ex.name}</span>
                        <span className="font-semibold text-red-400">
                          {ex.sets} x {ex.reps} @ {ex.weightKg} kg
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Add Workout Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Ajouter une Séance</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Nom de la Séance</label>
                <input
                  type="text"
                  placeholder="ex: Séance Pectoraux"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:border-red-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Durée (min)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="border-t border-slate-800 pt-3">
                <span className="text-xs font-semibold text-slate-400">Exercice principal (Optionnel)</span>
                <div className="space-y-2 mt-2">
                  <input
                    type="text"
                    placeholder="Nom de l'exercice (ex: Squat)"
                    value={exName}
                    onChange={(e) => setExName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:border-red-500 focus:outline-none"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      placeholder="Séries"
                      value={exSets}
                      onChange={(e) => setExSets(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl py-1.5 px-2 text-xs text-white text-center"
                    />
                    <input
                      type="number"
                      placeholder="Reps"
                      value={exReps}
                      onChange={(e) => setExReps(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl py-1.5 px-2 text-xs text-white text-center"
                    />
                    <input
                      type="number"
                      placeholder="Poids (kg)"
                      value={exWeight}
                      onChange={(e) => setExWeight(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl py-1.5 px-2 text-xs text-white text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
