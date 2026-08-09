import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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
  LogOut
} from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function PortalLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = React.useContext(ThemeContext);

  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  React.useEffect(() => {
    if (!darkMode) {
      document.documentElement.classList.add("light-theme-override");
    } else {
      document.documentElement.classList.remove("light-theme-override");
    }
  }, [darkMode]);

  const isActive = (path) => location.pathname === path;

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
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Settings & Help</h4>
            <ul className="space-y-1">
              <li>
                <Link to="/my-settings" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive('/my-settings') ? 'bg-[#1e212b] text-emerald-400 shadow-sm shadow-emerald-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-[#1a1d24]'}`}>
                  <Settings size={18} />
                  <span className="text-sm font-medium">Settings</span>
                </Link>
              </li>
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
                className="w-8 h-8 rounded-full bg-[#1a1d24] flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-[#252a36] cursor-pointer transition-colors"
              >
                <Search size={16} />
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
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 bg-black/80 backdrop-blur-sm" onClick={() => setShowSearch(false)}>
          <div className="w-full max-w-xl bg-[#12141a] border border-slate-800/50 rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center px-4 py-3 border-b border-slate-800/50">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input 
                type="text" 
                placeholder="Search workouts, classes, analytics..." 
                className="flex-1 bg-transparent border-none text-white focus:outline-none focus:ring-0 text-sm"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button onClick={() => setShowSearch(false)} className="text-xs font-semibold text-slate-500 hover:text-white px-2 py-1 bg-[#1a1d24] rounded-lg">ESC</button>
            </div>
            {searchQuery && (
              <div className="p-2">
                <div className="px-3 py-2 text-xs font-bold text-slate-500 uppercase">Results</div>
                <div className="px-3 py-3 hover:bg-[#1a1d24] rounded-xl cursor-pointer text-sm text-slate-300 flex items-center gap-3">
                  <BarChart2 size={16} className="text-emerald-500"/> Go to Analytics for "{searchQuery}"
                </div>
                <div className="px-3 py-3 hover:bg-[#1a1d24] rounded-xl cursor-pointer text-sm text-slate-300 flex items-center gap-3">
                  <CalendarDays size={16} className="text-emerald-500"/> Search Timelines for "{searchQuery}"
                </div>
              </div>
            )}
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
