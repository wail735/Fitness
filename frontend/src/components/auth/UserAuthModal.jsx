import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { X, Mail, Lock, User, Dumbbell, AlertCircle, Loader2 } from "lucide-react";

import { useSnackbar } from "notistack";

export default function UserAuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, register, authLoading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let result;
    if (isSignUp) {
      if (!name) { enqueueSnackbar("Veuillez entrer votre nom.", { variant: "error" }); return; }
      result = await register(name, email, password);
    } else {
      result = await login(email, password, 'user');
    }

    if (!result.success) {
      enqueueSnackbar(result.error || "Une erreur est survenue.", { variant: "error" });
    } else {
      enqueueSnackbar(isSignUp ? "Compte créé avec succès !" : "Connexion réussie !", { variant: "success" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border dark:border-slate-800 border-slate-200 rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 dark:text-slate-400 text-slate-600 hover:dark:text-white hover:text-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-red-600/20 text-red-500 rounded-xl border border-red-500/30">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold dark:text-white text-slate-900">
              {isSignUp ? "Créer un Compte Membre" : "Connexion Espace Membre"}
            </h3>
            <p className="text-xs dark:text-slate-400 text-slate-600">Accédez à vos réservations et outils fitness</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-medium dark:text-slate-300 text-slate-700 mb-1">Nom complet</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Jean Dupont"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border dark:border-slate-800 border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm dark:text-white text-slate-900 placeholder-slate-600 focus:border-red-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium dark:text-slate-300 text-slate-700 mb-1">Adresse Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="jean.dupont@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border dark:border-slate-800 border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm dark:text-white text-slate-900 placeholder-slate-600 focus:border-red-500 focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium dark:text-slate-300 text-slate-700 mb-1">Mot de passe</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border dark:border-slate-800 border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm dark:text-white text-slate-900 placeholder-slate-600 focus:border-red-500 focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 dark:text-white text-slate-900 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
          >
            {authLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSignUp ? "S'inscrire" : "Se Connecter"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
            className="text-xs dark:text-slate-400 text-slate-600 hover:text-red-400 transition-colors"
          >
            {isSignUp
              ? "Déjà un compte ? Connectez-vous"
              : "Pas encore inscrit ? Créez votre compte"}
          </button>
        </div>
      </div>
    </div>
  );
}
