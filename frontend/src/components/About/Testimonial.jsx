import React from "react";

function Testimonial() {
  return (
    <section
      className="relative py-24 px-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/hero-3.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Stars */}
        <div className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <i key={i} className="fa-solid fa-star text-orange-500 text-lg"></i>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-white text-lg md:text-xl font-light leading-8 italic mb-8">
          "The Activitar Gym has given me a great foundation for the healthiest life
          I've ever had. Infinite thanks for sponsoring Activitar Fitness."
        </blockquote>

        {/* Author */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full border-2 border-orange-500 overflow-hidden">
            <img
              src="/assets/home-about.jpg"
              alt="Client"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white font-bold text-sm uppercase tracking-widest">
              Sarah Johnson
            </p>
            <p className="text-gray-400 text-xs tracking-wide">
              Member since 2022
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
