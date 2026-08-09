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
  Plus
} from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

export default function PortalLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const { darkMode, setDarkMode } = React.useContext(ThemeContext);

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
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-slate-400 hover:text-slate-200 hover:bg-[#1a1d24]">
                  <Settings size={18} />
                  <span className="text-sm font-medium">Settings</span>
                </button>
              </li>
              <li>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-slate-400 hover:text-slate-200 hover:bg-[#1a1d24]">
                  <Paintbrush size={18} />
                  <span className="text-sm font-medium">Appearance</span>
                </button>
              </li>
              <li>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-slate-400 hover:text-slate-200 hover:bg-[#1a1d24]">
                  <HelpCircle size={18} />
                  <span className="text-sm font-medium">Support</span>
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
              <div className="w-8 h-8 rounded-full bg-[#1a1d24] flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-[#252a36] cursor-pointer transition-colors">
                <Search size={16} />
              </div>
              
              {/* Messages */}
              <div className="w-8 h-8 rounded-full bg-[#1a1d24] flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-[#252a36] cursor-pointer transition-colors">
                <MessageSquare size={16} />
              </div>

              {/* Notifications */}
              <div className="relative w-8 h-8 rounded-full bg-[#1a1d24] flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-[#252a36] cursor-pointer transition-colors">
                <Bell size={16} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center border-2 border-[#0b0c10]">2</span>
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
