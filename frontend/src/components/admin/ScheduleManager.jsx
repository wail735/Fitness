import React, { useState } from "react";
import { useFitness } from "../../context/FitnessContext";
import { 
  Calendar, Plus, Trash2, Clock, User, Users, 
  Flame, Dumbbell, Heart, Zap, Activity 
} from "lucide-react";

const getCategoryStyle = (cat) => {
  switch (cat?.toLowerCase()) {
    case "cardio":
    case "intensif":
      return {
        badgeBg: "bg-rose-500/10",
        badgeText: "text-rose-400",
        badgeBorder: "border-rose-500/20",
        barColor: "bg-rose-500",
        icon: Flame
      };
    case "force":
    case "bodybuilding":
      return {
        badgeBg: "bg-amber-500/10",
        badgeText: "text-amber-400",
        badgeBorder: "border-amber-500/20",
        barColor: "bg-amber-500",
        icon: Dumbbell
      };
    case "bien-être":
    case "yoga":
      return {
        badgeBg: "bg-emerald-500/10",
        badgeText: "text-emerald-400",
        badgeBorder: "border-emerald-500/20",
        barColor: "bg-emerald-500",
        icon: Heart
      };
    case "combat":
    case "boxing":
      return {
        badgeBg: "bg-purple-500/10",
        badgeText: "text-purple-400",
        badgeBorder: "border-purple-500/20",
        barColor: "bg-purple-500",
        icon: Zap
      };
    default:
      return {
        badgeBg: "bg-blue-500/10",
        badgeText: "text-blue-400",
        badgeBorder: "border-blue-500/20",
        barColor: "bg-blue-500",
        icon: Activity
      };
  }
};

export default function ScheduleManager() {
  const { classes, addClass, removeClass } = useFitness();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [day, setDay] = useState("Lundi");
  const [time, setTime] = useState("09:00 - 10:00");
  const [trainer, setTrainer] = useState("Alex Rivera");
  const [capacity, setCapacity] = useState(15);
  const [category, setCategory] = useState("Cardio");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    addClass({
      name,
      day,
      time,
      trainer,
      capacity: Number(capacity),
      category,
    });

    setName("");
    setShowModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Calendar className="w-8 h-8 text-red-500" /> Gestion du Planning des Cours
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Ajoutez de nouveaux créneaux ou supprimez des cours existants.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-red-600/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Ajouter un Créneau
        </button>
      </div>

      {/* Class List */}
      <div className="bg-[#12141a] border border-slate-800/50 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {classes.map((c) => {
            const style = getCategoryStyle(c.category);
            const CategoryIcon = style.icon;
            const pct = c.capacity > 0 ? Math.round((c.booked / c.capacity) * 100) : 0;

            return (
              <div 
                key={c.id} 
                className="bg-gradient-to-br from-[#1a1d24] to-[#14161c] border border-slate-800/80 rounded-2xl p-5 relative group flex flex-col justify-between gap-4 hover:border-slate-700 hover:shadow-xl transition-all duration-300"
              >
                <div>
                  {/* Top Bar: Category Pill & Delete */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${style.badgeBg} ${style.badgeText} border ${style.badgeBorder} text-[11px] font-bold rounded-full uppercase tracking-wider`}>
                      <CategoryIcon className="w-3.5 h-3.5" />
                      {c.category}
                    </span>

                    <button
                      onClick={() => removeClass(c.id)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all opacity-80 group-hover:opacity-100"
                      title="Supprimer le cours"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title */}
                  <h4 className="font-bold text-white text-lg mb-4 group-hover:text-red-400 transition-colors">
                    {c.name}
                  </h4>

                  {/* Details Grid */}
                  <div className="space-y-2.5 text-xs text-slate-400 bg-[#0e1014]/60 p-3.5 rounded-xl border border-slate-800/40 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>Jour : <strong className="text-white">{c.day}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>Horaires : <strong className="text-white">{c.time}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>Entraîneur : <strong className="text-white">{c.trainer}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 flex items-center gap-1 font-medium">
                      <Users className="w-3.5 h-3.5 text-slate-500" /> Capacité
                    </span>
                    <span className="font-bold text-white">
                      <span className={pct >= 80 ? "text-red-400" : pct >= 50 ? "text-amber-400" : "text-emerald-400"}>
                        {c.booked}
                      </span> / {c.capacity} inscrits
                    </span>
                  </div>

                  <div className="w-full bg-[#0b0c10] h-2 rounded-full overflow-hidden border border-slate-800/60 p-0.5">
                    <div 
                      className={`h-full ${style.barColor} rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-md bg-[#12141a] border border-slate-800/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white">Nouveau Cours au Planning</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Nom du cours</label>
                <input
                  type="text"
                  placeholder="ex: Body Pump"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0b0c10] border border-slate-800/60 rounded-xl py-2.5 px-3.5 text-sm text-white focus:border-red-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Jour</label>
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full bg-[#0b0c10] border border-slate-800/60 rounded-xl py-2.5 px-3.5 text-sm text-white focus:border-red-500 focus:outline-none transition-colors"
                  >
                    <option value="Lundi">Lundi</option>
                    <option value="Mardi">Mardi</option>
                    <option value="Mercredi">Mercredi</option>
                    <option value="Jeudi">Jeudi</option>
                    <option value="Vendredi">Vendredi</option>
                    <option value="Samedi">Samedi</option>
                    <option value="Dimanche">Dimanche</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Horaires</label>
                  <input
                    type="text"
                    placeholder="18:00 - 19:00"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#0b0c10] border border-slate-800/60 rounded-xl py-2.5 px-3.5 text-sm text-white focus:border-red-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Entraîneur</label>
                  <input
                    type="text"
                    placeholder="Marc Vasseur"
                    value={trainer}
                    onChange={(e) => setTrainer(e.target.value)}
                    className="w-full bg-[#0b0c10] border border-slate-800/60 rounded-xl py-2.5 px-3.5 text-sm text-white focus:border-red-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Capacité maximale</label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full bg-[#0b0c10] border border-slate-800/60 rounded-xl py-2.5 px-3.5 text-sm text-white focus:border-red-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Catégorie</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#0b0c10] border border-slate-800/60 rounded-xl py-2.5 px-3.5 text-sm text-white focus:border-red-500 focus:outline-none transition-colors"
                >
                  <option value="Cardio">Cardio</option>
                  <option value="Force">Force</option>
                  <option value="Bien-être">Bien-être</option>
                  <option value="Combat">Combat</option>
                  <option value="Intensif">Intensif</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/20 transition-all cursor-pointer"
                >
                  Ajouter le cours
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
