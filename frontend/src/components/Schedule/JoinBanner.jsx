import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, MessageSquare, ArrowRight } from "lucide-react";

function JoinBanner() {
  const location = useLocation();
  const isSchedulePage = location.pathname === "/schedule";

  const handleReserveClick = (e) => {
    if (isSchedulePage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 px-6 sm:px-12 border-t border-b border-red-500/20">
      
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Subtle pattern or gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-slate-950 to-slate-950"></div>
        {/* Glowing Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Text Content */}
        <div className="text-center md:text-left space-y-4 max-w-xl">
          <h3 className="text-white text-3xl sm:text-4xl font-black uppercase tracking-tight leading-tight">
            Réservez votre <span className="bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">séance</span> dès aujourd'hui
          </h3>
          
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Rejoignez nos cours et commencez votre transformation. Nos coachs experts sont prêts à vous accompagner. N'attendez plus !
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
          <Link
            to="/schedule"
            onClick={handleReserveClick}
            className="group flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white uppercase font-bold tracking-wider text-xs px-8 py-4 rounded-xl shadow-lg shadow-red-600/30 transition-all transform hover:-translate-y-1 relative z-20"
          >
            <Calendar className="w-4 h-4" />
            Réserver
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/contacts"
            className="group flex items-center justify-center gap-2 bg-slate-900/50 hover:bg-slate-800 text-white uppercase font-bold tracking-wider text-xs px-8 py-4 rounded-xl border dark:border-slate-700 border-slate-300 hover:border-red-500/50 transition-all backdrop-blur-sm relative z-20"
          >
            <MessageSquare className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
            Nous Contacter
          </Link>
        </div>
        
      </div>
    </section>
  );
}

export default JoinBanner;
