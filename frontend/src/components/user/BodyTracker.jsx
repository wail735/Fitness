import React, { useState } from "react";
import { useFitness } from "../../context/FitnessContext";
import { Scale, Plus, X, TrendingDown, Activity, Ruler } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts";

const inputClass = "w-full dark:bg-[#0b0c10] bg-slate-50 border dark:border-slate-800 border-slate-200 rounded-xl py-2.5 px-3 text-sm dark:text-white text-slate-900 focus:border-emerald-500 focus:outline-none placeholder:text-slate-600 transition-colors";
const labelClass = "block text-xs font-medium dark:text-slate-400 text-slate-600 mb-1.5";

export default function BodyTracker() {
  const { bodyMetrics, addBodyMetric } = useFitness();
  const [showModal, setShowModal] = useState(false);
  const [weight, setWeight] = useState(75);
  const [fatPct, setFatPct] = useState(16);
  const [waist, setWaist] = useState(80);
  const [heartRate, setHeartRate] = useState(72);
  const [hydrationPct, setHydrationPct] = useState(60);
  const [bloodCellsUl, setBloodCellsUl] = useState(1100);

  const handleSubmit = (e) => {
    e.preventDefault();
    addBodyMetric({
      date: new Date().toISOString().split("T")[0],
      weightKg:     Number(weight),
      bodyFatPct:   Number(fatPct),
      waistCm:      Number(waist),
      heartRate:    Number(heartRate),
      hydrationPct: Number(hydrationPct),
      bloodCellsUl: Number(bloodCellsUl),
    });
    setShowModal(false);
  };

  const latestMetric = bodyMetrics[bodyMetrics.length - 1] || { weightKg: 0, bodyFatPct: 0, waistCm: 0 };
  const firstMetric = bodyMetrics[0] || latestMetric;
  const weightDiff = (latestMetric.weightKg - firstMetric.weightKg).toFixed(1);
  const leanMass = ((100 - latestMetric.bodyFatPct) * latestMetric.weightKg / 100).toFixed(1);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Suivi Corporel</p>
          <h1 className="text-2xl font-bold dark:text-white text-slate-900 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Scale className="w-5 h-5 text-emerald-400" />
            </div>
            Goals
          </h1>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
        >
          <Plus className="w-4 h-4" /> Ajouter une Pesée
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="dark:bg-[#12141a] bg-white border dark:border-slate-800 border-slate-200/50 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Scale size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Poids Actuel</p>
            <p className="text-2xl font-bold dark:text-white text-slate-900 leading-none">
              {latestMetric.weightKg}<span className="text-xs text-slate-500 font-normal ml-1">kg</span>
            </p>
            <p className={`text-[11px] mt-1 font-semibold ${Number(weightDiff) <= 0 ? "text-emerald-400" : "text-amber-400"}`}>
              {Number(weightDiff) > 0 ? `+${weightDiff}` : weightDiff} kg depuis le début
            </p>
          </div>
        </div>

        <div className="dark:bg-[#12141a] bg-white border dark:border-slate-800 border-slate-200/50 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Activity size={20} className="text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Masse Grasse</p>
            <p className="text-2xl font-bold dark:text-white text-slate-900 leading-none">
              {latestMetric.bodyFatPct}<span className="text-xs text-slate-500 font-normal ml-1">%</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Masse maigre ~ {leanMass} kg</p>
          </div>
        </div>

        <div className="dark:bg-[#12141a] bg-white border dark:border-slate-800 border-slate-200/50 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <Ruler size={20} className="text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Tour de Taille</p>
            <p className="text-2xl font-bold dark:text-white text-slate-900 leading-none">
              {latestMetric.waistCm}<span className="text-xs text-slate-500 font-normal ml-1">cm</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Mesure ombilic</p>
          </div>
        </div>
      </div>

      {/* Extra health stats */}
      {latestMetric && (latestMetric.heartRate > 0 || latestMetric.hydrationPct > 0 || latestMetric.bloodCellsUl > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {latestMetric.heartRate > 0 && (
            <div className="dark:bg-[#12141a] bg-white border border-red-500/20 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <Activity size={20} className="text-red-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Fréquence Cardiaque</p>
                <p className="text-2xl font-bold dark:text-white text-slate-900 leading-none">{latestMetric.heartRate}<span className="text-xs text-slate-500 font-normal ml-1">bpm</span></p>
              </div>
            </div>
          )}
          {latestMetric.hydrationPct > 0 && (
            <div className="dark:bg-[#12141a] bg-white border border-cyan-500/20 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Ruler size={20} className="text-cyan-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Hydratation</p>
                <p className="text-2xl font-bold dark:text-white text-slate-900 leading-none">{latestMetric.hydrationPct}<span className="text-xs text-slate-500 font-normal ml-1">%</span></p>
              </div>
            </div>
          )}
          {latestMetric.bloodCellsUl > 0 && (
            <div className="dark:bg-[#12141a] bg-white border border-purple-500/20 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Scale size={20} className="text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Cellules Sanguines</p>
                <p className="text-2xl font-bold dark:text-white text-slate-900 leading-none">{latestMetric.bloodCellsUl}<span className="text-xs text-slate-500 font-normal ml-1">µl</span></p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Weight Chart */}
      <div className="dark:bg-[#12141a] bg-white border dark:border-slate-800 border-slate-200/50 rounded-3xl p-6">
        <h3 className="text-sm font-semibold dark:text-slate-400 text-slate-600 mb-6 flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-emerald-400" /> Courbe de Poids (kg)
        </h3>
        <div className="h-52 w-full">
          {bodyMetrics.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-600 text-sm">Aucune pesée enregistrée</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bodyMetrics}>
                <defs>
                  <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#334155" fontSize={11} tick={{ fill: "#475569" }} />
                <YAxis domain={["dataMin - 1", "dataMax + 1"]} stroke="#334155" fontSize={11} tick={{ fill: "#475569" }} />
                <Tooltip contentStyle={{ backgroundColor: "#12141a", borderColor: "#1e2130", borderRadius: "12px", color: "#fff", fontSize: "12px" }} />
                <Area type="monotone" dataKey="weightKg" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#weightGrad)" dot={{ r: 4, fill: "#10b981", strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* History Table */}
      {bodyMetrics.length > 0 && (
        <div className="dark:bg-[#12141a] bg-white border dark:border-slate-800 border-slate-200/50 rounded-3xl p-6">
          <h3 className="text-base font-semibold dark:text-slate-200 text-slate-800 mb-5">Historique des Pesées</h3>
          <div className="space-y-2">
            {[...bodyMetrics].reverse().slice(0, 8).map((m, i) => (
              <div key={m._id || i} className="flex items-center justify-between p-3 rounded-xl hover:dark:bg-[#0f1115] hover:bg-slate-50 transition-colors">
                <span className="text-xs text-slate-500">{m.date}</span>
                <span className="text-sm font-semibold dark:text-white text-slate-900">{m.weightKg} kg</span>
                <span className="text-xs text-blue-400">{m.bodyFatPct}% MG</span>
                <span className="text-xs text-purple-400">{m.waistCm} cm</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md dark:bg-[#12141a] bg-white border dark:border-slate-800 border-slate-200 rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold dark:text-white text-slate-900">Nouvelle Pesée</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center dark:text-slate-400 text-slate-600 transition-colors"><X size={14} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Poids (kg)</label>
                <input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} className={inputClass} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Masse grasse (%)</label>
                  <input type="number" step="0.1" value={fatPct} onChange={(e) => setFatPct(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Tour de Taille (cm)</label>
                  <input type="number" step="0.5" value={waist} onChange={(e) => setWaist(e.target.value)} className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={labelClass}>Rythme Cardiaque (bpm)</label>
                  <input type="number" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} className={inputClass} placeholder="72" />
                </div>
                <div>
                  <label className={labelClass}>Hydratation (%)</label>
                  <input type="number" value={hydrationPct} onChange={(e) => setHydrationPct(e.target.value)} className={inputClass} placeholder="60" />
                </div>
                <div>
                  <label className={labelClass}>Cellules Sanguines (µl)</label>
                  <input type="number" value={bloodCellsUl} onChange={(e) => setBloodCellsUl(e.target.value)} className={inputClass} placeholder="1100" />
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
