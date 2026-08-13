import React from "react";
import { useFitness } from "../../context/FitnessContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { X, Calendar, Clock, User, CheckCircle2, AlertCircle } from "lucide-react";

export default function ClassBookingModal({ selectedClass, onClose }) {
  const { bookClass, userBookings } = useFitness();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!selectedClass) return null;

  const isBooked = userBookings.includes(selectedClass.id);

  const handleConfirm = () => {
    if (!user) {
      onClose();
      navigate("/login");
      return;
    }

    bookClass(selectedClass);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 border dark:border-slate-800 border-slate-200 rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 dark:text-slate-400 text-slate-600 hover:dark:text-white hover:text-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-xs font-semibold uppercase mb-3">
          {selectedClass.category || "Cours Collectif"}
        </span>

        <h3 className="text-2xl font-bold dark:text-white text-slate-900 mb-2">{selectedClass.name}</h3>

        <div className="space-y-2 text-xs dark:text-slate-300 text-slate-700 mb-6 bg-slate-950/60 p-4 rounded-xl border dark:border-slate-800 border-slate-200">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-red-500" /> Jour : <strong>{selectedClass.day}</strong>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-red-500" /> Horaires : <strong>{selectedClass.time}</strong>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-red-500" /> Entraîneur : <strong>{selectedClass.trainer}</strong>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Places disponibles :{" "}
            <strong>{selectedClass.capacity - selectedClass.booked} / {selectedClass.capacity}</strong>
          </div>
        </div>

        {isBooked ? (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-xl text-center flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Vous êtes déjà inscrit à ce cours.
          </div>
        ) : (
          <button
            onClick={handleConfirm}
            className="w-full py-3 bg-red-600 hover:bg-red-700 dark:text-white text-slate-900 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-red-600/20"
          >
            {user ? "Confirmer la Réservation" : "Se Connecter pour Réserver"}
          </button>
        )}
      </div>
    </div>
  );
}
