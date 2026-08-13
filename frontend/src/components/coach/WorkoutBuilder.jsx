import React, { useState } from "react";
import { useFitness } from "../../context/FitnessContext";
import { useNavigate } from "react-router-dom";
import { Dumbbell, ArrowLeft, Loader2, Save } from "lucide-react";

export default function WorkoutBuilder() {
  const { addRoutine } = useFitness();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("Intermédiaire");
  const [exercisesCount, setExercisesCount] = useState(8);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    setIsSubmitting(true);
    try {
      await addRoutine({
        title,
        target,
        exercisesCount: Number(exercisesCount),
      });
      navigate("/coach");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full dark:bg-[#0b0c10] bg-slate-50 border dark:border-slate-800 border-slate-200 rounded-xl py-3 px-4 text-sm dark:text-white text-slate-900 focus:border-emerald-500 focus:outline-none placeholder:text-slate-600 transition-colors";
  const labelClass = "block text-xs font-medium dark:text-slate-400 text-slate-600 mb-2";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <button
            onClick={() => navigate("/coach")}
            className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:dark:text-white hover:text-slate-900 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Retour au Dashboard
          </button>
          <h1 className="text-3xl font-bold dark:text-white text-slate-900 tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-emerald-400" />
            </div>
            Program Builder
          </h1>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="dark:bg-[#12141a] bg-white border dark:border-slate-800 border-slate-200/50 rounded-3xl p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className={labelClass}>Titre du Programme</label>
            <input
              type="text"
              placeholder="ex: Hypertrophie Pectoraux & Épaules (4 Semaines)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Niveau Cible</label>
              <div className="relative">
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="Débutant">Débutant (🌱)</option>
                  <option value="Intermédiaire">Intermédiaire (⚡)</option>
                  <option value="Avancé">Avancé (🔥)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>Nombre d'Exercices (estimé)</label>
              <input
                type="number"
                min="1"
                max="50"
                value={exercisesCount}
                onChange={(e) => setExercisesCount(e.target.value)}
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="pt-6 border-t dark:border-slate-800 border-slate-200/50 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/coach")}
              className="px-6 py-3 text-sm font-medium dark:text-slate-400 text-slate-600 hover:dark:text-white hover:text-slate-900 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-8 py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Enregistrer
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
