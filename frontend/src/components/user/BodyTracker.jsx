import React, { useState } from "react";
import { useFitness } from "../../context/FitnessContext";
import { Scale, Plus, Calendar, TrendingDown } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function BodyTracker() {
  const { bodyMetrics, addBodyMetric } = useFitness();
  const [showModal, setShowModal] = useState(false);
  const [weight, setWeight] = useState(75);
  const [fatPct, setFatPct] = useState(16);
  const [waist, setWaist] = useState(80);

  const handleSubmit = (e) => {
    e.preventDefault();
    addBodyMetric({
      date: new Date().toISOString().split("T")[0],
      weightKg: Number(weight),
      bodyFatPct: Number(fatPct),
      waistCm: Number(waist),
    });
    setShowModal(false);
  };

  const latestMetric = bodyMetrics[bodyMetrics.length - 1] || { weightKg: 0, bodyFatPct: 0, waistCm: 0 };
  const firstMetric = bodyMetrics[0] || latestMetric;
  const weightDiff = (latestMetric.weightKg - firstMetric.weightKg).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
              <Scale className="w-8 h-8 text-emerald-500" /> Suivi Corporel & Poids
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Suivez l'évolution de votre masse corporelle et de vos mensurations.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Plus className="w-4 h-4" /> Ajouter une Pesée
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center">
            <span className="text-xs uppercase font-semibold text-slate-400">Poids Actuel</span>
            <div className="text-3xl font-extrabold text-white mt-1">{latestMetric.weightKg} <span className="text-sm font-normal text-slate-400">kg</span></div>
            <div className={`text-xs mt-2 font-semibold ${Number(weightDiff) <= 0 ? "text-emerald-400" : "text-amber-400"}`}>
              {weightDiff > 0 ? `+${weightDiff}` : weightDiff} kg depuis le début
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center">
            <span className="text-xs uppercase font-semibold text-slate-400">Masse Grasse Est.</span>
            <div className="text-3xl font-extrabold text-white mt-1">{latestMetric.bodyFatPct} <span className="text-sm font-normal text-slate-400">%</span></div>
            <div className="text-xs mt-2 text-slate-500">Masse Maigre ~ {((100 - latestMetric.bodyFatPct) * latestMetric.weightKg / 100).toFixed(1)} kg</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center">
            <span className="text-xs uppercase font-semibold text-slate-400">Tour de Taille</span>
            <div className="text-3xl font-extrabold text-white mt-1">{latestMetric.waistCm} <span className="text-sm font-normal text-slate-400">cm</span></div>
            <div className="text-xs mt-2 text-slate-500">Mesure ombilic</div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-sm font-semibold text-slate-400 mb-4 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-emerald-400" /> Courbe du Poids (kg)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bodyMetrics}>
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff" }} />
                <Line type="monotone" dataKey="weightKg" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Nouvelle Pesée</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Poids (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Taux de masse grasse (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={fatPct}
                    onChange={(e) => setFatPct(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Tour de Taille (cm)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
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
