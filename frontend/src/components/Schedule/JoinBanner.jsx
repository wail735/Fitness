import React from "react";

function JoinBanner() {
  return (
    <section className="bg-orange-500 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Text */}
        <div>
          <h3 className="text-white text-2xl font-black uppercase tracking-wide mb-1">
            Book Your Class Today
          </h3>
          <p className="text-orange-100 text-sm leading-relaxed max-w-md">
            Reserve your spot in any class and start your transformation. Limited
            spaces available — don't miss out!
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 shrink-0">
          <button className="bg-black text-white uppercase font-bold tracking-widest text-xs px-7 py-3.5 hover:bg-white hover:text-black transition-all duration-300">
            Book Now
          </button>
          <button className="border-2 border-white text-white uppercase font-bold tracking-widest text-xs px-7 py-3.5 hover:bg-white hover:text-orange-500 transition-all duration-300">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

export default JoinBanner;
