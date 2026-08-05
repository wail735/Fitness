import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("fitness_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("fitness_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("fitness_user");
      localStorage.removeItem("fitness_token");
    }
  }, [user]);

  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("fitness_token", data.token);
      setUser(data.user);
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || "Erreur de connexion.";
      return { success: false, error: message };
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setAuthLoading(true);
    try {
      const { data } = await api.post("/auth/register", { name, email, password });
      localStorage.setItem("fitness_token", data.token);
      setUser(data.user);
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || "Erreur lors de l'inscription.";
      return { success: false, error: message };
    } finally {
      setAuthLoading(false);
    }
  };

  // Direct login (for admin/coach via form, returns token from backend)
  const loginDirect = (userData, token) => {
    localStorage.setItem("fitness_token", token);
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        login,
        register,
        loginDirect,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
