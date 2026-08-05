import React, { useState } from "react";
import { useFitness } from "../../context/FitnessContext";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Plus, ArrowLeft, Check } from "lucide-react";

export default function WorkoutBuilder() {
  const { addRoutine } = useFitness();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("Intermédiaire");
  const [exercisesCount, setExercisesCount] = useState(8);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    addRoutine({
      title,
      target,
      exercisesCount: Number(exercisesCount),
    });

    navigate("/coach");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <button
          onClick={() => navigate("/coach")}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Retour au Tableau de Bord Coach
        </button>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-600/20 text-amber-500 rounded-2xl border border-amber-500/30">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Créer un Nouveau Programme</h2>
              <p className="text-xs text-slate-400">Définissez une routine personnalisée pour vos élèves.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Titre du Programme</label>
              <input
                type="text"
                placeholder="ex: Hypertrophie Pectoraux & Épaules (4 Semaines)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-white focus:border-amber-500 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Niveau Cible</label>
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="Débutant">Débutant</option>
                  <option value="Intermédiaire">Intermédiaire</option>
                  <option value="Avancé">Avancé</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Nombre d'Exercices</label>
                <input
                  type="number"
                  value={exercisesCount}
                  onChange={(e) => setExercisesCount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-xl tracking-wider uppercase shadow-lg shadow-amber-600/20 mt-4 flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" /> Enregistrer le Programme
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
