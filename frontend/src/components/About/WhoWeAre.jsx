import React from "react";

const ABOUT_FEATURES = [
  {
    icon: "fa-solid fa-bullseye",
    title: "About Us",
    desc: "Many training programs work because of their rigor and regimen. As our understanding of strength and conditioning has grown, training programs have become more specialized. Our gym provides elite coaching for every member, whether you're a beginner or advanced athlete. We believe in personalized attention and scientific methods to help you reach your full potential.",
  },
  {
    icon: "fa-solid fa-trophy",
    title: "Our Quality",
    desc: "We are committed to delivering the highest quality fitness experience. Our state-of-the-art equipment, certified personal trainers, and science-backed programs ensure that every session counts. We regularly update our facilities and training methodologies to stay ahead of the curve. Your success is our success, and we never compromise on quality.",
  },
];

function WhoWeAre() {
  return (
    <section className="bg-white dark:bg-[#151515] py-20 px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-black dark:text-white text-4xl font-black uppercase tracking-tight mb-3">
            Who We <span className="text-orange-500">Are</span> &amp; What We{" "}
            <span className="text-orange-500">Do</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            We are a team of passionate fitness experts dedicated to transforming lives
            through health, strength, and community.
          </p>
        </div>

        {/* Image */}
        <div className="w-full mb-12 overflow-hidden relative">
          <img
            src="/assets/hero-2.jpg"
            alt="Training session"
            className="w-full h-80 object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {ABOUT_FEATURES.map((item) => (
            <div key={item.title} className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 flex items-center justify-center bg-orange-500/10 border border-orange-500/30 text-orange-500 rounded">
                  <i className={`${item.icon} text-sm`}></i>
                </div>
                <h3 className="text-black dark:text-white font-black uppercase tracking-widest text-sm group-hover:text-orange-400 transition-colors duration-300">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-7">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhoWeAre;
