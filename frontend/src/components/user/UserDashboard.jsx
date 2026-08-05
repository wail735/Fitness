import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useFitness } from "../../context/FitnessContext";
import { Link, useNavigate } from "react-router-dom";
import { User, Calendar, Dumbbell, Scale, Utensils, Calculator, Trash2, ArrowRight, LogOut, Activity } from "lucide-react";

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const { classes, userBookings, cancelBooking, workouts, bodyMetrics, nutritionLogs } = useFitness();
  const navigate = useNavigate();

  const bookedClassList = classes.filter((c) => userBookings.includes(c.id || c._id));
  const latestWorkout = workouts[0];
  const latestWeight = bodyMetrics[bodyMetrics.length - 1];
  const totalCalsToday = nutritionLogs.reduce((acc, log) => acc + log.calories, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-32 pb-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Welcome Header (Glassmorphism) */}
        <div className="relative overflow-hidden bg-white dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 sm:p-10 shadow-xl dark:shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8 transition-colors duration-300">
          
          {/* Background Glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-600/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="space-y-3 relative z-10">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
              Ravi de vous revoir, <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-red-600 via-amber-500 to-red-600 dark:from-red-500 dark:via-amber-400 dark:to-red-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                {user?.name || "Sportif"}
              </span> !
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base max-w-lg mt-2 font-medium transition-colors duration-300">
              Suivez votre progression, vos prochains cours et dépassez vos limites. C'est votre espace dédié à la performance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 relative z-10 w-full md:w-auto">
            <Link
              to="/schedule"
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-lg shadow-red-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" /> Réserver
            </Link>
            <Link
              to="/calculators"
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-900 dark:text-white text-sm font-bold px-6 py-3 rounded-2xl border border-slate-200 dark:border-white/10 transition-all transform hover:-translate-y-0.5 backdrop-blur-md"
            >
              <Calculator className="w-4 h-4 text-amber-500 dark:text-amber-400" /> Outils
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800/50 hover:bg-red-100 dark:hover:bg-red-500/20 hover:text-red-600 dark:hover:text-red-400 text-slate-600 dark:text-slate-300 text-sm font-bold px-6 py-3 rounded-2xl border border-slate-200 dark:border-white/5 transition-all"
            >
              <LogOut className="w-4 h-4" /> Déconnexion
            </button>
          </div>
        </div>

        {/* Quick Metrics Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Workout Card */}
          <Link to="/my-workouts" className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-red-500/50 dark:hover:border-red-500/50 transition-all duration-300 rounded-[2rem] p-6 group backdrop-blur-lg relative overflow-hidden shadow-sm dark:shadow-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 dark:bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-200 dark:group-hover:bg-red-500/20 transition-all"></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="text-xs font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase">Dernière Séance</span>
              <div className="p-2 bg-slate-50 dark:bg-white/10 rounded-xl">
                <Dumbbell className="w-5 h-5 text-red-500 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white truncate relative z-10">{latestWorkout ? latestWorkout.name : "Aucune séance"}</div>
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-2 relative z-10">
              {latestWorkout ? (
                <>
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400"><Activity className="w-3.5 h-3.5"/> {latestWorkout.caloriesBurned} kcal</span>
                  <span className="text-slate-400 dark:text-slate-600">•</span>
                  <span>{latestWorkout.durationMinutes} min</span>
                </>
              ) : "Enregistrer une séance"} &rarr;
            </div>
          </Link>

          {/* Body Metrics Card */}
          <Link to="/my-body" className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 rounded-[2rem] p-6 group backdrop-blur-lg relative overflow-hidden shadow-sm dark:shadow-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 dark:bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-200 dark:group-hover:bg-emerald-500/20 transition-all"></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="text-xs font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase">Dernier Poids</span>
              <div className="p-2 bg-slate-50 dark:bg-white/10 rounded-xl">
                <Scale className="w-5 h-5 text-emerald-500 dark:text-emerald-400 group-hover:-rotate-12 transition-transform" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white relative z-10">{latestWeight ? `${latestWeight.weightKg} kg` : "--"}</div>
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2 relative z-10">
              {latestWeight ? `Masse grasse: ${latestWeight.bodyFatPct}%` : "Mettre à jour vos mesures"} &rarr;
            </div>
          </Link>

          {/* Nutrition Card */}
          <Link to="/my-nutrition" className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all duration-300 rounded-[2rem] p-6 group backdrop-blur-lg relative overflow-hidden shadow-sm dark:shadow-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 dark:bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-200 dark:group-hover:bg-amber-500/20 transition-all"></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="text-xs font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase">Nutrition du Jour</span>
              <div className="p-2 bg-slate-50 dark:bg-white/10 rounded-xl">
                <Utensils className="w-5 h-5 text-amber-500 dark:text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white relative z-10">{totalCalsToday} <span className="text-lg text-slate-500">kcal</span></div>
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2 relative z-10">Voir le journal repas &rarr;</div>
          </Link>
        </div>

        {/* Booked Classes Section */}
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 backdrop-blur-2xl relative overflow-hidden shadow-xl dark:shadow-none transition-colors duration-300">
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600"></div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3 tracking-tight transition-colors duration-300">
              <div className="p-2.5 bg-red-100 dark:bg-red-500/20 rounded-xl border border-red-200 dark:border-red-500/30">
                <Calendar className="w-5 h-5 text-red-600 dark:text-red-500" /> 
              </div>
              Vos Cours Programmés
              <span className="bg-slate-100 dark:bg-white/10 px-3 py-1 rounded-full text-sm font-bold ml-2 text-slate-800 dark:text-white">{bookedClassList.length}</span>
            </h2>
            <Link to="/schedule" className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl text-xs text-red-600 dark:text-red-400 font-bold tracking-widest uppercase transition-all flex items-center gap-2 border border-slate-200 dark:border-white/5">
              Voir le planning <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {bookedClassList.length === 0 ? (
            <div className="text-center py-12 px-4 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 rounded-3xl backdrop-blur-sm transition-colors duration-300">
              <Calendar className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Aucun cours réservé</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 max-w-md mx-auto">Vous n'avez pas encore réservé de cours cette semaine. Explorez notre planning et réservez votre place !</p>
              <Link to="/schedule" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-red-600/20">
                Consulter le Planning
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {bookedClassList.map((c) => (
                <div key={c.id || c._id} className="group bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 rounded-2xl p-5 flex justify-between items-center transition-all hover:bg-slate-100 dark:hover:bg-black/60 shadow-sm dark:shadow-none">
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex flex-col items-center justify-center w-14 h-14 bg-red-100 dark:bg-red-500/10 rounded-xl border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 font-black">
                      <span className="text-xs uppercase">{c.day.substring(0,3)}</span>
                    </div>
                    <div>
                      <span className="sm:hidden inline-block text-[10px] uppercase font-bold text-red-600 dark:text-red-400 tracking-wider mb-1 bg-red-100 dark:bg-red-500/10 px-2 py-0.5 rounded-md">{c.day}</span>
                      <h4 className="font-black text-slate-900 dark:text-white text-lg tracking-tight mb-1">{c.name}</h4>
                      <div className="flex items-center gap-3 text-xs font-medium text-slate-600 dark:text-slate-400">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {c.time}</span>
                        <span className="flex items-center gap-1"><User className="w-3.5 h-3.5"/> {c.trainer}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => cancelBooking(c.id || c._id)}
                    className="p-3 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-200 dark:hover:border-red-500/20"
                    title="Annuler la réservation"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// Simple Clock icon component since we use it but didn't import it in the original
function Clock(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
