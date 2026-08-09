import React, { useState } from "react";
import { Settings, Shield, Bell, User, Key, Lock, ChevronRight } from "lucide-react";

export default function SettingsPage() {
  const [profilePublic, setProfilePublic] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(false);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Settings className="w-8 h-8 text-emerald-500" /> Paramètres du Compte
        </h1>
        <p className="text-sm text-slate-400 mt-2">Gérez vos informations personnelles et vos préférences de sécurité.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 space-y-2">
          <button className="w-full text-left px-4 py-3 rounded-xl bg-[#1e212b] text-emerald-400 font-semibold flex items-center justify-between">
            <span className="flex items-center gap-3"><User size={18} /> Profil</span>
            <ChevronRight size={16} />
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-slate-400 hover:bg-[#1a1d24] hover:text-white font-semibold flex items-center justify-between transition-colors">
            <span className="flex items-center gap-3"><Lock size={18} /> Sécurité</span>
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-slate-400 hover:bg-[#1a1d24] hover:text-white font-semibold flex items-center justify-between transition-colors">
            <span className="flex items-center gap-3"><Bell size={18} /> Notifications</span>
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-slate-400 hover:bg-[#1a1d24] hover:text-white font-semibold flex items-center justify-between transition-colors">
            <span className="flex items-center gap-3"><Shield size={18} /> Confidentialité</span>
          </button>
        </div>

        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="bg-[#12141a] border border-slate-800/50 p-6 rounded-3xl shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6">Informations Personnelles</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Nom Complet</label>
                <input type="text" defaultValue="Wail Chennouf" className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-3 px-4 text-white focus:border-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Adresse Email</label>
                <input type="email" defaultValue="wail@example.com" className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-3 px-4 text-white focus:border-emerald-500 focus:outline-none" />
              </div>
              <button className="py-2.5 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all mt-4">
                Enregistrer les modifications
              </button>
            </div>
          </div>

          <div className="bg-[#12141a] border border-slate-800/50 p-6 rounded-3xl shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Préférences Globales</h3>
            <div className="flex items-center justify-between p-4 bg-[#0b0c10] rounded-2xl border border-slate-800/50">
               <div>
                 <h4 className="text-sm font-semibold text-white">Profil Public</h4>
                 <p className="text-xs text-slate-400">Permettre aux autres membres de voir votre profil</p>
               </div>
               <div onClick={() => setProfilePublic(!profilePublic)} className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${profilePublic ? 'bg-emerald-500' : 'bg-[#1a1d24] border border-slate-700'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${profilePublic ? 'right-1 bg-white' : 'left-1 bg-slate-500'}`}></div>
               </div>
             </div>

             <div className="flex items-center justify-between p-4 bg-[#0b0c10] rounded-2xl border border-slate-800/50">
               <div>
                 <h4 className="text-sm font-semibold text-white">Résumés par Email</h4>
                 <p className="text-xs text-slate-400">Recevoir un résumé hebdomadaire de vos activités</p>
               </div>
               <div onClick={() => setEmailNotifs(!emailNotifs)} className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${emailNotifs ? 'bg-emerald-500' : 'bg-[#1a1d24] border border-slate-700'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${emailNotifs ? 'right-1 bg-white' : 'left-1 bg-slate-500'}`}></div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
