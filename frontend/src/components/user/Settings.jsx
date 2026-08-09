import React, { useState } from "react";
import { Settings, Shield, Bell, User, Lock, ChevronRight, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const tabs = [
  { id: "profile", label: "Profil", icon: User },
  { id: "security", label: "Sécurité", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Confidentialité", icon: Shield },
];

export default function SettingsPage() {
  const { user, updateProfile, updatePassword } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  // Profile form state
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileStatus, setProfileStatus] = useState(null); // { type: 'success'|'error', message }
  const [profileLoading, setProfileLoading] = useState(false);

  // Password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Preferences state
  const [profilePublic, setProfilePublic] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(false);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileStatus(null);
    const result = await updateProfile(name, email);
    setProfileLoading(false);
    if (result.success) {
      setProfileStatus({ type: "success", message: "Profil mis à jour avec succès !" });
    } else {
      setProfileStatus({ type: "error", message: result.error });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: "error", message: "Les mots de passe ne correspondent pas." });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordStatus({ type: "error", message: "Le mot de passe doit contenir au moins 6 caractères." });
      return;
    }
    setPasswordLoading(true);
    setPasswordStatus(null);
    const result = await updatePassword(currentPassword, newPassword);
    setPasswordLoading(false);
    if (result.success) {
      setPasswordStatus({ type: "success", message: "Mot de passe changé avec succès !" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setPasswordStatus({ type: "error", message: result.error });
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Settings className="w-8 h-8 text-emerald-500" /> Paramètres du Compte
        </h1>
        <p className="text-sm text-slate-400 mt-2">Gérez vos informations personnelles et vos préférences de sécurité.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar Tabs */}
        <div className="col-span-1 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-semibold flex items-center justify-between transition-all ${
                  activeTab === tab.id
                    ? "bg-[#1e212b] text-emerald-400"
                    : "text-slate-400 hover:bg-[#1a1d24] hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3"><Icon size={18} /> {tab.label}</span>
                {activeTab === tab.id && <ChevronRight size={16} />}
              </button>
            );
          })}
        </div>

        {/* Content Panels */}
        <div className="col-span-1 md:col-span-2 space-y-6">

          {/* PROFIL TAB */}
          {activeTab === "profile" && (
            <>
              <div className="bg-[#12141a] border border-slate-800/50 p-6 rounded-3xl shadow-xl">
                <h3 className="text-lg font-bold text-white mb-6">Informations Personnelles</h3>
                <form onSubmit={handleProfileSave} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Nom Complet</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-3 px-4 text-white focus:border-emerald-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Adresse Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-3 px-4 text-white focus:border-emerald-500 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Status Message */}
                  {profileStatus && (
                    <div className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium ${
                      profileStatus.type === "success"
                        ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}>
                      {profileStatus.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                      {profileStatus.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="py-2.5 px-6 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
                  >
                    {profileLoading ? <Loader size={16} className="animate-spin" /> : null}
                    {profileLoading ? "Enregistrement..." : "Enregistrer les modifications"}
                  </button>
                </form>
              </div>
            </>
          )}

          {/* SECURITY TAB */}
          {activeTab === "security" && (
            <div className="bg-[#12141a] border border-slate-800/50 p-6 rounded-3xl shadow-xl">
              <h3 className="text-lg font-bold text-white mb-6">Changer le Mot de Passe</h3>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Mot de passe actuel</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-3 px-4 text-white focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Nouveau mot de passe</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-3 px-4 text-white focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Confirmer le nouveau mot de passe</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-3 px-4 text-white focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>

                {passwordStatus && (
                  <div className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium ${
                    passwordStatus.type === "success"
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                      : "bg-red-500/10 border border-red-500/20 text-red-400"
                  }`}>
                    {passwordStatus.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                    {passwordStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="py-2.5 px-6 bg-red-500 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-lg shadow-red-500/20 transition-all flex items-center gap-2"
                >
                  {passwordLoading ? <Loader size={16} className="animate-spin" /> : null}
                  {passwordLoading ? "Changement..." : "Changer le mot de passe"}
                </button>
              </form>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === "notifications" && (
            <div className="bg-[#12141a] border border-slate-800/50 p-6 rounded-3xl shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Préférences de Notifications</h3>
              {[
                { label: "Résumés hebdomadaires", desc: "Recevez un résumé de vos activités chaque semaine", state: emailNotifs, set: setEmailNotifs },
                { label: "Rappels d'entraînement", desc: "Notifications 30min avant vos séances planifiées", state: true, set: () => {} },
                { label: "Nouvelles classes disponibles", desc: "Soyez alerté quand de nouveaux cours sont ajoutés", state: false, set: () => {} },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#0b0c10] rounded-2xl border border-slate-800/50">
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.label}</h4>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                  <div
                    onClick={() => item.set(!item.state)}
                    className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${item.state ? "bg-emerald-500" : "bg-[#1a1d24] border border-slate-700"}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${item.state ? "right-1 bg-white" : "left-1 bg-slate-500"}`}></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PRIVACY TAB */}
          {activeTab === "privacy" && (
            <div className="bg-[#12141a] border border-slate-800/50 p-6 rounded-3xl shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Confidentialité du Profil</h3>
              <div className="flex items-center justify-between p-4 bg-[#0b0c10] rounded-2xl border border-slate-800/50">
                <div>
                  <h4 className="text-sm font-semibold text-white">Profil Public</h4>
                  <p className="text-xs text-slate-400">Permettre aux autres membres de voir votre profil</p>
                </div>
                <div
                  onClick={() => setProfilePublic(!profilePublic)}
                  className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${profilePublic ? "bg-emerald-500" : "bg-[#1a1d24] border border-slate-700"}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${profilePublic ? "right-1 bg-white" : "left-1 bg-slate-500"}`}></div>
                </div>
              </div>
              <div className="p-4 bg-[#0b0c10] rounded-2xl border border-red-500/20">
                <h4 className="text-sm font-bold text-red-400 mb-1">Zone Dangereuse</h4>
                <p className="text-xs text-slate-400 mb-3">La suppression de votre compte est définitive et irréversible.</p>
                <button className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-bold rounded-xl transition-colors">
                  Supprimer mon compte
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
