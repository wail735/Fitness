import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { useSnackbar } from 'notistack';

export default function CoachCards() {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoach, setSelectedCoach] = useState(null);
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const res = await api.get('/users/coaches');
        setCoaches(res.data);
      } catch (err) {
        console.error('Error fetching coaches:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoaches();
  }, []);

  const handleBook = (coach) => {
    if (!user) {
      enqueueSnackbar("Vous devez être connecté pour réserver.", { variant: "info" });
      return;
    }
    if (user.role !== 'user') {
      enqueueSnackbar("Seuls les membres peuvent réserver une session.", { variant: "warning" });
      return;
    }
    setSelectedCoach(coach);
    setShowModal(true);
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    if (!date || !time) {
      enqueueSnackbar("Veuillez remplir la date et l'heure.", { variant: "warning" });
      return;
    }
    
    setIsSubmitting(true);
    try {
      await api.post(
        `/users/coaches/${selectedCoach._id}/book`,
        { date, time, userNotes: notes }
      );
      enqueueSnackbar("Demande envoyée avec succès !", { variant: "success" });
      setShowModal(false);
      setDate('');
      setTime('');
      setNotes('');
    } catch (err) {
      enqueueSnackbar(err.response?.data?.error || "Erreur lors de la réservation.", { variant: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-20 dark:text-slate-400 text-slate-600">Chargement des coachs...</div>;
  if (coaches.length === 0) return null;

  return (
    <section className="py-24 bg-[#0a0a0a] border-t dark:border-slate-800 border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">Nos <span className="text-emerald-400">Coachs</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Rencontrez nos experts dédiés à votre progression. Réservez une séance privée avec l'un de nos coachs pour un accompagnement sur-mesure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coaches.map(coach => (
            <div key={coach._id} className="dark:bg-[#12141a] bg-white border dark:border-slate-800 border-slate-200/60 rounded-3xl overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
              <div className="h-48 bg-slate-800 flex items-center justify-center overflow-hidden">
                {coach.avatar ? (
                  <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <User size={64} className="text-slate-600" />
                )}
              </div>
              <div className="p-6 relative">
                <div className="absolute -top-6 right-6 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {coach.specialty || "Fitness"}
                </div>
                <h3 className="text-2xl font-bold dark:text-white text-slate-900 mb-2">{coach.name}</h3>
                <p className="dark:text-slate-400 text-slate-600 text-sm mb-6 line-clamp-2">{coach.bio || "Coach professionnel dédié à votre succès et à votre transformation physique."}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm dark:text-slate-300 text-slate-700">
                    <Calendar size={16} className="text-emerald-400" />
                    <span>{coach.workingDays?.join(', ') || "Lundi - Vendredi"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm dark:text-slate-300 text-slate-700">
                    <Clock size={16} className="text-emerald-400" />
                    <span>{coach.workingHours?.start || "09:00"} - {coach.workingHours?.end || "18:00"}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleBook(coach)}
                  className="w-full dark:bg-[#1a1d24] bg-slate-100 hover:bg-emerald-500 hover:text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors font-semibold"
                >
                  Demander un suivi <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && selectedCoach && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="dark:bg-[#12141a] bg-white border dark:border-slate-800 border-slate-200 rounded-3xl p-6 w-full max-w-md relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 dark:text-slate-400 text-slate-600 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold dark:text-white text-slate-900 mb-2">Réserver avec {selectedCoach.name}</h3>
            <p className="text-sm dark:text-slate-400 text-slate-600 mb-6">Demandez une séance privée. Le coach vous assignera un plan d'entraînement personnalisé.</p>

            <form onSubmit={submitBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-medium dark:text-slate-400 text-slate-600 uppercase tracking-wider mb-2">Date</label>
                <input 
                  type="date" 
                  required
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full dark:bg-[#1a1d24] bg-slate-100 border dark:border-slate-700 border-slate-300 rounded-xl px-4 py-3 dark:text-white text-slate-900 focus:border-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium dark:text-slate-400 text-slate-600 uppercase tracking-wider mb-2">Heure ({selectedCoach.workingHours?.start} - {selectedCoach.workingHours?.end})</label>
                <input 
                  type="time" 
                  required
                  value={time}
                  min={selectedCoach.workingHours?.start}
                  max={selectedCoach.workingHours?.end}
                  onChange={e => setTime(e.target.value)}
                  className="w-full dark:bg-[#1a1d24] bg-slate-100 border dark:border-slate-700 border-slate-300 rounded-xl px-4 py-3 dark:text-white text-slate-900 focus:border-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium dark:text-slate-400 text-slate-600 uppercase tracking-wider mb-2">Vos objectifs (Optionnel)</label>
                <textarea 
                  rows="3"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Décrivez ce que vous souhaitez travailler..."
                  className="w-full dark:bg-[#1a1d24] bg-slate-100 border dark:border-slate-700 border-slate-300 rounded-xl px-4 py-3 dark:text-white text-slate-900 focus:border-emerald-500 outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 dark:bg-[#1a1d24] bg-slate-100 hover:bg-slate-800 dark:text-white text-slate-900 rounded-xl font-medium transition-colors"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl font-bold transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Envoi..." : "Confirmer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
