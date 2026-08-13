import React, { useState } from "react";
import { useFitness } from "../../context/FitnessContext";
import { Utensils, Plus, Flame, X, Apple } from "lucide-react";

const inputClass = "w-full dark:bg-[#0b0c10] bg-slate-50 border dark:border-slate-800 border-slate-200 rounded-xl py-2.5 px-3 text-sm dark:text-white text-slate-900 focus:border-amber-500 focus:outline-none placeholder:text-slate-600 transition-colors";
const selectClass = "w-full dark:bg-[#0b0c10] bg-slate-50 border dark:border-slate-800 border-slate-200 rounded-xl py-2.5 px-3 text-sm dark:text-white text-slate-900 focus:border-amber-500 focus:outline-none appearance-none transition-colors";
const labelClass = "block text-xs font-medium dark:text-slate-400 text-slate-600 mb-1.5";

const MEAL_COLORS = {
  "Petit-Déjeuner": { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  "Déjeuner":       { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  "Dîner":          { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  "Collation":      { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
};

export default function NutritionTracker() {
  const { nutritionLogs, addNutritionLog } = useFitness();
  const [showModal, setShowModal] = useState(false);
  const [meal, setMeal] = useState("Petit-Déjeuner");
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState(500);
  const [protein, setProtein] = useState(30);
  const [carbs, setCarbs] = useState(50);
  const [fat, setFat] = useState(15);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!food) return;
    addNutritionLog({ date: new Date().toISOString().split("T")[0], meal, food, calories: Number(calories), protein: Number(protein), carbs: Number(carbs), fat: Number(fat) });
    setFood(""); setShowModal(false);
  };

  const totalCals  = nutritionLogs.reduce((a, l) => a + l.calories, 0);
  const totalProt  = nutritionLogs.reduce((a, l) => a + l.protein, 0);
  const totalCarbs = nutritionLogs.reduce((a, l) => a + l.carbs, 0);
  const totalFat   = nutritionLogs.reduce((a, l) => a + l.fat, 0);

  // Progress bars relative to daily goals
  const goals = { cals: 2200, protein: 150, carbs: 250, fat: 70 };
  const pct = (v, g) => Math.min(100, Math.round((v / g) * 100));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Journal Nutritionnel</p>
          <h1 className="text-2xl font-bold dark:text-white text-slate-900 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Utensils className="w-5 h-5 text-amber-400" />
            </div>
            Timelines
          </h1>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all"
        >
          <Plus className="w-4 h-4" /> Ajouter un Repas
        </button>
      </div>

      {/* Daily Summary */}
      <div className="dark:bg-[#12141a] bg-white border dark:border-slate-800 border-slate-200/50 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold dark:text-slate-200 text-slate-800 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" /> Totaux du Jour
          </h3>
          <span className="text-xl font-bold text-amber-400">{totalCals} <span className="text-xs text-slate-500 font-normal">kcal</span></span>
        </div>

        <div className="space-y-4">
          {[
            { label: "Calories", value: totalCals, goal: goals.cals, unit: "kcal", color: "#f59e0b", colorClass: "bg-amber-500" },
            { label: "Protéines", value: totalProt, goal: goals.protein, unit: "g", color: "#ef4444", colorClass: "bg-red-500" },
            { label: "Glucides", value: totalCarbs, goal: goals.carbs, unit: "g", color: "#3b82f6", colorClass: "bg-blue-500" },
            { label: "Lipides", value: totalFat, goal: goals.fat, unit: "g", color: "#8b5cf6", colorClass: "bg-purple-500" },
          ].map((m) => (
            <div key={m.label}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs dark:text-slate-400 text-slate-600">{m.label}</span>
                <span className="text-xs dark:text-slate-300 text-slate-700">
                  <span className="font-bold dark:text-white text-slate-900">{m.value}</span> / {m.goal} {m.unit}
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${m.colorClass}`}
                  style={{ width: `${pct(m.value, m.goal)}%`, opacity: 0.8 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logs */}
      <div className="dark:bg-[#12141a] bg-white border dark:border-slate-800 border-slate-200/50 rounded-3xl p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-base font-semibold dark:text-slate-200 text-slate-800">Repas Enregistrés</h3>
          <span className="text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">{nutritionLogs.length} entrées</span>
        </div>

        {nutritionLogs.length === 0 ? (
          <div className="text-center py-12 text-slate-600">
            <Apple className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Aucun repas enregistré. Commencez à tracker votre nutrition !</p>
          </div>
        ) : (
          <div className="space-y-2">
            {nutritionLogs.map((log, i) => {
              const c = MEAL_COLORS[log.meal] || MEAL_COLORS["Collation"];
              return (
                <div key={log._id || log.id || i} className="flex items-center justify-between p-4 rounded-2xl dark:bg-[#0f1115] bg-slate-50 border dark:border-slate-800 border-slate-200/50 hover:dark:border-slate-700 border-slate-300/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
                      <Utensils size={14} className={c.text} />
                    </div>
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${c.text}`}>{log.meal}</span>
                      <p className="text-sm font-semibold dark:text-white text-slate-900">{log.food}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-xs">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] text-slate-500">P / G / L</p>
                      <p className="dark:text-slate-300 text-slate-700 font-medium">{log.protein}g / {log.carbs}g / {log.fat}g</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-500">Calories</p>
                      <p className="text-amber-400 font-bold">{log.calories} kcal</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md dark:bg-[#12141a] bg-white border dark:border-slate-800 border-slate-200 rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold dark:text-white text-slate-900">Ajouter un Repas</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center dark:text-slate-400 text-slate-600 transition-colors"><X size={14} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Repas</label>
                <select value={meal} onChange={(e) => setMeal(e.target.value)} className={selectClass}>
                  <option>Petit-Déjeuner</option>
                  <option>Déjeuner</option>
                  <option>Dîner</option>
                  <option value="Collation">Collation / En-cas</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Description des aliments</label>
                <input type="text" placeholder="ex: Poulet, Riz et Avocat" value={food} onChange={(e) => setFood(e.target.value)} className={inputClass} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Calories (kcal)</label>
                  <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Protéines (g)</label>
                  <input type="number" value={protein} onChange={(e) => setProtein(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Glucides (g)</label>
                  <input type="number" value={carbs} onChange={(e) => setCarbs(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Lipides (g)</label>
                  <input type="number" value={fat} onChange={(e) => setFat(e.target.value)} className={inputClass} />
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-xs font-semibold dark:text-slate-400 text-slate-600 hover:dark:text-white hover:text-slate-900 transition-colors">Annuler</button>
                <button type="submit" className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl transition-colors">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
