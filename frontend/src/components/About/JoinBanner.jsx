import React from "react";

function JoinBanner() {
  return (
    <section className="bg-orange-500 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Text */}
        <div>
          <h3 className="text-white text-2xl font-black uppercase tracking-wide mb-1">
            Get Started Today
          </h3>
          <p className="text-orange-100 text-sm leading-relaxed max-w-md">
            Join thousands of members who have transformed their lives. Start your
            fitness journey now and unlock your full potential.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 shrink-0">
          <button className="bg-black text-white uppercase font-bold tracking-widest text-xs px-7 py-3.5 hover:bg-white hover:text-black transition-all duration-300">
            Join Now
          </button>
          <button className="border-2 border-white text-white uppercase font-bold tracking-widest text-xs px-7 py-3.5 hover:bg-white hover:text-orange-500 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default JoinBanner;
