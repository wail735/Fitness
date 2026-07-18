import Features from "./features";
import React, { useState, useEffect } from "react";
import Welcome from "./Welcome";
import Programm from "./Programm";
import Table from "./Table";
import { PricingSimpleIcon } from "./PlansPricing";
import People from "./People";
import Blog from "./Blog";
import Video from "./video";
import Map from "./Map";
const SLIDES_DATA = [
  {
    image: "/assets/hero-1.jpg",
    subtitle: "Join Us Now",
    title: "Fitness & Sport",
    btnText: "Read More",
  },
  {
    image: "/assets/hero-2.jpg",
    subtitle: "Push Your Limits",
    title: "Build Your Body",
    btnText: "Join Today",
  },
  {
    image: "/assets/hero-3.jpg",
    subtitle: "No Excuses",
    title: "Train Like A Pro",
    btnText: "Discover",
  },
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? SLIDES_DATA.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === SLIDES_DATA.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="relative min-h-screen flex flex-col group overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out z-0"
          style={{ backgroundImage: `url(${SLIDES_DATA[currentIndex].image})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay pointer-events-none"></div>
        </div>

        <div
          key={currentIndex}
          className="relative z-10 flex flex-col justify-center items-center text-center grow text-white px-4 sm:px-10 w-full animate-[fadeIn_0.5s_ease-in-out] pt-20"
        >
          <p className="text-white text-sm sm:text-lg lg:text-2xl uppercase tracking-[0.2em] mb-2 sm:mb-4 drop-shadow-md">
            {SLIDES_DATA[currentIndex].subtitle}
          </p>

          <h1 className="text-4xl sm:text-6xl lg:text-[80px] font-extrabold mb-6 sm:mb-8 uppercase tracking-tight leading-tight drop-shadow-lg max-w-4xl">
            {SLIDES_DATA[currentIndex].title}
          </h1>

          <button className="border-2 border-red-500 hover:bg-red-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.8)]">
            {SLIDES_DATA[currentIndex].btnText}
          </button>
        </div>

        <button
          onClick={prevSlide}
          className="hidden sm:flex absolute top-1/2 left-4 lg:left-8 -translate-y-1/2 w-12 h-12 items-center justify-center text-3xl text-white/50 hover:text-white transition-colors z-20"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <button
          onClick={nextSlide}
          className="hidden sm:flex absolute top-1/2 right-4 lg:right-8 -translate-y-1/2 w-12 h-12 items-center justify-center text-3xl text-white/50 hover:text-white transition-colors z-20"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        <div className="absolute bottom-6 lg:bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
          {SLIDES_DATA.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-white scale-125"
                  : "bg-transparent border-2 border-white/50 hover:border-white"
              }`}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </section>
      <Features />
      <Welcome />
      <Programm />
      <Table />
      <PricingSimpleIcon />
      <People />
      <Blog />
      <Video />
      <Map />
    </>
  );
}

export default Hero;
