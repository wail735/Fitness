import React from "react";
import { HelpCircle, MessageCircle, FileText, Mail, PhoneCall } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <HelpCircle className="w-8 h-8 text-emerald-500" /> Centre de Support
        </h1>
        <p className="text-sm text-slate-400 mt-2">Besoin d'aide ? Nous sommes là pour vous accompagner.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Contact Options */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="bg-[#12141a] border border-slate-800/50 p-6 sm:p-8 rounded-3xl shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6">Contactez-nous</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Sujet</label>
                  <select className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-3 px-4 text-white focus:border-emerald-500 focus:outline-none">
                    <option>Problème technique</option>
                    <option>Question sur l'abonnement</option>
                    <option>Suggestion</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Urgence</label>
                  <select className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-3 px-4 text-white focus:border-emerald-500 focus:outline-none">
                    <option>Normale</option>
                    <option>Haute</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Message</label>
                <textarea 
                  rows="5"
                  placeholder="Décrivez votre problème en détail..."
                  className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-3 px-4 text-white focus:border-emerald-500 focus:outline-none resize-none"
                ></textarea>
              </div>

              <button type="button" className="py-3 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2">
                <MessageCircle size={18} /> Envoyer le message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ & Quick Links */}
        <div className="col-span-1 space-y-4">
          <div className="bg-[#12141a] border border-slate-800/50 p-6 rounded-3xl shadow-xl flex items-start gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <FileText size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Base de Connaissances</h4>
              <p className="text-xs text-slate-400 mb-3">Lisez nos guides et tutoriels d'utilisation.</p>
              <a href="#" className="text-xs font-bold text-emerald-400 hover:text-emerald-300">Parcourir les articles &rarr;</a>
            </div>
          </div>

          <div className="bg-[#12141a] border border-slate-800/50 p-6 rounded-3xl shadow-xl flex items-start gap-4">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
              <Mail size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Email direct</h4>
              <p className="text-xs text-slate-400 mb-3">Réponse sous 24 à 48 heures ouvrées.</p>
              <a href="mailto:support@fitness.com" className="text-xs font-bold text-blue-400 hover:text-blue-300">support@fitness.com</a>
            </div>
          </div>

          <div className="bg-[#12141a] border border-slate-800/50 p-6 rounded-3xl shadow-xl flex items-start gap-4">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
              <PhoneCall size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Hotline</h4>
              <p className="text-xs text-slate-400 mb-3">Disponible Lundi-Vendredi 9h-18h.</p>
              <span className="text-xs font-bold text-purple-400">0800 123 456</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
