import React, { useState, useMemo, useRef, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import { useAuth } from "../../context/AuthContext";
import { useFitness } from "../../context/FitnessContext";
import {
  LayoutDashboard,
  BarChart2,
  Target,
  CalendarDays,
  Settings,
  Paintbrush,
  HelpCircle,
  Search,
  MessageSquare,
  Bell,
  Sun,
  Moon,
  Plus,
  LogOut,
  Dumbbell,
  Utensils,
  Activity,
  BookOpen
} from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

export default function PortalLayout() {
  const { user, logout } = useAuth();
  const { classes, workouts, nutritionLogs, routines } = useFitness();
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = React.useContext(ThemeContext);
  const searchInputRef = useRef(null);

  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Notification state
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch notifications
  useEffect(() => {
    if (!user) return;
    const fetchNotifications = async () => {
      try {
        const { data } = await api.get('/notifications');
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };
    fetchNotifications();
    
    // Optional: set interval to poll notifications every 60s
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [user]);

  const markAllAsRead = async () => {
    try {
      await api.patch('/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const markOneAsRead = async (id, isRead) => {
    if (isRead) return;
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error(err);
    }
  };

  // Close search on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        setShowSearch(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Open search with Ctrl+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);



  const isActive = (path) => location.pathname === path;

  // ── Smart search across real data ───────────────────────────────────────────
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q || q.length < 2) return [];

    const results = [];
    const isCoach = user?.role === "coach";
    const isAdmin = user?.role === "admin";

    if (!isCoach && !isAdmin) {
      // Search workouts (User only)
      workouts.filter(w => w.name?.toLowerCase().includes(q)).forEach(w => {
        results.push({
          type: "Entraînement",
          icon: Dumbbell,
          color: "text-emerald-400",
          bg: "bg-emerald-500/10",
          title: w.name,
          meta: `${w.durationMinutes || 0} min · ${w.caloriesBurned || 0} kcal`,
          action: () => { navigate("/my-workouts"); setShowSearch(false); setSearchQuery(""); },
        });
      });

      // Search nutrition logs (User only)
      nutritionLogs.filter(n => n.food?.toLowerCase().includes(q) || n.meal?.toLowerCase().includes(q)).forEach(n => {
        results.push({
          type: "Nutrition",
          icon: Utensils,
          color: "text-amber-400",
          bg: "bg-amber-500/10",
          title: n.food,
          meta: `${n.meal || ""} · ${n.calories || 0} kcal`,
          action: () => { navigate("/my-nutrition"); setShowSearch(false); setSearchQuery(""); },
        });
      });
    }

    if ((isCoach || isAdmin) && routines) {
      // Search routines (Coach only)
      routines.filter(r => r.title?.toLowerCase().includes(q)).forEach(r => {
        results.push({
          type: "Programme",
          icon: Dumbbell,
          color: "text-purple-400",
          bg: "bg-purple-500/10",
          title: r.title,
          meta: `${r.target || ""} · ${r.exercisesCount || 0} exercices`,
          action: () => { navigate("/coach"); setShowSearch(false); setSearchQuery(""); },
        });
      });
    }

    // Search classes (Both)
    classes.filter(c => c.name?.toLowerCase().includes(q) || c.category?.toLowerCase().includes(q) || c.trainer?.toLowerCase().includes(q)).forEach(c => {
      results.push({
        type: "Cours",
        icon: CalendarDays,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        title: c.name,
        meta: `${c.day || ""} · ${c.time || ""} · ${c.trainer || ""}`,
        action: () => { navigate(isAdmin ? "/admin" : isCoach ? "/coach" : "/my-dashboard"); setShowSearch(false); setSearchQuery(""); },
      });
    });

    // Navigation shortcuts
    let pages = [];
    if (isAdmin) {
      pages = [
        { label: "Admin Dashboard", path: "/admin" },
        { label: "Schedule Manager", path: "/admin/schedule" }
      ];
    } else if (isCoach) {
      pages = [
        { label: "Dashboard", path: "/coach" },
        { label: "Program Builder", path: "/coach/builder" }
      ];
    } else {
      pages = [
        { label: "Dashboard", path: "/my-dashboard" },
        { label: "Analytics", path: "/my-workouts" },
        { label: "Goals / Body", path: "/my-body" },
        { label: "Timelines / Nutrition", path: "/my-nutrition" },
        { label: "Paramètres", path: "/my-settings" },
      ];
    }

    pages.filter(p => p.label.toLowerCase().includes(q)).forEach(p => {
      results.push({
        type: "Navigation",
        icon: LayoutDashboard,
        color: "text-indigo-400",
        bg: "bg-indigo-500/10",
        title: p.label,
        meta: p.path,
        action: () => { navigate(p.path); setShowSearch(false); setSearchQuery(""); },
      });
    });

    return results.slice(0, 8); // max 8 results
  }, [searchQuery, workouts, classes, nutritionLogs, routines, navigate, user]);

  return (
    <div className="flex h-screen dark:bg-[#0b0c10] bg-slate-50 dark:text-slate-300 text-slate-700 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 dark:bg-[#12141a] bg-white border-r dark:border-slate-800 border-slate-200 flex flex-col transition-all duration-300">
        {/* User Profile */}
        <div className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
            {/* Fallback avatar */}
            <span className="text-lg font-bold dark:text-slate-400 text-slate-600">
              {user?.name?.charAt(0) || "U"}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-sm dark:text-slate-100 text-slate-900">{user?.name || "Member"}</h3>
            <p className="text-xs text-slate-500">@{user?.name?.toLowerCase().replace(/\s/g, '') || "user"} <span className="bg-slate-800 text-[10px] px-1.5 py-0.5 rounded ml-1 dark:text-slate-300 text-slate-700">Pro</span></p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto custom-scrollbar">
          
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Main Menu</h4>
            <ul className="space-y-1">
              {user?.role === "admin" ? (
                <>
                  <li>
                    <Link to="/admin" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive('/admin') ? 'bg-red-500/10 text-red-500 shadow-sm' : 'dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-800 hover:dark:bg-[#1a1d24] hover:bg-slate-100'}`}>
                      <LayoutDashboard size={18} />
                      <span className="text-sm font-medium">Vue d'Ensemble</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/schedule" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive('/admin/schedule') ? 'bg-red-500/10 text-red-500 shadow-sm' : 'dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-800 hover:dark:bg-[#1a1d24] hover:bg-slate-100'}`}>
                      <CalendarDays size={18} />
                      <span className="text-sm font-medium">Gestion Planning</span>
                    </Link>
                  </li>
                </>
              ) : user?.role === "coach" ? (
                <>
                  <li>
                    <Link to="/coach" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive('/coach') ? 'dark:bg-[#1e212b] bg-slate-100 text-emerald-400 shadow-sm shadow-emerald-500/10' : 'dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-800 hover:dark:bg-[#1a1d24] hover:bg-slate-100'}`}>
                      <LayoutDashboard size={18} />
                      <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/coach/builder" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive('/coach/builder') ? 'dark:bg-[#1e212b] bg-slate-100 text-emerald-400 shadow-sm shadow-emerald-500/10' : 'dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-800 hover:dark:bg-[#1a1d24] hover:bg-slate-100'}`}>
                      <Dumbbell size={18} />
                      <span className="text-sm font-medium">Program Builder</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/my-dashboard" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive('/my-dashboard') ? 'dark:bg-[#1e212b] bg-slate-100 text-emerald-400 shadow-sm shadow-emerald-500/10' : 'dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-800 hover:dark:bg-[#1a1d24] hover:bg-slate-100'}`}>
                      <LayoutDashboard size={18} />
                      <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-workouts" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive('/my-workouts') ? 'dark:bg-[#1e212b] bg-slate-100 text-emerald-400 shadow-sm shadow-emerald-500/10' : 'dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-800 hover:dark:bg-[#1a1d24] hover:bg-slate-100'}`}>
                      <BarChart2 size={18} />
                      <span className="text-sm font-medium">Analytics</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-body" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive('/my-body') ? 'dark:bg-[#1e212b] bg-slate-100 text-emerald-400 shadow-sm shadow-emerald-500/10' : 'dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-800 hover:dark:bg-[#1a1d24] hover:bg-slate-100'}`}>
                      <Target size={18} />
                      <span className="text-sm font-medium">Goals</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-nutrition" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive('/my-nutrition') ? 'dark:bg-[#1e212b] bg-slate-100 text-emerald-400 shadow-sm shadow-emerald-500/10' : 'dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-800 hover:dark:bg-[#1a1d24] hover:bg-slate-100'}`}>
                      <CalendarDays size={18} />
                      <span className="text-sm font-medium">Timelines</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Settings & Help</h4>
            <ul className="space-y-1">
              {user?.role !== "coach" && user?.role !== "admin" && (
                <li>
                  <Link to="/my-settings" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive('/my-settings') ? 'dark:bg-[#1e212b] bg-slate-100 text-emerald-400 shadow-sm shadow-emerald-500/10' : 'dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-800 hover:dark:bg-[#1a1d24] hover:bg-slate-100'}`}>
                    <Settings size={18} />
                    <span className="text-sm font-medium">Settings</span>
                  </Link>
                </li>
              )}
              <li>
                <button 
                  onClick={() => { logout(); navigate("/"); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-red-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Log out</span>
                </button>
              </li>
            </ul>
          </div>

        </nav>

        {/* Bottom Home Button */}
        <div className="p-4 mt-auto">
          <Link 
            to="/" 
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-800/50 hover:bg-slate-700/50 dark:text-slate-300 text-slate-700 hover:dark:text-white hover:text-slate-900 rounded-xl border dark:border-slate-700 border-slate-300/50 transition-colors group"
          >
            <span className="text-sm font-medium">Retour au site public</span>
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden dark:bg-gradient-to-br dark:from-[#0f1115] dark:to-[#0a0c0f] bg-slate-50">
        
        {/* Topbar */}
        <header className="h-20 px-8 flex items-center justify-between shrink-0">
           <div className="flex-1"></div> {/* Spacer to push right content if no title here */}
           
           <div className="flex items-center gap-6">
              {/* Search */}
              <div 
                onClick={() => setShowSearch(true)}
                className="flex items-center gap-2 px-3 py-1.5 dark:bg-[#1a1d24] bg-slate-100 rounded-xl dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-800 hover:dark:bg-[#252a36] hover:bg-slate-200 cursor-pointer transition-colors border dark:border-slate-800 border-slate-200/50 group"
              >
                <Search size={14} />
                <span className="text-xs text-slate-500 hidden sm:block">Rechercher...</span>
                <kbd className="hidden sm:flex items-center gap-0.5 text-[9px] font-semibold text-slate-600 px-1.5 py-0.5 dark:bg-[#0b0c10] bg-slate-50 rounded border dark:border-slate-700 border-slate-300 ml-2">Ctrl K</kbd>
              </div>
              
              {/* Messages */}
              <div className="w-8 h-8 rounded-full dark:bg-[#1a1d24] bg-slate-100 flex items-center justify-center dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-800 hover:dark:bg-[#252a36] hover:bg-slate-200 cursor-pointer transition-colors">
                <MessageSquare size={16} />
              </div>

              {/* Notifications */}
              <div className="relative">
                <div 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="w-8 h-8 rounded-full dark:bg-[#1a1d24] bg-slate-100 flex items-center justify-center dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-800 hover:dark:bg-[#252a36] hover:bg-slate-200 cursor-pointer transition-colors"
                >
                  <Bell size={16} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full text-[9px] font-bold dark:text-white text-slate-900 flex items-center justify-center border-2 border-[#0b0c10]">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </div>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute top-12 right-0 w-80 dark:bg-[#12141a] bg-white border dark:border-slate-800 border-slate-200/50 rounded-2xl shadow-2xl overflow-hidden z-50 cursor-default" onClick={e => e.stopPropagation()}>
                    <div className="p-4 border-b dark:border-slate-800 border-slate-200/50 flex justify-between items-center dark:bg-[#1a1d24] bg-slate-100/50">
                      <h4 className="text-sm font-bold dark:text-white text-slate-900 flex items-center gap-2">
                        <Bell size={14} className="text-emerald-400" /> Notifications
                      </h4>
                      {unreadCount > 0 && (
                        <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">{unreadCount} New</span>
                      )}
                    </div>
                    
                    <div className="max-h-[350px] overflow-y-auto custom-scrollbar dark:bg-[#0f1115] bg-slate-50">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 text-xs">
                          Aucune notification.
                        </div>
                      ) : (
                        notifications.map(notif => (
                          <div 
                            key={notif._id} 
                            onClick={() => markOneAsRead(notif._id, notif.read)}
                            className={`p-4 border-b dark:border-slate-800 border-slate-200/30 hover:dark:bg-[#1a1d24] hover:bg-slate-100 transition-colors cursor-pointer relative ${notif.read ? 'opacity-60' : 'dark:bg-[#1a1d24] bg-slate-100/30'}`}
                          >
                            {!notif.read && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r-full"></div>}
                            <p className={`text-xs font-semibold mb-1 ${notif.read ? 'dark:text-slate-300 text-slate-700' : 'dark:text-white text-slate-900'}`}>{notif.title}</p>
                            <p className="text-[11px] dark:text-slate-400 text-slate-600 leading-relaxed">{notif.message}</p>
                            <p className="text-[9px] text-slate-500 mt-2 font-medium">
                              {new Date(notif.createdAt).toLocaleDateString()} à {new Date(notif.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                    
                    {unreadCount > 0 && (
                      <div className="p-3 dark:bg-[#0b0c10] bg-slate-50 text-center border-t dark:border-slate-800 border-slate-200/50">
                        <button 
                          onClick={markAllAsRead}
                          className="text-xs text-emerald-500 font-medium hover:text-emerald-400 transition-colors"
                        >
                          Tout marquer comme lu
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center dark:bg-[#1a1d24] bg-slate-100 rounded-full p-1 ml-2">
                <button 
                  onClick={() => darkMode && setDarkMode(false)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${!darkMode ? 'bg-slate-700 dark:text-white text-slate-900' : 'text-slate-500 hover:dark:text-slate-300 text-slate-700'}`}
                >
                  <Sun size={14} />
                </button>
                <button 
                   onClick={() => !darkMode && setDarkMode(true)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${darkMode ? 'bg-slate-700 dark:text-white text-slate-900 shadow-sm' : 'text-slate-500 hover:dark:text-slate-300 text-slate-700'}`}
                >
                  <Moon size={14} />
                </button>
              </div>
           </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <Outlet />
        </div>

      </main>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 bg-black/80 backdrop-blur-sm" onClick={() => { setShowSearch(false); setSearchQuery(""); }}>
          <div className="w-full max-w-2xl dark:bg-[#12141a] bg-white border dark:border-slate-800 border-slate-200/50 rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            
            {/* Search Input */}
            <div className="flex items-center px-5 py-4 border-b dark:border-slate-800 border-slate-200/50 gap-3">
              <Search className="w-5 h-5 dark:text-slate-400 text-slate-600 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Rechercher entraînements, cours, nutrition, pages..."
                className="flex-1 bg-transparent border-none dark:text-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-0 text-sm"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
              />
              <kbd className="text-[10px] font-semibold text-slate-500 px-2 py-1 dark:bg-[#1a1d24] bg-slate-100 rounded-lg border dark:border-slate-700 border-slate-300">ESC</kbd>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              {searchQuery.length >= 2 && searchResults.length === 0 && (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 rounded-full dark:bg-[#1a1d24] bg-slate-100 flex items-center justify-center mx-auto mb-3">
                    <Search className="w-5 h-5 text-slate-500" />
                  </div>
                  <p className="text-sm font-medium dark:text-slate-400 text-slate-600">Aucun résultat pour <span className="dark:text-white text-slate-900">"{searchQuery}"</span></p>
                  <p className="text-xs text-slate-500 mt-1">Essayez un autre terme de recherche.</p>
                </div>
              )}

              {searchResults.length > 0 && (
                <div className="p-3 space-y-1">
                  {/* Group by type */}
                  {["Entraînement", "Programme", "Cours", "Nutrition", "Navigation"].map(type => {
                    const group = searchResults.filter(r => r.type === type);
                    if (group.length === 0) return null;
                    return (
                      <div key={type} className="mb-2">
                        <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{type}</div>
                        {group.map((result, i) => {
                          const Icon = result.icon;
                          return (
                            <button
                              key={i}
                              onClick={result.action}
                              className="w-full flex items-center gap-3 px-3 py-2.5 hover:dark:bg-[#1a1d24] hover:bg-slate-100 rounded-xl transition-colors text-left group"
                            >
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${result.bg} border dark:border-slate-800 border-slate-200/50`}>
                                <Icon size={16} className={result.color} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium dark:text-white text-slate-900 truncate group-hover:text-emerald-400 transition-colors">{result.title}</p>
                                <p className="text-xs text-slate-500 truncate">{result.meta}</p>
                              </div>
                              <Activity size={14} className="text-slate-600 group-hover:dark:text-slate-400 text-slate-600 shrink-0" />
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Default state - show quick nav */}
              {!searchQuery && (
                <div className="p-3">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Navigation Rapide</div>
                  {(user?.role === "admin" ? [
                    { label: "Vue d'Ensemble", path: "/admin", icon: LayoutDashboard, color: "text-red-500", bg: "bg-red-500/10" },
                    { label: "Gestion Planning", path: "/admin/schedule", icon: CalendarDays, color: "text-purple-400", bg: "bg-purple-500/10" },
                  ] : user?.role === "coach" ? [
                    { label: "Dashboard Coach", path: "/coach", icon: LayoutDashboard, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                    { label: "Program Builder", path: "/coach/builder", icon: Dumbbell, color: "text-purple-400", bg: "bg-purple-500/10" },
                  ] : [
                    { label: "Dashboard", path: "/my-dashboard", icon: LayoutDashboard, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                    { label: "Analytics", path: "/my-workouts", icon: BarChart2, color: "text-blue-400", bg: "bg-blue-500/10" },
                    { label: "Goals / Body", path: "/my-body", icon: Target, color: "text-amber-400", bg: "bg-amber-500/10" },
                    { label: "Timelines / Nutrition", path: "/my-nutrition", icon: CalendarDays, color: "text-purple-400", bg: "bg-purple-500/10" },
                  ]).map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.path}
                        onClick={() => { navigate(item.path); setShowSearch(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:dark:bg-[#1a1d24] hover:bg-slate-100 rounded-xl transition-colors text-left"
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.bg} border dark:border-slate-800 border-slate-200/50`}>
                          <Icon size={16} className={item.color} />
                        </div>
                        <span className="text-sm font-medium dark:text-slate-300 text-slate-700 hover:dark:text-white hover:text-slate-900">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="px-5 py-3 border-t dark:border-slate-800 border-slate-200/50 dark:bg-[#0b0c10] bg-slate-50 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">{searchResults.length > 0 ? `${searchResults.length} résultat${searchResults.length > 1 ? 's' : ''}` : "Tapez pour rechercher"}</span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-500 flex items-center gap-1"><kbd className="px-1.5 py-0.5 dark:bg-[#1a1d24] bg-slate-100 rounded border dark:border-slate-700 border-slate-300 dark:text-slate-400 text-slate-600">↵</kbd> pour ouvrir</span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1"><kbd className="px-1.5 py-0.5 dark:bg-[#1a1d24] bg-slate-100 rounded border dark:border-slate-700 border-slate-300 dark:text-slate-400 text-slate-600">ESC</kbd> pour fermer</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Basic custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2a2d36; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3a3d46; }
      `}</style>
    </div>
  );
}
