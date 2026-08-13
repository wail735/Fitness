import React from "react";

const CLASSES = [
  {
    icon: "fa-solid fa-fire",
    title: "CrossFit WOD",
    desc: "High-intensity functional movements combining gymnastics, weightlifting, and cardio. Burn calories and build total-body strength.",
    duration: "60 min",
    level: "All Levels",
    color: "orange",
  },
  {
    icon: "fa-solid fa-hand-fist",
    title: "Boxing",
    desc: "Learn proper technique while burning serious calories. Build coordination, speed, and mental toughness in every session.",
    duration: "60 min",
    level: "Beginner – Advanced",
    color: "red",
  },
  {
    icon: "fa-solid fa-person-biking",
    title: "Indoor Cycling",
    desc: "Push your cardio to the limit with high-energy ride sessions. Perfect for improving endurance and burning maximum calories.",
    duration: "45 min",
    level: "All Levels",
    color: "blue",
  },
  {
    icon: "fa-solid fa-spa",
    title: "Yoga",
    desc: "Improve flexibility, balance, and mental clarity through guided poses and breathing exercises. All experience levels welcome.",
    duration: "60 min",
    level: "Beginner – Intermediate",
    color: "purple",
  },
  {
    icon: "fa-solid fa-leaf",
    title: "Pilates",
    desc: "Core-focused workouts that lengthen and strengthen muscles. Perfect for improving posture and preventing injuries.",
    duration: "50 min",
    level: "Beginner – Intermediate",
    color: "green",
  },
  {
    icon: "fa-solid fa-dumbbell",
    title: "Strength Training",
    desc: "Progressive overload programs designed to maximize muscle growth and functional strength with proper form guidance.",
    duration: "75 min",
    level: "Intermediate – Advanced",
    color: "orange",
  },
];

const BORDER_MAP = {
  orange: "border-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]",
  red:    "border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]",
  blue:   "border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]",
  purple: "border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]",
  green:  "border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]",
};

const ICON_MAP = {
  orange: "bg-orange-500/10 text-orange-500",
  red:    "bg-red-500/10 text-red-500",
  blue:   "bg-blue-500/10 text-blue-500",
  purple: "bg-purple-500/10 text-purple-500",
  green:  "bg-green-500/10 text-green-500",
};

const BADGE_MAP = {
  orange: "text-orange-400 bg-orange-500/10 border border-orange-500/20",
  red:    "text-red-400 bg-red-500/10 border border-red-500/20",
  blue:   "text-blue-400 bg-blue-500/10 border border-blue-500/20",
  purple: "text-purple-400 bg-purple-500/10 border border-purple-500/20",
  green:  "text-green-400 bg-green-500/10 border border-green-500/20",
};

function ClassTypes() {
  return (
    <section className="bg-gray-100 dark:bg-[#0c0c0c] py-20 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-black dark:text-white text-slate-900 text-4xl font-black uppercase tracking-tight mb-3">
            Our <span className="text-orange-500">Classes</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            Expert-led classes designed to push your limits and transform your body.
          </p>
        </div>

        {/* Decorative line */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-orange-500" />
            <i className="fa-solid fa-dumbbell text-orange-500 text-xs" />
            <div className="w-8 h-px bg-orange-500" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLASSES.map((cls) => (
            <div
              key={cls.title}
              className={`group bg-gray-200 dark:bg-[#151515] border-t-2 p-6 transition-all duration-300 cursor-pointer hover:-translate-y-1 ${BORDER_MAP[cls.color]}`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 flex items-center justify-center mb-5 rounded-sm ${ICON_MAP[cls.color]}`}>
                <i className={`${cls.icon} text-xl`}></i>
              </div>

              {/* Title */}
              <h3 className="text-black dark:text-white text-slate-900 font-black uppercase tracking-widest text-sm mb-3 group-hover:text-orange-400 transition-colors duration-300">
                {cls.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-7 mb-5">{cls.desc}</p>

              {/* Badges */}
              <div className="flex gap-2 flex-wrap">
                <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm font-semibold ${BADGE_MAP[cls.color]}`}>
                  <i className="fa-solid fa-clock mr-1"></i> {cls.duration}
                </span>
                <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm font-semibold text-gray-600 dark:text-gray-400 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                  <i className="fa-solid fa-signal mr-1"></i> {cls.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClassTypes;
