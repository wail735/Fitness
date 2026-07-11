import React from "react";

function HeroBanner() {
  return (
    <section
      className="relative h-[400px] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/hero-2.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 text-center max-w-4xl px-4">
        <h1 className="text-white text-3xl md:text-5xl font-black uppercase tracking-widest drop-shadow-lg mb-4 leading-snug">
          A CLOSER LOOK AT OUR FRONT PORCH ITEMS FROM LION'S
        </h1>
        <p className="text-gray-300 text-sm tracking-widest uppercase flex items-center justify-center gap-4">
          <span className="text-orange-500">
            <i className="fa-regular fa-user mr-2"></i>Admin
          </span>
          <span>|</span>
          <span>
            <i className="fa-regular fa-calendar mr-2"></i>January 20, 2024
          </span>
          <span>|</span>
          <span>
            <i className="fa-regular fa-comment mr-2"></i>05 Comments
          </span>
        </p>
      </div>
    </section>
  );
}

export default HeroBanner;
