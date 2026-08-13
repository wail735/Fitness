import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "notistack";
import { Dumbbell, ShieldCheck, User, Mail, Lock, UserPlus } from "lucide-react";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("member"); // 'member', 'coach', 'admin'
  const [isLogin, setIsLogin] = useState(true); // For member tab: login vs signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const { login, register, authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  // If user clicked "S'inscrire" from navbar, default to signup
  useEffect(() => {
    if (location.state?.isSignUp) {
      setActiveTab("member");
      setIsLogin(false);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === "member" && !isLogin) {
      // Member Signup
      const res = await register(name, email, password);
      if (res.success) {
        enqueueSnackbar("Compte créé avec succès !", { variant: "success" });
        navigate("/my-dashboard");
      } else {
        enqueueSnackbar(res.error, { variant: "error" });
      }
    } else {
      // Login (Member, Coach, or Admin)
      const res = await login(email, password, activeTab);
      if (res.success) {
        enqueueSnackbar("Connexion réussie !", { variant: "success" });
        // Redirect based on role (which we don't have immediately here, so we let the navbar handle it or redirect)
        // Wait, `login` doesn't return the user role directly in res, but it sets it.
        // I'll just redirect to home and let the navbar show the right button.
        if (activeTab === "admin") navigate("/admin");
        else if (activeTab === "coach") navigate("/coach");
        else navigate("/my-dashboard");
      } else {
        enqueueSnackbar(res.error, { variant: "error" });
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 font-sans">
      <div className="w-full max-w-6xl mx-auto p-4 flex justify-center mt-20 mb-10">
        
        {/* Main Auth Container */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex w-full max-w-5xl border border-slate-100 dark:border-slate-800">
          
          {/* Left Side: Image Banner */}
          <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" 
              alt="Gym Motivation" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
              <div className="flex items-center gap-2 mb-6">
                <Dumbbell className="text-red-500 w-8 h-8" />
                <span className="text-2xl font-black tracking-tighter">ACTIVITAR</span>
              </div>
              <h2 className="text-4xl font-bold mb-4 leading-tight">Repoussez vos <span className="text-red-500">limites.</span></h2>
              <p className="text-slate-300 text-lg">Rejoignez le club de fitness le plus exclusif et transformez votre corps dès aujourd'hui.</p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
            
            <div className="flex justify-between items-center mb-8">
              <button onClick={() => navigate("/")} className="text-sm font-semibold text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1">
                &larr; Retour
              </button>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Bienvenue</h1>
              <p className="text-slate-500 dark:text-slate-400">Veuillez vous identifier pour continuer.</p>
            </div>

            {/* Role Tabs */}
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl mb-8">
              <button 
                onClick={() => setActiveTab("member")} 
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'member' ? 'bg-white dark:bg-slate-700 shadow text-red-600 dark:text-red-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'}`}
              >
                Membre
              </button>
              <button 
                onClick={() => {setActiveTab("coach"); setIsLogin(true); setEmail(""); setPassword("");}} 
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'coach' ? 'bg-white dark:bg-slate-700 shadow text-amber-600 dark:text-amber-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'}`}
              >
                Coach
              </button>
              <button 
                onClick={() => {setActiveTab("admin"); setIsLogin(true); setEmail(""); setPassword("");}} 
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'admin' ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'}`}
              >
                Admin
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.form 
                key={activeTab + (isLogin ? 'login' : 'signup')}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                autoComplete="off"
              >
                
                {/* For Member Signup: Name Field */}
                {activeTab === "member" && !isLogin && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nom complet</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400" />
                      </div>
                      <input 
                        type="text" 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all" 
                        placeholder="Jean Dupont"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Adresse Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off"
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all" 
                      placeholder="vous@exemple.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Mot de passe</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input 
                      type="password" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all" 
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={authLoading}
                  className="mt-4 w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-70 transition-all"
                >
                  {authLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    activeTab === "member" && !isLogin ? "S'inscrire" : "Se Connecter"
                  )}
                </button>

              </motion.form>
            </AnimatePresence>

            {/* Toggle Member Login/Signup */}
            {activeTab === "member" && (
              <div className="mt-8 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {isLogin ? "Pas encore de compte ?" : "Vous avez déjà un compte ?"}
                  <button 
                    onClick={() => setIsLogin(!isLogin)} 
                    className="ml-2 font-bold text-red-600 hover:text-red-500 dark:text-red-400 transition-colors"
                  >
                    {isLogin ? "Créer un compte" : "Se connecter"}
                  </button>
                </p>
              </div>
            )}



          </div>
        </div>
      </div>
    </div>
  );
}
