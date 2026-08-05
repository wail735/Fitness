import React, { useState } from "react";
import { useFitness } from "../../context/FitnessContext";
import { Utensils, Plus, Flame, PieChart } from "lucide-react";

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

    addNutritionLog({
      date: new Date().toISOString().split("T")[0],
      meal,
      food,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat),
    });

    setFood("");
    setShowModal(false);
  };

  const totalCals = nutritionLogs.reduce((acc, log) => acc + log.calories, 0);
  const totalProt = nutritionLogs.reduce((acc, log) => acc + log.protein, 0);
  const totalCarbs = nutritionLogs.reduce((acc, log) => acc + log.carbs, 0);
  const totalFat = nutritionLogs.reduce((acc, log) => acc + log.fat, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
              <Utensils className="w-8 h-8 text-amber-500" /> Journal Nutritionnel
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Suivez vos repas et équilibrez vos macronutriments quotidiens.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-amber-600/20 transition-all"
          >
            <Plus className="w-4 h-4" /> Ajouter un Repas
          </button>
        </div>

        {/* Daily Summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" /> Totaux Consommés Aujourd'hui
            </h3>
            <span className="text-2xl font-black text-amber-400">{totalCals} <span className="text-xs font-normal text-slate-400">kcal</span></span>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-xs text-red-400 font-semibold uppercase">Protéines</span>
              <div className="text-xl font-bold text-white">{totalProt} g</div>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-xs text-amber-400 font-semibold uppercase">Glucides</span>
              <div className="text-xl font-bold text-white">{totalCarbs} g</div>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-xs text-blue-400 font-semibold uppercase">Lipides</span>
              <div className="text-xl font-bold text-white">{totalFat} g</div>
            </div>
          </div>
        </div>

        {/* Logs */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Repas Enregistrés</h3>
          <div className="space-y-3">
            {nutritionLogs.map((log) => (
              <div key={log.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{log.meal}</span>
                  <p className="text-sm font-semibold text-white mt-0.5">{log.food}</p>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <span className="text-slate-300 font-bold bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                    {log.calories} kcal
                  </span>
                  <span className="text-slate-400">
                    P: <strong className="text-red-400">{log.protein}g</strong> | G: <strong className="text-amber-400">{log.carbs}g</strong> | L: <strong className="text-blue-400">{log.fat}g</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Ajouter un Repas</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Repas</label>
                <select
                  value={meal}
                  onChange={(e) => setMeal(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="Petit-Déjeuner">Petit-Déjeuner</option>
                  <option value="Déjeuner">Déjeuner</option>
                  <option value="Dîner">Dîner</option>
                  <option value="Collation">Collation / En-cas</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Description des aliments</label>
                <input
                  type="text"
                  placeholder="ex: Poulet, Riz basmati et Avocat"
                  value={food}
                  onChange={(e) => setFood(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Protéines (g)</label>
                  <input
                    type="number"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Glucides (g)</label>
                  <input
                    type="number"
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Lipides (g)</label>
                  <input
                    type="number"
                    value={fat}
                    onChange={(e) => setFat(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
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
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
