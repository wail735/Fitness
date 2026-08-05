import React, { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import { useFitness } from "../../context/FitnessContext";
import { Link } from "react-router-dom";
import { Users, Calendar, DollarSign, TrendingUp, Plus, ShieldCheck } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area, CartesianGrid } from "recharts";

export default function Dashboard() {
  const { classes } = useFitness();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/admin/stats");
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      }
    };
    fetchStats();
  }, []);

  const totalCapacity = classes.reduce((sum, c) => sum + c.capacity, 0);
  const totalBooked = classes.reduce((sum, c) => sum + c.booked, 0);

  const membersCount = stats?.totalUsers || 0;
  const bookingsCount = stats?.totalBookings || totalBooked;
  const occRate = stats?.occupancyRate || (totalCapacity > 0 ? Math.round((totalBooked / totalCapacity) * 100) : 0);
  const revenue = stats?.monthlyRevenue || 0;

  const chartData = stats?.classesPopularity?.map((c) => ({
    name: c.name.length > 12 ? `${c.name.substring(0, 12)}...` : c.name,
    reservations: c.booked,
    capacity: c.capacity,
  })) || classes.map((c) => ({
    name: c.name.length > 12 ? `${c.name.substring(0, 12)}...` : c.name,
    reservations: c.booked,
    capacity: c.capacity,
  }));

  const userGrowthData = stats?.userGrowth || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-red-500" /> Administration - Vue d'Ensemble
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Indicateurs de performance, réservations de cours et fréquentation du club.
          </p>
        </div>
        <Link
          to="/admin/schedule"
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-red-600/20 transition-all"
        >
          <Plus className="w-4 h-4" /> Gérer le Planning
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Membres Actifs</span>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-white">{membersCount}</div>
          <div className="text-[10px] text-emerald-400 mt-1 font-semibold">Inscrits au total</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Réservations Totales</span>
            <Calendar className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-3xl font-black text-white">{bookingsCount}</div>
          <div className="text-[10px] text-slate-400 mt-1">Toutes sessions confondues</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Taux d'Occupation</span>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">{occRate} %</div>
          <div className="text-[10px] text-slate-400 mt-1">En moyenne</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Chiffre d'Affaires Mensuel</span>
            <DollarSign className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400">{revenue} €</div>
          <div className="text-[10px] text-emerald-400 mt-1 font-semibold">Basé sur les abonnements</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart: Reservations per class */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-white">Réservations par Cours Collectif</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff" }} cursor={{ fill: "#1e293b" }} />
                <Bar dataKey="reservations" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart: User Growth */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-white">Évolution des Membres</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff" }} />
                <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Class Details Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-lg font-bold text-white">Liste des Créneaux du Club</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-slate-500 uppercase bg-slate-950/60 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Cours</th>
                <th className="py-3 px-4">Jour & Horaires</th>
                <th className="py-3 px-4">Entraîneur</th>
                <th className="py-3 px-4">Inscrits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {classes.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{c.name}</td>
                  <td className="py-3.5 px-4 text-slate-400">{c.day} • {c.time}</td>
                  <td className="py-3.5 px-4">{c.trainer}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-red-400">{c.booked}</span> / {c.capacity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
