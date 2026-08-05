import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ShieldCheck, Lock, Mail, UserCheck, AlertCircle, Loader2 } from "lucide-react";
import api from "../../api/axiosConfig";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginDirect } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", { email, password });
      
      // Validate the role
      if (role === "admin" && data.user.role !== "admin") {
        setError("Accès refusé. Vous n'avez pas les droits Administrateur.");
        setLoading(false);
        return;
      }
      if (role === "coach" && !["coach", "admin"].includes(data.user.role)) {
        setError("Accès refusé. Vous n'avez pas les droits Coach.");
        setLoading(false);
        return;
      }

      loginDirect(data.user, data.token);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/coach");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Email ou mot de passe invalide.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-md relative z-10">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-red-600/20 text-red-500 rounded-xl border border-red-500/30">
            <ShieldCheck className="w-10 h-10" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-1 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Espace Professionnel
        </h2>
        <p className="text-sm text-slate-400 text-center mb-6">
          Connectez-vous pour accéder au portail {role === "admin" ? "Administration" : "Entraîneur"}
        </p>

        <div className="flex bg-slate-800/80 rounded-xl p-1 mb-6 border border-slate-700/50">
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              role === "admin" ? "bg-red-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Administrateur
          </button>
          <button
            type="button"
            onClick={() => setRole("coach")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              role === "coach" ? "bg-amber-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" /> Coach / Entraîneur
          </button>
        </div>

        {/* Demo credentials hint */}
        <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-300 space-y-0.5">
          <p className="font-semibold text-blue-400">Comptes de démonstration :</p>
          <p>Admin : <strong>admin@fitness-club.com</strong> / admin1234</p>
          <p>Coach : <strong>coach@fitness-club.com</strong> / coach1234</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Adresse Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === "admin" ? "admin@fitness-club.com" : "coach@fitness-club.com"}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Mot de passe</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide uppercase transition-all shadow-lg mt-2 flex items-center justify-center gap-2 disabled:opacity-50 ${
              role === "admin"
                ? "bg-red-600 hover:bg-red-700 text-white shadow-red-600/20"
                : "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20"
            }`}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Se Connecter
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            &larr; Retour au site public
          </a>
        </div>
      </div>
    </div>
  );
}
