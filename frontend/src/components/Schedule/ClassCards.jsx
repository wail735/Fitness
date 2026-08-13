import React from "react";

const CLASSES = [
  {
    img: "/assets/class-1.jpg",
    title: "Exercise Gym 1",
    desc: "Push your body to its limit with our expert-led gym sessions, designed for strength and endurance training.",
  },
  {
    img: "/assets/class-2.jpg",
    title: "Swimming",
    desc: "Full-body low-impact workouts in the pool that build cardio fitness while being gentle on your joints.",
  },
  {
    img: "/assets/class-3.jpg",
    title: "Martial Art",
    desc: "Master discipline, focus, and self-defense skills in high-energy martial arts sessions led by certified instructors.",
  },
  {
    img: "/assets/class-4.jpg",
    title: "Classes Only For Kids",
    desc: "Fun, safe, and energetic fitness classes specially crafted to develop strength and coordination in children.",
  },
];

function ClassCards() {
  return (
    <section className="bg-gray-100 dark:bg-[#0c0c0c] py-20 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-black dark:text-white text-slate-900 text-4xl font-black uppercase tracking-tight mb-3">
            Our <span className="text-orange-500">Classes</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            Your enthusiasm and passion is what we look for when creating training programs
            to take your fitness and healthy living to the next level.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-orange-500" />
            <i className="fa-solid fa-dumbbell text-orange-500 text-xs" />
            <div className="w-8 h-px bg-orange-500" />
          </div>
        </div>

        {/* Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {CLASSES.map((cls, i) => (
            <div
              key={i}
              className="group relative overflow-hidden h-72 cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={cls.img}
                alt={cls.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Soft gradient at the bottom for text readability, keeping the image's original colors */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-500" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <h3 className="dark:text-white text-slate-900 font-black uppercase tracking-wide text-sm mb-2 group-hover:text-orange-400 transition-colors duration-300">
                  {cls.title}
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed mb-4 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400">
                  {cls.desc}
                </p>
                <button className="self-start border border-orange-500 text-orange-400 hover:bg-orange-500 hover:dark:text-white hover:text-slate-900 text-[10px] uppercase font-bold tracking-widest px-4 py-2 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClassCards;
