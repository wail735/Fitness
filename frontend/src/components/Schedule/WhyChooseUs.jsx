import React from "react";

const FEATURES = [
  {
    id: 1,
    img: "/assets/chose-icon-1.png",
    title: "Support 24/24",
    desc: "One of the best ways to make a great vacation quickly horrible is to choose the wrong accommodations for your trip.",
  },
  {
    id: 2,
    img: "/assets/chose-icon-2.png",
    title: "Our Trainer",
    desc: "If you are an infrequent traveler you may need some tips to keep the wife happy while you are jet setting around the globe.",
  },
  {
    id: 3,
    img: "/assets/chose-icon-3.png",
    title: "Personalized Sessions",
    desc: "To succeed at any endeavor, you must stay the course…no matter what the cost! Here are some surefire tips to help you on your journey.",
  },
  {
    id: 4,
    img: "/assets/chose-icon-4.png",
    title: "Our Equipment",
    desc: "Rugby and Stratford-upon-Avon. Additionally, there are many things to see and do in and around Coventry itself.",
  },
  {
    id: 5,
    img: "/assets/chose-icon-5.png",
    title: "Classes Daily",
    desc: "We would just not have the will in us to go about our daily lives. Its motivation that helps us get through the most mundane.",
  },
  {
    id: 6,
    img: "/assets/chose-icon-6.png",
    title: "Focus on Your Health",
    desc: "But there is only so far we can go within the constraints of a family budget in building the perfect telescopic operation.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-white dark:bg-[#151515] py-20 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-black dark:text-white text-4xl font-black uppercase tracking-tight mb-3">
            Why People <span className="text-orange-500">Choose Us</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            Our sport experts and latest sports equipment are the winning combination.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-orange-500" />
            <i className="fa-solid fa-dumbbell text-orange-500 text-xs" />
            <div className="w-8 h-px bg-orange-500" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((f) => (
            <div
              key={f.id}
              className="group flex flex-col items-center md:items-start gap-4 border-t border-black/10 dark:border-white/10 pt-6 hover:border-orange-500 transition-colors duration-300"
            >
              <img
                src={f.img}
                alt={f.title}
                className="w-12 h-12 object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
              />
              <h3 className="text-black dark:text-white text-sm font-black uppercase tracking-widest text-center md:text-left group-hover:text-orange-500 transition-colors duration-300">
                {f.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-500 text-sm leading-relaxed text-center md:text-left group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors duration-300">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
