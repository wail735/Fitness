import React, { useContext } from "react";
import { Paintbrush, LayoutTemplate, Palette, Monitor, Sun, Moon } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

export default function AppearancePage() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Paintbrush className="w-8 h-8 text-emerald-500" /> Apparence
        </h1>
        <p className="text-sm text-slate-400 mt-2">Personnalisez l'affichage et l'esthétique de votre interface.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#12141a] border border-slate-800/50 p-6 sm:p-8 rounded-3xl shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-[#0b0c10] border border-slate-800/50 text-emerald-400">
              <Monitor size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Thème Global</h3>
              <p className="text-xs text-slate-400">Choisissez votre thème préféré.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => setDarkMode(true)} 
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${darkMode ? 'border-emerald-500 bg-[#1e212b]' : 'border-slate-800/50 bg-[#0b0c10] hover:border-slate-700'}`}
            >
              <div className="w-full h-24 bg-[#050608] rounded-xl mb-4 relative overflow-hidden border border-slate-800">
                <div className="absolute top-2 left-2 w-1/3 h-2 bg-slate-800 rounded"></div>
                <div className="absolute top-6 left-2 w-1/4 h-2 bg-slate-800 rounded"></div>
                <div className="absolute bottom-2 right-2 w-1/2 h-8 bg-slate-900 rounded-lg"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white flex items-center gap-2"><Moon size={14}/> Sombre (Défaut)</span>
                {darkMode && <div className="w-3 h-3 rounded-full bg-emerald-500"></div>}
              </div>
            </div>

            <div 
              onClick={() => setDarkMode(false)} 
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${!darkMode ? 'border-emerald-500 bg-[#1e212b]' : 'border-slate-800/50 bg-[#0b0c10] hover:border-slate-700'}`}
            >
              <div className="w-full h-24 bg-white rounded-xl mb-4 relative overflow-hidden border border-slate-300">
                <div className="absolute top-2 left-2 w-1/3 h-2 bg-slate-300 rounded"></div>
                <div className="absolute top-6 left-2 w-1/4 h-2 bg-slate-300 rounded"></div>
                <div className="absolute bottom-2 right-2 w-1/2 h-8 bg-slate-200 rounded-lg"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white flex items-center gap-2"><Sun size={14}/> Clair</span>
                {!darkMode && <div className="w-3 h-3 rounded-full bg-emerald-500"></div>}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#12141a] border border-slate-800/50 p-6 sm:p-8 rounded-3xl shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-[#0b0c10] border border-slate-800/50 text-blue-400">
              <Palette size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Couleur d'Accentuation</h3>
              <p className="text-xs text-slate-400">Bientôt disponible.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
             <div className="w-12 h-12 rounded-full bg-emerald-500 border-2 border-white ring-4 ring-emerald-500/20 cursor-pointer"></div>
             <div className="w-12 h-12 rounded-full bg-blue-500 opacity-50 cursor-not-allowed"></div>
             <div className="w-12 h-12 rounded-full bg-red-500 opacity-50 cursor-not-allowed"></div>
             <div className="w-12 h-12 rounded-full bg-amber-500 opacity-50 cursor-not-allowed"></div>
          </div>
          <p className="text-xs text-slate-500 mt-6">La personnalisation de la couleur principale sera activée dans une prochaine mise à jour.</p>
        </div>
      </div>
    </div>
  );
}
