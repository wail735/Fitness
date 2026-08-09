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
    <div className="min-h-screen bg-[#020409] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        <button
          onClick={() => navigate("/coach")}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-amber-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Retour au Tableau de Bord
        </button>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center gap-4">
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
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Titre du Programme</label>
              <input
                type="text"
                placeholder="ex: Hypertrophie Pectoraux & Épaules (4 Semaines)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 focus:outline-none transition-all placeholder:text-slate-600"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Niveau Cible</label>
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 focus:outline-none transition-all appearance-none"
                >
                  <option value="Débutant">Débutant</option>
                  <option value="Intermédiaire">Intermédiaire</option>
                  <option value="Avancé">Avancé</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Nombre d'Exercices</label>
                <input
                  type="number"
                  value={exercisesCount}
                  onChange={(e) => setExercisesCount(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 focus:outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl tracking-widest uppercase shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all mt-6 flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" /> Enregistrer le Programme
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
