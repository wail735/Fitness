import React, { useState, useMemo, useRef, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
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
  const { classes, workouts, nutritionLogs } = useFitness();
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = React.useContext(ThemeContext);
  const searchInputRef = useRef(null);

  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  React.useEffect(() => {
    if (!darkMode) {
      document.documentElement.classList.add("light-theme-override");
    } else {
      document.documentElement.classList.remove("light-theme-override");
    }
  }, [darkMode]);

  const isActive = (path) => location.pathname === path;

  // ── Smart search across real data ───────────────────────────────────────────
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q || q.length < 2) return [];

    const results = [];

    // Search workouts
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

    // Search classes
    classes.filter(c => c.name?.toLowerCase().includes(q) || c.category?.toLowerCase().includes(q) || c.trainer?.toLowerCase().includes(q)).forEach(c => {
      results.push({
        type: "Cours",
        icon: CalendarDays,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        title: c.name,
        meta: `${c.day || ""} · ${c.time || ""} · ${c.trainer || ""}`,
        action: () => { navigate("/my-dashboard"); setShowSearch(false); setSearchQuery(""); },
      });
    });

    // Search nutrition logs
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

    // Navigation shortcuts
    const pages = [
      { label: "Dashboard", path: "/my-dashboard" },
      { label: "Analytics", path: "/my-workouts" },
      { label: "Goals / Body", path: "/my-body" },
      { label: "Timelines / Nutrition", path: "/my-nutrition" },
      { label: "Paramètres", path: "/my-settings" },
    ];
    pages.filter(p => p.label.toLowerCase().includes(q)).forEach(p => {
      results.push({
        type: "Navigation",
        icon: LayoutDashboard,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        title: p.label,
        meta: p.path,
        action: () => { navigate(p.path); setShowSearch(false); setSearchQuery(""); },
      });
    });

    return results.slice(0, 8); // max 8 results
  }, [searchQuery, workouts, classes, nutritionLogs, navigate]);

  return (
    <div className="flex h-screen bg-[#0b0c10] text-slate-300 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#12141a] border-r border-slate-800 flex flex-col transition-all duration-300">
        {/* User Profile */}
        <div className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
            {/* Fallback avatar */}
            <span className="text-lg font-bold text-slate-400">
              {user?.name?.charAt(0) || "U"}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-slate-100">{user?.name || "Member"}</h3>
            <p className="text-xs text-slate-500">@{user?.name?.toLowerCase().replace(/\s/g, '') || "user"} <span className="bg-slate-800 text-[10px] px-1.5 py-0.5 rounded ml-1 text-slate-300">Pro</span></p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto custom-scrollbar">
          
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Main Menu</h4>
            <ul className="space-y-1">
              {user?.role === "coach" ? (
                <>
                  <li>
                    <Link to="/coach" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive('/coach') ? 'bg-[#1e212b] text-emerald-400 shadow-sm shadow-emerald-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-[#1a1d24]'}`}>
                      <LayoutDashboard size={18} />
                      <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/coach/builder" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive('/coach/builder') ? 'bg-[#1e212b] text-emerald-400 shadow-sm shadow-emerald-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-[#1a1d24]'}`}>
                      <Dumbbell size={18} />
                      <span className="text-sm font-medium">Program Builder</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/my-dashboard" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive('/my-dashboard') ? 'bg-[#1e212b] text-emerald-400 shadow-sm shadow-emerald-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-[#1a1d24]'}`}>
                      <LayoutDashboard size={18} />
                      <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-workouts" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive('/my-workouts') ? 'bg-[#1e212b] text-emerald-400 shadow-sm shadow-emerald-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-[#1a1d24]'}`}>
                      <BarChart2 size={18} />
                      <span className="text-sm font-medium">Analytics</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-body" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive('/my-body') ? 'bg-[#1e212b] text-emerald-400 shadow-sm shadow-emerald-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-[#1a1d24]'}`}>
                      <Target size={18} />
                      <span className="text-sm font-medium">Goals</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-nutrition" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive('/my-nutrition') ? 'bg-[#1e212b] text-emerald-400 shadow-sm shadow-emerald-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-[#1a1d24]'}`}>
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
              {user?.role !== "coach" && (
                <li>
                  <Link to="/my-settings" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive('/my-settings') ? 'bg-[#1e212b] text-emerald-400 shadow-sm shadow-emerald-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-[#1a1d24]'}`}>
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

        {/* Bottom Community Card */}
        <div className="p-4 m-4 bg-[#1a1d24] rounded-2xl text-center border border-slate-800/50">
          <div className="flex justify-center -space-x-2 mb-3">
             <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-[#1a1d24] flex items-center justify-center text-[10px]">A</div>
             <div className="w-8 h-8 rounded-full bg-slate-600 border-2 border-[#1a1d24] flex items-center justify-center text-[10px]">B</div>
             <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#1a1d24] flex items-center justify-center text-[10px]"><Plus size={12}/></div>
          </div>
          <p className="text-xs text-slate-400 font-medium">Join the community and<br/>find out more</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-gradient-to-br from-[#0f1115] to-[#0a0c0f]">
        
        {/* Topbar */}
        <header className="h-20 px-8 flex items-center justify-between shrink-0">
           <div className="flex-1"></div> {/* Spacer to push right content if no title here */}
           
           <div className="flex items-center gap-6">
              {/* Search */}
              <div 
                onClick={() => setShowSearch(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1d24] rounded-xl text-slate-400 hover:text-slate-200 hover:bg-[#252a36] cursor-pointer transition-colors border border-slate-800/50 group"
              >
                <Search size={14} />
                <span className="text-xs text-slate-500 hidden sm:block">Rechercher...</span>
                <kbd className="hidden sm:flex items-center gap-0.5 text-[9px] font-semibold text-slate-600 px-1.5 py-0.5 bg-[#0b0c10] rounded border border-slate-700 ml-2">Ctrl K</kbd>
              </div>
              
              {/* Messages */}
              <div className="w-8 h-8 rounded-full bg-[#1a1d24] flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-[#252a36] cursor-pointer transition-colors">
                <MessageSquare size={16} />
              </div>

              {/* Notifications */}
              <div 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative w-8 h-8 rounded-full bg-[#1a1d24] flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-[#252a36] cursor-pointer transition-colors"
              >
                <Bell size={16} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center border-2 border-[#0b0c10]">2</span>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute top-12 right-0 w-72 bg-[#12141a] border border-slate-800/50 rounded-2xl shadow-2xl overflow-hidden z-50 cursor-default" onClick={e => e.stopPropagation()}>
                    <div className="p-4 border-b border-slate-800/50 flex justify-between items-center">
                      <h4 className="text-sm font-bold text-white">Notifications</h4>
                      <span className="text-[10px] text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">2 New</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="p-4 border-b border-slate-800/50 hover:bg-[#1a1d24] transition-colors cursor-pointer">
                        <p className="text-xs text-white font-medium mb-1">Workout Goal Achieved! 🎉</p>
                        <p className="text-[10px] text-slate-400">You burned 500 kcal today. Keep it up!</p>
                        <p className="text-[9px] text-slate-500 mt-2">10 mins ago</p>
                      </div>
                      <div className="p-4 hover:bg-[#1a1d24] transition-colors cursor-pointer">
                        <p className="text-xs text-white font-medium mb-1">New Class Available</p>
                        <p className="text-[10px] text-slate-400">CrossFit Intense added to schedule on Wednesday.</p>
                        <p className="text-[9px] text-slate-500 mt-2">2 hours ago</p>
                      </div>
                    </div>
                    <div className="p-3 bg-[#0b0c10] text-center border-t border-slate-800/50">
                      <button className="text-xs text-emerald-500 font-medium hover:text-emerald-400">Mark all as read</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center bg-[#1a1d24] rounded-full p-1 ml-2">
                <button 
                  onClick={() => darkMode && setDarkMode(false)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${!darkMode ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Sun size={14} />
                </button>
                <button 
                   onClick={() => !darkMode && setDarkMode(true)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${darkMode ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
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
          <div className="w-full max-w-2xl bg-[#12141a] border border-slate-800/50 rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            
            {/* Search Input */}
            <div className="flex items-center px-5 py-4 border-b border-slate-800/50 gap-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Rechercher entraînements, cours, nutrition, pages..."
                className="flex-1 bg-transparent border-none text-white placeholder-slate-500 focus:outline-none focus:ring-0 text-sm"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
              />
              <kbd className="text-[10px] font-semibold text-slate-500 px-2 py-1 bg-[#1a1d24] rounded-lg border border-slate-700">ESC</kbd>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              {searchQuery.length >= 2 && searchResults.length === 0 && (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#1a1d24] flex items-center justify-center mx-auto mb-3">
                    <Search className="w-5 h-5 text-slate-500" />
                  </div>
                  <p className="text-sm font-medium text-slate-400">Aucun résultat pour <span className="text-white">"{searchQuery}"</span></p>
                  <p className="text-xs text-slate-500 mt-1">Essayez un autre terme de recherche.</p>
                </div>
              )}

              {searchResults.length > 0 && (
                <div className="p-3 space-y-1">
                  {/* Group by type */}
                  {["Entraînement", "Cours", "Nutrition", "Navigation"].map(type => {
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
                              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#1a1d24] rounded-xl transition-colors text-left group"
                            >
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${result.bg} border border-slate-800/50`}>
                                <Icon size={16} className={result.color} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate group-hover:text-emerald-400 transition-colors">{result.title}</p>
                                <p className="text-xs text-slate-500 truncate">{result.meta}</p>
                              </div>
                              <Activity size={14} className="text-slate-600 group-hover:text-slate-400 shrink-0" />
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
                  {[
                    { label: "Dashboard", path: "/my-dashboard", icon: LayoutDashboard, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                    { label: "Analytics", path: "/my-workouts", icon: BarChart2, color: "text-blue-400", bg: "bg-blue-500/10" },
                    { label: "Goals / Body", path: "/my-body", icon: Target, color: "text-amber-400", bg: "bg-amber-500/10" },
                    { label: "Timelines / Nutrition", path: "/my-nutrition", icon: CalendarDays, color: "text-purple-400", bg: "bg-purple-500/10" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.path}
                        onClick={() => { navigate(item.path); setShowSearch(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#1a1d24] rounded-xl transition-colors text-left"
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.bg} border border-slate-800/50`}>
                          <Icon size={16} className={item.color} />
                        </div>
                        <span className="text-sm font-medium text-slate-300 hover:text-white">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="px-5 py-3 border-t border-slate-800/50 bg-[#0b0c10] flex items-center justify-between">
              <span className="text-[10px] text-slate-500">{searchResults.length > 0 ? `${searchResults.length} résultat${searchResults.length > 1 ? 's' : ''}` : "Tapez pour rechercher"}</span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-500 flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-[#1a1d24] rounded border border-slate-700 text-slate-400">↵</kbd> pour ouvrir</span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-[#1a1d24] rounded border border-slate-700 text-slate-400">ESC</kbd> pour fermer</span>
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
