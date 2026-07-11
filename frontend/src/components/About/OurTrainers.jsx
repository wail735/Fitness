import React from "react";

const TRAINERS = [
  {
    id: 1,
    img: "/assets/feature-1.jpg",
    name: "Alex Taylor",
    role: "Head Coach",
  },
  {
    id: 2,
    img: "/assets/feature-2.jpg",
    name: "Marcus Reid",
    role: "Strength Coach",
  },
  {
    id: 3,
    img: "/assets/feature-3.jpg",
    name: "Jordan Smith",
    role: "Cardio Expert",
  },
  {
    id: 4,
    img: "/assets/class-1.jpg",
    name: "Lara Voss",
    role: "Yoga & Flexibility",
  },
];

const SOCIAL_ICONS = ["fa-facebook", "fa-instagram", "fa-twitter", "fa-youtube"];

function OurTrainers() {
  return (
    <section className="bg-gray-100 dark:bg-[#0c0c0c] py-20 px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-black dark:text-white text-4xl font-black uppercase tracking-tight mb-3">
            Our <span className="text-orange-500">Trainers</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            The Best Fitness workout to Shape your body and feel Confident
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

        {/* Trainers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TRAINERS.map((trainer) => (
            <div
              key={trainer.id}
              className="group relative overflow-hidden bg-gray-200 dark:bg-[#1a1a1a] cursor-pointer"
            >
              {/* Image */}
              <div className="overflow-hidden h-52 md:h-60">
                <img
                  src={trainer.img}
                  alt={trainer.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Social overlay */}
              <div className="absolute inset-0 bg-orange-500/80 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                {SOCIAL_ICONS.map((icon) => (
                  <a
                    key={icon}
                    href="#"
                    className="w-8 h-8 flex items-center justify-center border border-white text-white hover:bg-white hover:text-orange-500 transition-all duration-200 text-sm"
                  >
                    <i className={`fa-brands ${icon}`}></i>
                  </a>
                ))}
              </div>

              {/* Info */}
              <div className="bg-gray-200 dark:bg-[#1c1c1c] py-3 px-4 border-t border-black/10 dark:border-white/10 group-hover:border-orange-500 transition-colors duration-300">
                <p className="text-black dark:text-white font-bold text-sm uppercase tracking-wide">
                  {trainer.name}
                </p>
                <p className="text-orange-400 text-xs tracking-widest mt-0.5">
                  {trainer.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurTrainers;
