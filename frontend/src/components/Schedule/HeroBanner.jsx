import React from "react";

function HeroBanner() {
  return (
    <section
      className="relative h-64 flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/hero-1.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 text-center">
        <h1 className="text-white text-5xl font-black uppercase tracking-widest drop-shadow-lg mb-2">
          Schedule & <span className="text-orange-500">Classes</span>
        </h1>
        <p className="text-gray-300 text-sm tracking-[0.2em] uppercase">
          <span className="text-orange-400">Home</span> / Schedule & Classes
        </p>
      </div>
    </section>
  );
}

export default HeroBanner;
