import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useFitness } from "../../context/FitnessContext";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Clock, MoreHorizontal, ArrowUpRight } from "lucide-react";

import { useMemo } from "react";
import { Link } from "react-router-dom";

// SVG Circular Progress Component
const CircularProgress = ({ percent, value, label, subLabel }) => {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-36 h-36">
      <svg className="transform -rotate-90 w-36 h-36">
        <circle cx="72" cy="72" r={radius} stroke="#1a1d24" strokeWidth="8" fill="transparent" />
        <circle
          cx="72" cy="72" r={radius}
          stroke="#10b981"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold text-white leading-none">{value}</span>
        <span className="text-[10px] text-slate-400 mt-1">{subLabel}</span>
      </div>
    </div>
  );
};

export default function UserDashboard() {
  const { user } = useAuth();
  const { workouts, bodyMetrics, nutritionLogs, classes } = useFitness();

  const latestWeight = bodyMetrics.length > 0 ? bodyMetrics[bodyMetrics.length - 1].weightKg : "--";
  const totalCalsToday = nutritionLogs.reduce((acc, log) => acc + log.calories, 0);

  // Dynamic Intensity Data based on Workouts
  const intensityData = useMemo(() => {
    if (workouts.length === 0) return Array(10).fill({ pv: 0 });
    return [...workouts].reverse().slice(0, 10).map(w => ({ pv: w.caloriesBurned }));
  }, [workouts]);

  const maxCals = workouts.length > 0 ? Math.max(...workouts.map(w => w.caloriesBurned)) : 0;
  const avgCals = workouts.length > 0 ? Math.round(workouts.reduce((a, b) => a + b.caloriesBurned, 0) / workouts.length) : 0;

  // Dynamic Trainers from classes
  const uniqueTrainers = useMemo(() => {
    const trainers = classes.map(c => c.trainer).filter(Boolean);
    return [...new Set(trainers)].slice(0, 2);
  }, [classes]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Header & Stats */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-slate-400 text-sm mb-1">Good morning</p>
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back !</h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-8 xl:gap-16 bg-[#12141a] p-4 px-8 rounded-2xl border border-slate-800/50">
           <div className="text-right">
             <p className="text-slate-400 text-xs mb-1">Weight balance</p>
             <p className="text-lg font-bold text-white">{latestWeight} <span className="text-xs text-slate-500 font-normal">kg</span></p>
           </div>
           <div className="w-px h-8 bg-slate-800 hidden sm:block"></div>
           <div className="text-right">
             <p className="text-slate-400 text-xs mb-1">Heart rate</p>
             <p className="text-lg font-bold text-white">90 <span className="text-xs text-slate-500 font-normal">bpm</span></p>
           </div>
           <div className="w-px h-8 bg-slate-800 hidden sm:block"></div>
           <div className="text-right">
             <p className="text-slate-400 text-xs mb-1">Hydration level</p>
             <p className="text-lg font-bold text-white">86 <span className="text-xs text-slate-500 font-normal">%</span></p>
           </div>
           <div className="w-px h-8 bg-slate-800 hidden sm:block"></div>
           <div className="text-right">
             <p className="text-slate-400 text-xs mb-1">Blood cells</p>
             <p className="text-lg font-bold text-white">1100 <span className="text-xs text-slate-500 font-normal">ul</span></p>
           </div>
        </div>
      </div>

      {/* Grid: Charts & Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Calories Burn */}
        <div className="bg-[#12141a] rounded-3xl p-6 border border-slate-800/50 flex flex-col justify-between">
           <div className="flex items-center justify-between mb-2">
              <div></div> {/* Spacer */}
              <button className="text-slate-500 hover:text-slate-300"><MoreHorizontal size={18}/></button>
           </div>
           
           <div className="flex items-center gap-6 mb-6">
              <CircularProgress percent={87} value="87%" subLabel="1,980ml" />
              
              <div className="space-y-4 flex-1">
                 <div>
                   <div className="flex items-center justify-between mb-1">
                     <span className="flex items-center gap-2 text-xs text-slate-400">
                       <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Calories burn
                     </span>
                     <span className="text-xs text-emerald-400 flex items-center gap-1">~ 0.22%</span>
                   </div>
                   <p className="text-sm font-bold text-white">{totalCalsToday > 0 ? totalCalsToday : 2450} kcal</p>
                 </div>
                 
                 <div>
                   <div className="flex items-center justify-between mb-1">
                     <span className="flex items-center gap-2 text-xs text-slate-400">
                       <span className="w-2 h-2 rounded-full bg-slate-500"></span> Carbs
                     </span>
                     <span className="text-xs text-slate-500 flex items-center gap-1">~ 3.06%</span>
                   </div>
                   <p className="text-sm font-bold text-white">23.2%</p>
                 </div>

                 <div>
                   <div className="flex items-center justify-between mb-1">
                     <span className="flex items-center gap-2 text-xs text-slate-400">
                       <span className="w-2 h-2 rounded-full bg-slate-700"></span> Protein
                     </span>
                     <span className="text-xs text-slate-500 flex items-center gap-1">~ 2.22%</span>
                   </div>
                   <p className="text-sm font-bold text-white">11.9%</p>
                 </div>
              </div>
           </div>

           <button className="w-full py-3 bg-[#1a1d24] hover:bg-[#252a36] transition-colors rounded-xl text-sm text-slate-300 font-medium">
             View full details
           </button>
        </div>

        {/* Workout Intensity Chart */}
        <div className="bg-gradient-to-b from-[#12141a] to-[#0a1215] rounded-3xl p-6 border border-slate-800/50 relative overflow-hidden flex flex-col justify-between">
           {/* Glow effect at bottom */}
           <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-40 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>

           <div className="flex justify-between items-start z-10 relative">
             <h3 className="text-lg font-medium text-slate-200">Workout Intensity</h3>
             <Link to="/my-workouts" className="text-slate-500 hover:text-slate-300"><MoreHorizontal size={18}/></Link>
           </div>
           
           <div className="h-28 w-full mt-4 z-10 relative">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={intensityData}>
                 <Line type="monotone" dataKey="pv" stroke="#10b981" strokeWidth={2} dot={false} isAnimationActive={false} />
               </LineChart>
             </ResponsiveContainer>
           </div>

           <div className="mt-6 z-10 relative">
             <p className="text-sm text-slate-300 mb-3">Calories Burned</p>
             <div className="flex justify-between">
               <div>
                 <p className="text-[10px] text-slate-500 mb-1">Latest</p>
                 <p className="text-xs text-white font-semibold">{workouts[0]?.caloriesBurned || 0} <span className="text-[10px] font-normal text-slate-500">kcal</span></p>
               </div>
               <div>
                 <p className="text-[10px] text-slate-500 mb-1">Average</p>
                 <p className="text-xs text-white font-semibold">{avgCals} <span className="text-[10px] font-normal text-slate-500">kcal</span></p>
               </div>
               <div>
                 <p className="text-[10px] text-slate-500 mb-1">Max</p>
                 <p className="text-xs text-white font-semibold">{maxCals} <span className="text-[10px] font-normal text-slate-500">kcal</span></p>
               </div>
             </div>
           </div>
        </div>

        {/* Recent Workouts */}
        <div className="flex flex-col justify-between">
           <div className="mb-4">
             <h3 className="text-lg font-medium text-slate-200">Recent Workouts</h3>
             <p className="text-lg font-medium text-slate-400">Your Activity:</p>
           </div>

           <div className="space-y-3">
             {workouts.length > 0 ? workouts.slice(0, 3).map((w, i) => (
               <div key={w._id || w.id || i} className="bg-[#12141a] border border-slate-800/50 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1a1d24] flex flex-col items-center justify-center border border-slate-800">
                      <span className="text-sm font-bold text-white">{w.durationMinutes}</span>
                      <span className="text-[9px] text-slate-400">Min</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">{w.name}</h4>
                      <p className="text-[11px] text-slate-500">{w.date}</p>
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${i % 2 === 0 ? 'border-emerald-500/30 text-emerald-400' : 'border-slate-700 text-slate-400'}`}>
                    <span className="text-[10px]">{Math.min(100, Math.round((w.caloriesBurned / 500) * 100))}%</span>
                  </div>
               </div>
             )) : (
               <p className="text-slate-400 text-sm">No recent workouts recorded.</p>
             )}
           </div>
        </div>

      </div>

      {/* Recommended Activity - full width */}
      <div className="bg-[#12141a] border border-slate-800/50 rounded-3xl p-6 mt-2">
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-slate-200">Recommended activity</h3>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-lg bg-[#1a1d24] flex items-center justify-center text-slate-400 hover:text-white"><div className="w-3 h-0.5 bg-current"></div><div className="w-3 h-0.5 bg-current mt-1"></div></button>
              <button className="w-8 h-8 rounded-lg bg-[#1a1d24] flex items-center justify-center text-slate-400 hover:text-white flex-wrap content-center gap-0.5"><div className="w-1.5 h-1.5 bg-current"></div><div className="w-1.5 h-1.5 bg-current"></div><div className="w-1.5 h-1.5 bg-current"></div><div className="w-1.5 h-1.5 bg-current"></div></button>
            </div>
         </div>

         <div className="space-y-1">
            {classes && classes.length > 0 ? classes.slice(0, 4).map((c, i) => (
              <React.Fragment key={c.id || c._id || i}>
                <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#1a1d24] transition-colors group">
                   <div className="flex items-center gap-4">
                     <div className={`w-12 h-12 rounded-2xl group-hover:bg-[#252a36] flex items-center justify-center ${i % 2 === 0 ? 'bg-[#1a1d24] text-slate-300' : 'bg-emerald-500/10 text-emerald-400'}`}>
                       {i % 4 === 0 ? '🏃' : i % 4 === 1 ? '🚴' : i % 4 === 2 ? '🏋️' : '🧘'}
                     </div>
                     <div>
                       <h4 className="text-sm font-semibold text-slate-200">{c.name}</h4>
                       <p className="text-[11px] text-slate-500">{c.day}</p>
                     </div>
                   </div>
                   <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
                     <Clock size={12}/> {c.time}
                   </div>
                   <div className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${i % 2 !== 0 ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-slate-300 bg-[#1a1d24] group-hover:bg-[#252a36]'}`}>
                     {c.trainer}
                   </div>
                   <button className="text-slate-500 hover:text-white"><MoreHorizontal size={16}/></button>
                </div>
                {i < Math.min(classes.length - 1, 3) && <div className="w-full h-px bg-slate-800/50 my-1"></div>}
              </React.Fragment>
            )) : (
              <p className="text-slate-400 text-sm">No classes available.</p>
            )}
         </div>
      </div>


    </div>
  );
}
