import React, { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { useFitness } from "../../context/FitnessContext";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import { Clock, MoreHorizontal, Heart, Droplets, Activity, Scale } from "lucide-react";
import { Link } from "react-router-dom";

// SVG Circular Progress
const CircularProgress = ({ percent, value, subLabel }) => {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(percent, 100) / 100) * circumference;
  return (
    <div className="relative flex items-center justify-center w-36 h-36 shrink-0">
      <svg className="transform -rotate-90 w-36 h-36">
        <circle cx="72" cy="72" r={radius} stroke="#1a1d24" strokeWidth="8" fill="transparent" />
        <circle cx="72" cy="72" r={radius} stroke="#10b981" strokeWidth="8" fill="transparent"
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" className="transition-all duration-1000 ease-out" />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold text-white leading-none">{value}</span>
        <span className="text-[10px] text-slate-400 mt-1">{subLabel}</span>
      </div>
    </div>
  );
};

// Greeting based on time
const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

export default function UserDashboard() {
  const { user } = useAuth();
  const { workouts, bodyMetrics, nutritionLogs, classes } = useFitness();

  // ── Latest body metrics ───────────────────────────────────────────────────
  const latestMetric = bodyMetrics.length > 0
    ? bodyMetrics[bodyMetrics.length - 1]
    : null;

  const latestWeight     = latestMetric?.weightKg     || "--";
  const latestHeartRate  = latestMetric?.heartRate    || "--";
  const latestHydration  = latestMetric?.hydrationPct || "--";
  const latestBloodCells = latestMetric?.bloodCellsUl || "--";

  // ── Today's nutrition totals ──────────────────────────────────────────────
  const today = new Date().toISOString().split("T")[0];
  const todayLogs = nutritionLogs.filter(l => l.date === today);

  const totalCalsToday    = todayLogs.reduce((a, l) => a + (l.calories || 0), 0);
  const totalProteinToday = todayLogs.reduce((a, l) => a + (l.protein  || 0), 0);
  const totalCarbsToday   = todayLogs.reduce((a, l) => a + (l.carbs    || 0), 0);
  const totalFatToday     = todayLogs.reduce((a, l) => a + (l.fat      || 0), 0);

  const DAILY_GOAL_KCAL = 2500;
  const nutritionPct = Math.min(Math.round((totalCalsToday / DAILY_GOAL_KCAL) * 100), 100);
  const totalMacros  = totalProteinToday + totalCarbsToday + totalFatToday || 1;
  const carbsPct     = Math.round((totalCarbsToday / totalMacros) * 100);
  const proteinPct   = Math.round((totalProteinToday / totalMacros) * 100);

  // ── Workout intensity chart ───────────────────────────────────────────────
  const intensityData = useMemo(() => {
    if (workouts.length === 0) return Array(8).fill({ pv: 0 });
    return [...workouts].reverse().slice(0, 10).map(w => ({
      pv: w.caloriesBurned || 0,
      name: w.name,
    }));
  }, [workouts]);

  const latestCals = workouts[0]?.caloriesBurned || 0;
  const maxCals    = workouts.length > 0 ? Math.max(...workouts.map(w => w.caloriesBurned || 0)) : 0;
  const avgCals    = workouts.length > 0
    ? Math.round(workouts.reduce((a, b) => a + (b.caloriesBurned || 0), 0) / workouts.length)
    : 0;

  // ── Stat card config ──────────────────────────────────────────────────────
  const stats = [
    { label: "Weight balance", value: latestWeight, unit: "kg",  icon: Scale,    color: "text-blue-400",   path: "/my-body" },
    { label: "Heart rate",     value: latestHeartRate,  unit: "bpm", icon: Heart,    color: "text-red-400",    path: "/my-body" },
    { label: "Hydration",      value: latestHydration,  unit: "%",   icon: Droplets, color: "text-cyan-400",   path: "/my-body" },
    { label: "Blood cells",    value: latestBloodCells, unit: "µl",  icon: Activity, color: "text-purple-400", path: "/my-body" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Top Header & Stats */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-4">
        <div>
          <p className="text-slate-400 text-sm mb-1">{getGreeting()},</p>
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back, {user?.name?.split(" ")[0] || "Member"}!</h1>
        </div>

        {/* Health Stats Bar */}
        <div className="flex flex-wrap items-center gap-0 bg-[#12141a] rounded-2xl border border-slate-800/50 overflow-hidden">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <Link to={s.path} key={i} className="flex-1 min-w-[110px] px-5 py-4 flex flex-col gap-1 hover:bg-[#1a1d24] transition-colors group border-r border-slate-800/50 last:border-r-0">
                <div className="flex items-center gap-1.5">
                  <Icon size={11} className={s.color} />
                  <span className="text-slate-400 text-[10px] font-medium uppercase tracking-wider">{s.label}</span>
                </div>
                <p className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {s.value} <span className="text-xs text-slate-500 font-normal">{s.unit}</span>
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Grid: Charts & Workouts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Nutrition Summary */}
        <div className="bg-[#12141a] rounded-3xl p-6 border border-slate-800/50 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Today's Nutrition</h3>
            <Link to="/my-nutrition" className="text-slate-500 hover:text-slate-300"><MoreHorizontal size={18}/></Link>
          </div>

          <div className="flex items-center gap-5 mb-6">
            <CircularProgress
              percent={nutritionPct}
              value={`${nutritionPct}%`}
              subLabel={`${DAILY_GOAL_KCAL} kcal goal`}
            />
            <div className="space-y-3 flex-1">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Calories
                  </span>
                  <span className="text-xs text-emerald-400">{nutritionPct}%</span>
                </div>
                <p className="text-sm font-bold text-white">{totalCalsToday > 0 ? totalCalsToday : "--"} <span className="text-xs text-slate-500 font-normal">kcal</span></p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-slate-500"></span> Carbs
                  </span>
                  <span className="text-xs text-slate-500">{carbsPct}%</span>
                </div>
                <p className="text-sm font-bold text-white">{totalCarbsToday > 0 ? `${totalCarbsToday}g` : "--"}</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-slate-700"></span> Protein
                  </span>
                  <span className="text-xs text-slate-500">{proteinPct}%</span>
                </div>
                <p className="text-sm font-bold text-white">{totalProteinToday > 0 ? `${totalProteinToday}g` : "--"}</p>
              </div>
            </div>
          </div>

          <Link to="/my-nutrition" className="block w-full py-3 bg-[#1a1d24] hover:bg-[#252a36] transition-colors rounded-xl text-sm text-slate-300 font-medium text-center">
            View full details
          </Link>
        </div>

        {/* Workout Intensity Chart */}
        <div className="bg-gradient-to-b from-[#12141a] to-[#0a1215] rounded-3xl p-6 border border-slate-800/50 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-40 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>

          <div className="flex justify-between items-start z-10 relative">
            <h3 className="text-lg font-medium text-slate-200">Workout Intensity</h3>
            <Link to="/my-workouts" className="text-slate-500 hover:text-slate-300"><MoreHorizontal size={18}/></Link>
          </div>

          <div className="h-28 w-full mt-4 z-10 relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={intensityData}>
                <Tooltip
                  contentStyle={{ backgroundColor: "#12141a", borderColor: "#334155", borderRadius: "10px", fontSize: "11px", color: "#fff" }}
                  formatter={(v, n, p) => [`${v} kcal`, p.payload.name || "Entraînement"]}
                  labelFormatter={() => ""}
                />
                <Line type="monotone" dataKey="pv" stroke="#10b981" strokeWidth={2} dot={false} isAnimationActive={true} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 z-10 relative">
            <p className="text-sm text-slate-300 mb-3">Calories Burned</p>
            <div className="flex justify-between">
              <div>
                <p className="text-[10px] text-slate-500 mb-1">Latest</p>
                <p className="text-xs text-white font-semibold">{latestCals} <span className="text-[10px] font-normal text-slate-500">kcal</span></p>
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
            <p className="text-sm text-slate-500">Your last {Math.min(workouts.length, 3)} sessions</p>
          </div>

          <div className="space-y-3 flex-1">
            {workouts.length > 0 ? workouts.slice(0, 3).map((w, i) => {
              const pct = Math.min(100, Math.round(((w.caloriesBurned || 0) / 500) * 100));
              return (
                <div key={w._id || w.id || i} className="bg-[#12141a] border border-slate-800/50 rounded-2xl p-4 flex items-center justify-between hover:border-emerald-500/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1a1d24] flex flex-col items-center justify-center border border-slate-800 shrink-0">
                      <span className="text-sm font-bold text-white">{w.durationMinutes || 0}</span>
                      <span className="text-[9px] text-slate-400">Min</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">{w.name}</h4>
                      <p className="text-[11px] text-slate-500">{w.date}</p>
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 ${pct > 60 ? 'border-emerald-500/30 text-emerald-400' : 'border-slate-700 text-slate-400'}`}>
                    <span className="text-[10px] font-bold">{pct}%</span>
                  </div>
                </div>
              );
            }) : (
              <div className="text-center py-8">
                <p className="text-slate-500 text-sm mb-2">Aucun entraînement enregistré.</p>
                <Link to="/my-workouts" className="text-xs text-emerald-400 font-semibold hover:text-emerald-300">+ Ajouter une séance</Link>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Recommended Activity - full width */}
      <div className="bg-[#12141a] border border-slate-800/50 rounded-3xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-slate-200">Recommended activity</h3>
          {classes.length === 0 && <span className="text-xs text-slate-500">Aucun cours disponible</span>}
        </div>

        {classes.length > 0 ? (
          <div className="space-y-1">
            {classes.slice(0, 5).map((c, i) => (
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
                {i < Math.min(classes.length - 1, 4) && <div className="w-full h-px bg-slate-800/50 my-1"></div>}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-sm text-center py-6">No classes available. Ask your coach to add sessions!</p>
        )}
      </div>

    </div>
  );
}
