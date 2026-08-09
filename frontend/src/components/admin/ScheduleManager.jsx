import React, { useState } from "react";
import { useFitness } from "../../context/FitnessContext";
import { Calendar, Plus, Trash2, Check } from "lucide-react";

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
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-red-600/20 transition-all"
        >
          <Plus className="w-4 h-4" /> Ajouter un Créneau
        </button>
      </div>

      {/* Class List */}
      <div className="bg-[#12141a] border border-slate-800/50 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((c) => (
            <div key={c.id} className="bg-[#1a1d24] border border-slate-800/50 rounded-2xl p-5 relative group space-y-3">
              <button
                onClick={() => removeClass(c.id)}
                className="absolute top-4 right-4 p-2 text-slate-500 hover:text-red-400 hover:bg-[#12141a] rounded-xl transition-colors"
                title="Supprimer le cours"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <span className="inline-block px-2.5 py-0.5 bg-red-500/10 text-red-400 text-[10px] font-bold rounded-full border border-red-500/20 uppercase">
                {c.category}
              </span>

              <h4 className="font-bold text-white text-lg pr-8">{c.name}</h4>

              <div className="space-y-1 text-xs text-slate-400">
                <p>Jour : <strong className="text-white">{c.day}</strong></p>
                <p>Horaires : <strong className="text-white">{c.time}</strong></p>
                <p>Entraîneur : <strong className="text-white">{c.trainer}</strong></p>
                <p>Capacité : <strong className="text-red-400">{c.booked} / {c.capacity} inscrits</strong></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#12141a] border border-slate-800/50 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Nouveau Cours au Planning</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Nom du cours</label>
                <input
                  type="text"
                  placeholder="ex: Body Pump"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-2 px-3 text-sm text-white focus:border-red-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Jour</label>
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-2 px-3 text-sm text-white focus:border-red-500 focus:outline-none"
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
                  <label className="block text-xs font-medium text-slate-400 mb-1">Horaires</label>
                  <input
                    type="text"
                    placeholder="18:00 - 19:00"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-2 px-3 text-sm text-white focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Entraîneur</label>
                  <input
                    type="text"
                    placeholder="Marc Vasseur"
                    value={trainer}
                    onChange={(e) => setTrainer(e.target.value)}
                    className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-2 px-3 text-sm text-white focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Capacité maximale</label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-2 px-3 text-sm text-white focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Catégorie</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-2 px-3 text-sm text-white focus:border-red-500 focus:outline-none"
                >
                  <option value="Cardio">Cardio</option>
                  <option value="Force">Force</option>
                  <option value="Bien-être">Bien-être</option>
                  <option value="Combat">Combat</option>
                  <option value="Intensif">Intensif</option>
                </select>
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
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl"
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
