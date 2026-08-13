import React, { useState } from "react";
import { useFitness } from "../../context/FitnessContext";
import { Dumbbell, Plus, Calendar, Flame, Clock, X, TrendingUp } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const inputClass = "w-full dark:bg-[#0b0c10] bg-slate-50 border dark:border-slate-800 border-slate-200 rounded-xl py-2.5 px-3 text-sm dark:text-white text-slate-900 focus:border-emerald-500 focus:outline-none placeholder:text-slate-600 transition-colors";
const labelClass = "block text-xs font-medium dark:text-slate-400 text-slate-600 mb-1.5";

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
    setName(""); setExName(""); setShowModal(false);
  };

  const chartData = [...workouts].reverse().map((w) => ({
    date: w.date,
    calories: w.caloriesBurned,
    duration: w.durationMinutes,
  }));

  const totalCals = workouts.reduce((a, w) => a + w.caloriesBurned, 0);
  const totalMins = workouts.reduce((a, w) => a + w.durationMinutes, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Journal d'entraînement</p>
          <h1 className="text-2xl font-bold dark:text-white text-slate-900 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-emerald-400" />
            </div>
            Analytics
          </h1>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
        >
          <Plus className="w-4 h-4" /> Enregistrer une Séance
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Séances totales", value: workouts.length, unit: "", icon: <Dumbbell size={18} className="text-emerald-400" />, color: "#10b981" },
          { label: "Calories brûlées", value: totalCals, unit: "kcal", icon: <Flame size={18} className="text-amber-400" />, color: "#f59e0b" },
          { label: "Temps d'entraînement", value: Math.round(totalMins / 60), unit: "h", icon: <Clock size={18} className="text-blue-400" />, color: "#3b82f6" },
        ].map((s, i) => (
          <div key={i} className="dark:bg-[#12141a] bg-white border dark:border-slate-800 border-slate-200/50 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
              {s.icon}
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">{s.label}</p>
              <p className="text-2xl font-bold dark:text-white text-slate-900 leading-none">{s.value}<span className="text-xs text-slate-500 font-normal ml-1">{s.unit}</span></p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="dark:bg-[#12141a] bg-white border dark:border-slate-800 border-slate-200/50 rounded-3xl p-6">
        <h3 className="text-sm font-semibold dark:text-slate-400 text-slate-600 mb-6 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" /> Évolution des Calories Brûlées
        </h3>
        <div className="h-52 w-full">
          {chartData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-600 text-sm">Aucune séance enregistrée</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="calGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#334155" fontSize={11} tick={{ fill: "#475569" }} />
                <YAxis stroke="#334155" fontSize={11} tick={{ fill: "#475569" }} />
                <Tooltip contentStyle={{ backgroundColor: "#12141a", borderColor: "#1e2130", borderRadius: "12px", color: "#fff", fontSize: "12px" }} />
                <Area type="monotone" dataKey="calories" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#calGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Workout History */}
      <div className="dark:bg-[#12141a] bg-white border dark:border-slate-800 border-slate-200/50 rounded-3xl p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-base font-semibold dark:text-slate-200 text-slate-800">Historique Récent</h3>
          <span className="text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">{workouts.length} séances</span>
        </div>
        {workouts.length === 0 ? (
          <div className="text-center py-12 text-slate-600">
            <Dumbbell className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Aucune séance. Enregistrez votre première séance !</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workouts.map((w, i) => (
              <div key={w._id || w.id || i} className="dark:bg-[#0f1115] bg-slate-50 border dark:border-slate-800 border-slate-200/50 rounded-2xl p-4 hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold dark:text-white text-slate-900 text-sm">{w.name}</h4>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> {w.date}</span>
                </div>
                <div className="flex items-center gap-3 text-xs mb-3">
                  <span className="flex items-center gap-1 text-amber-400 bg-amber-400/10 px-2 py-1 rounded-lg">
                    <Flame className="w-3 h-3" /> {w.caloriesBurned} kcal
                  </span>
                  <span className="flex items-center gap-1 dark:text-slate-400 text-slate-600 bg-slate-800/50 px-2 py-1 rounded-lg">
                    <Clock className="w-3 h-3" /> {w.durationMinutes} min
                  </span>
                </div>
                {w.exercises && w.exercises.length > 0 && (
                  <div className="space-y-1.5 pt-3 border-t dark:border-slate-800 border-slate-200/50">
                    {w.exercises.map((ex, idx) => (
                      <div key={idx} className="flex justify-between text-xs dark:text-slate-400 text-slate-600">
                        <span>• {ex.name}</span>
                        <span className="text-emerald-400 font-semibold">{ex.sets}×{ex.reps} @ {ex.weightKg}kg</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md dark:bg-[#12141a] bg-white border dark:border-slate-800 border-slate-200 rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold dark:text-white text-slate-900">Ajouter une Séance</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center dark:text-slate-400 text-slate-600 transition-colors"><X size={14} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Nom de la Séance</label>
                <input type="text" placeholder="ex: Séance Pectoraux" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Durée (min)</label>
                  <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Calories (kcal)</label>
                  <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} className={inputClass} />
                </div>
              </div>
              <div className="border-t dark:border-slate-800 border-slate-200 pt-4">
                <p className="text-xs font-semibold text-slate-500 mb-3">Exercice principal (Optionnel)</p>
                <div className="space-y-2">
                  <input type="text" placeholder="Nom de l'exercice (ex: Squat)" value={exName} onChange={(e) => setExName(e.target.value)} className={inputClass} />
                  <div className="grid grid-cols-3 gap-2">
                    <input type="number" placeholder="Séries" value={exSets} onChange={(e) => setExSets(e.target.value)} className={inputClass + " text-center"} />
                    <input type="number" placeholder="Reps" value={exReps} onChange={(e) => setExReps(e.target.value)} className={inputClass + " text-center"} />
                    <input type="number" placeholder="Poids (kg)" value={exWeight} onChange={(e) => setExWeight(e.target.value)} className={inputClass + " text-center"} />
                  </div>
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-xs font-semibold dark:text-slate-400 text-slate-600 hover:dark:text-white hover:text-slate-900 transition-colors">Annuler</button>
                <button type="submit" className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl transition-colors">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
