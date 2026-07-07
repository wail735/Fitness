import React from "react";

function Video() {
  return (
    <section className="relative w-full h-100 overflow-hidden flex flex-col items-center justify-center gap-6">

      <div className="absolute inset-0 bg-[url('/assets/video-bg.png')] bg-cover bg-center" />

      <div className="absolute inset-0 bg-red-900/70" />

      <h2 className="relative z-10 text-white text-2xl md:text-3xl font-black uppercase tracking-widest text-center px-4">
        Gym In Dowtown New York
      </h2>

      <button
        className="relative z-10 w-14 h-14 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label="Play video"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-800 ml-1"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>

    </section>
  );
}

export default Video;
