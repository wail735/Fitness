import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  UserCheck, Dumbbell, Users, Plus, Calendar,
  Loader2, TrendingUp, Zap, Star, ChevronRight,
  Activity, Award, BarChart3, Clock, LogOut
} from "lucide-react";
import api from "../../api/axiosConfig";

/* ─── Animated counter hook ──────────────────────────────────────────────── */
function useCounter(target, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
}

/* ─── Stat Card ──────────────────────────────────────────────────────────── */
function StatCard({ icon: Icon, label, value, color, delay = 0 }) {
  const count = useCounter(value);
  return (
    <div
      className="stat-card"
      style={{ animationDelay: `${delay}ms`, "--glow": color }}
    >
      <div className="stat-card-inner">
        <div className="stat-icon" style={{ background: `${color}22`, border: `1px solid ${color}44` }}>
          <Icon size={22} style={{ color }} />
        </div>
        <div className="stat-content">
          <span className="stat-label">{label}</span>
          <span className="stat-value" style={{ color }}>{count}</span>
        </div>
        <div className="stat-glow" style={{ background: color }} />
      </div>
    </div>
  );
}

/* ─── Member Card ─────────────────────────────────────────────────────────── */
function MemberCard({ member, index }) {
  const colors = ["#f59e0b", "#6366f1", "#10b981", "#f43f5e", "#3b82f6", "#8b5cf6"];
  const color = colors[index % colors.length];
  const initials = member.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="member-card" style={{ "--accent": color, animationDelay: `${index * 80}ms` }}>
      <div className="member-card-glow" style={{ background: color }} />
      <div className="member-card-body">
        <div className="member-avatar" style={{ background: `${color}22`, border: `2px solid ${color}55` }}>
          <span style={{ color }}>{initials}</span>
        </div>
        <div className="member-info">
          <h4 className="member-name">{member.name}</h4>
          <p className="member-email">{member.email}</p>
          <div className="member-stats">
            <span><Activity size={11} /> {member.workoutsCount} séances</span>
            <span><Calendar size={11} /> {member.bookingsCount} réservations</span>
          </div>
        </div>
        <div className="member-badge">Actif</div>
      </div>
      <div className="member-footer">
        <span className="member-date">
          <Clock size={10} />
          Inscrit le {new Date(member.createdAt).toLocaleDateString("fr-FR")}
        </span>
        <ChevronRight size={14} className="member-arrow" />
      </div>
    </div>
  );
}

/* ─── Routine Card ────────────────────────────────────────────────────────── */
function RoutineCard({ routine, index }) {
  const levels = {
    Débutant: { color: "#10b981", icon: "🌱" },
    Intermédiaire: { color: "#f59e0b", icon: "⚡" },
    Avancé: { color: "#f43f5e", icon: "🔥" },
  };
  const lvl = levels[routine.target] || { color: "#6366f1", icon: "💪" };

  return (
    <div className="routine-card" style={{ "--accent": lvl.color, animationDelay: `${index * 100}ms` }}>
      <div className="routine-accent-bar" style={{ background: `linear-gradient(180deg, ${lvl.color}, transparent)` }} />
      <div className="routine-content">
        <span className="routine-icon">{lvl.icon}</span>
        <div>
          <h4 className="routine-title">{routine.title}</h4>
          <div className="routine-meta">
            <span className="routine-level" style={{ color: lvl.color, borderColor: `${lvl.color}44`, background: `${lvl.color}11` }}>
              {routine.target}
            </span>
            <span className="routine-exercises">
              <Dumbbell size={11} /> {routine.exercisesCount} exercices
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Dashboard ──────────────────────────────────────────────────────── */
export default function CoachDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [members, setMembers]   = useState([]);
  const [routines, setRoutines] = useState([]);
  const [stats, setStats]       = useState({ totalMembers: 0, totalRoutines: 0, totalBookings: 0 });
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [mRes, rRes, sRes] = await Promise.all([
          api.get("/coach/members"),
          api.get("/coach/routines"),
          api.get("/coach/stats"),
        ]);
        setMembers(mRes.data);
        setRoutines(rRes.data);
        setStats(sRes.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="coach-loading">
        <div className="coach-loading-inner">
          <div className="coach-loading-ring" />
          <span>Chargement du tableau de bord…</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        /* ── Base ── */
        .coach-db {
          min-height: 100vh;
          background: #020409;
          background-image:
            radial-gradient(ellipse 80% 50% at 50% -20%, #f59e0b14 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 80%, #6366f10a 0%, transparent 60%);
          font-family: 'Inter', sans-serif;
          padding: 2.5rem 1rem 4rem;
          color: #fff;
        }
        .coach-wrap { max-width: 1200px; margin: 0 auto; }

        /* ── Header ── */
        .coach-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
          animation: fadeDown .6s ease both;
        }
        .coach-header-left {}
        .coach-badge {
          display: inline-flex;
          align-items: center;
          gap: .4rem;
          font-size: .65rem;
          font-weight: 800;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #f59e0b;
          background: #f59e0b12;
          border: 1px solid #f59e0b30;
          padding: .3rem .75rem;
          border-radius: 999px;
          margin-bottom: .75rem;
        }
        .coach-title {
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -.02em;
          background: linear-gradient(135deg, #fff 40%, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 .4rem;
        }
        .coach-subtitle { font-size: .9rem; color: #64748b; }
        .coach-subtitle strong { color: #f59e0b; }

        .coach-cta {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #000;
          font-weight: 800;
          font-size: .85rem;
          padding: .75rem 1.5rem;
          border-radius: 14px;
          text-decoration: none;
          box-shadow: 0 0 30px #f59e0b40;
          transition: all .25s;
          white-space: nowrap;
        }
        .coach-cta:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 0 50px #f59e0b60;
        }

        /* ── Stats ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .stat-card {
          animation: fadeUp .5s ease both;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
        }
        .stat-card-inner {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.4rem 1.5rem;
          background: rgba(255,255,255,.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          transition: border-color .3s, transform .3s;
        }
        .stat-card:hover .stat-card-inner {
          border-color: var(--glow, #f59e0b)44;
          transform: translateY(-3px);
        }
        .stat-icon {
          width: 48px; height: 48px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .stat-label {
          display: block;
          font-size: .65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .1em;
          color: #475569;
          margin-bottom: .25rem;
        }
        .stat-value {
          display: block;
          font-size: 2.4rem;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -.03em;
        }
        .stat-glow {
          position: absolute;
          right: -20px; bottom: -20px;
          width: 80px; height: 80px;
          border-radius: 50%;
          opacity: .06;
          filter: blur(20px);
        }

        /* ── Section ── */
        .section {
          background: rgba(255,255,255,.025);
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 24px;
          padding: 1.75rem 2rem;
          margin-bottom: 1.5rem;
          animation: fadeUp .6s ease both;
          backdrop-filter: blur(8px);
        }
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: .75rem;
        }
        .section-title {
          display: flex;
          align-items: center;
          gap: .65rem;
          font-size: 1.1rem;
          font-weight: 800;
          color: #f1f5f9;
        }
        .section-title svg { color: #f59e0b; }
        .section-count {
          font-size: .72rem;
          color: #475569;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.08);
          padding: .3rem .8rem;
          border-radius: 999px;
          font-weight: 600;
        }

        /* ── Member Cards ── */
        .members-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }
        .member-card {
          position: relative;
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 18px;
          overflow: hidden;
          transition: all .3s;
          animation: fadeUp .5s ease both;
          cursor: default;
        }
        .member-card:hover {
          border-color: var(--accent, #f59e0b)55;
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0,0,0,.4), 0 0 30px var(--accent, #f59e0b)15;
        }
        .member-card-glow {
          position: absolute;
          top: -30px; right: -30px;
          width: 100px; height: 100px;
          border-radius: 50%;
          opacity: .05;
          filter: blur(30px);
          pointer-events: none;
        }
        .member-card-body {
          display: flex;
          align-items: flex-start;
          gap: .9rem;
          padding: 1.1rem 1.2rem .8rem;
          position: relative;
        }
        .member-avatar {
          width: 46px; height: 46px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          font-weight: 900;
          flex-shrink: 0;
        }
        .member-info { flex: 1; min-width: 0; }
        .member-name {
          font-size: .95rem;
          font-weight: 800;
          color: #f1f5f9;
          margin: 0 0 .2rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .member-email {
          font-size: .7rem;
          color: #475569;
          margin: 0 0 .5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .member-stats {
          display: flex;
          gap: .75rem;
          flex-wrap: wrap;
        }
        .member-stats span {
          display: inline-flex;
          align-items: center;
          gap: .25rem;
          font-size: .65rem;
          color: #64748b;
          font-weight: 600;
        }
        .member-badge {
          font-size: .6rem;
          font-weight: 800;
          letter-spacing: .05em;
          text-transform: uppercase;
          background: #10b98115;
          color: #10b981;
          border: 1px solid #10b98133;
          padding: .2rem .6rem;
          border-radius: 999px;
          white-space: nowrap;
        }
        .member-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: .6rem 1.2rem;
          border-top: 1px solid rgba(255,255,255,.04);
          background: rgba(255,255,255,.015);
        }
        .member-date {
          display: flex;
          align-items: center;
          gap: .3rem;
          font-size: .65rem;
          color: #334155;
        }
        .member-arrow { color: #334155; transition: transform .2s, color .2s; }
        .member-card:hover .member-arrow { transform: translateX(3px); color: var(--accent, #f59e0b); }

        /* ── Routine Cards ── */
        .routines-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1rem;
        }
        .routine-card {
          position: relative;
          display: flex;
          align-items: stretch;
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 16px;
          overflow: hidden;
          transition: all .3s;
          animation: fadeUp .5s ease both;
        }
        .routine-card:hover {
          border-color: var(--accent, #f59e0b)44;
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0,0,0,.3);
        }
        .routine-accent-bar {
          width: 4px;
          flex-shrink: 0;
          border-radius: 4px 0 0 4px;
        }
        .routine-content {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.1rem 1.2rem;
        }
        .routine-icon { font-size: 1.6rem; }
        .routine-title {
          font-size: .95rem;
          font-weight: 800;
          color: #f1f5f9;
          margin: 0 0 .5rem;
        }
        .routine-meta { display: flex; align-items: center; gap: .6rem; flex-wrap: wrap; }
        .routine-level {
          font-size: .65rem;
          font-weight: 700;
          padding: .2rem .6rem;
          border-radius: 999px;
          border: 1px solid;
        }
        .routine-exercises {
          display: inline-flex;
          align-items: center;
          gap: .3rem;
          font-size: .7rem;
          color: #475569;
        }

        /* ── Empty States ── */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
          color: #334155;
          gap: .75rem;
        }
        .empty-state svg { opacity: .3; }
        .empty-state p { font-size: .9rem; }
        .empty-state a { color: #f59e0b; text-decoration: underline; }

        /* ── Loading ── */
        .coach-loading {
          min-height: 100vh;
          background: #020409;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .coach-loading-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: #475569;
          font-size: .9rem;
        }
        .coach-loading-ring {
          width: 48px; height: 48px;
          border: 3px solid #f59e0b30;
          border-top-color: #f59e0b;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        /* ── Animations ── */
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="coach-db">
        <div className="coach-wrap">

          {/* ── Header ── */}
          <div className="coach-header">
            <div className="coach-header-left">
              <div className="coach-badge">
                <Zap size={11} /> Espace Entraîneur
              </div>
              <h1 className="coach-title">Tableau de Bord Coach</h1>
              <p className="coach-subtitle">
                Bienvenue, <strong>{user?.name || "Coach"}</strong> — gérez vos membres et créez des programmes sur-mesure.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/coach/builder" className="coach-cta">
                <Plus size={16} /> Créer un Programme
              </Link>
              <button 
                onClick={() => { logout(); navigate("/"); }} 
                className="coach-cta" 
                style={{ background: "rgba(255,255,255,0.05)", color: "#fff", boxShadow: "none", border: "1px solid rgba(255,255,255,0.1)" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#ef4444"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
              >
                <LogOut size={16} /> Déconnexion
              </button>
            </div>
          </div>

          {/* ── Stats ── */}
          <div className="stats-grid">
            <StatCard icon={Users}    label="Membres Inscrits"     value={stats.totalMembers}  color="#f59e0b" delay={0}   />
            <StatCard icon={Dumbbell} label="Programmes Créés"     value={stats.totalRoutines} color="#6366f1" delay={100} />
            <StatCard icon={Calendar} label="Réservations Totales" value={stats.totalBookings} color="#10b981" delay={200} />
          </div>

          {/* ── Members ── */}
          <div className="section" style={{ animationDelay: "200ms" }}>
            <div className="section-header">
              <div className="section-title">
                <Users size={20} /> Membres Inscrits
              </div>
              <span className="section-count">
                {members.length} membre{members.length !== 1 ? "s" : ""}
              </span>
            </div>

            {members.length === 0 ? (
              <div className="empty-state">
                <Users size={40} />
                <p>Aucun membre inscrit pour l'instant.</p>
              </div>
            ) : (
              <div className="members-grid">
                {members.map((m, i) => (
                  <MemberCard key={m._id} member={m} index={i} />
                ))}
              </div>
            )}
          </div>

          {/* ── Routines ── */}
          <div className="section" style={{ animationDelay: "300ms" }}>
            <div className="section-header">
              <div className="section-title">
                <Dumbbell size={20} /> Programmes Disponibles
              </div>
              <span className="section-count">
                {routines.length} programme{routines.length !== 1 ? "s" : ""}
              </span>
            </div>

            {routines.length === 0 ? (
              <div className="empty-state">
                <Dumbbell size={40} />
                <p>Aucun programme.{" "}
                  <Link to="/coach/builder">Créer le premier</Link>
                </p>
              </div>
            ) : (
              <div className="routines-grid">
                {routines.map((r, i) => (
                  <RoutineCard key={r._id || r.id} routine={r} index={i} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
