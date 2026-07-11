import React from "react";

function Blog() {
  return (
    <section className="bg-gray-100 dark:bg-[#111] py-16 px-4 transition-colors duration-300">

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-black dark:text-white text-4xl md:text-5xl font-black uppercase tracking-tight mb-3">
          From Our Blog
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          List of all news and events that take place related to us
        </p>
      </div>

     
      <div className="max-w-6xl mx-auto grid grid-cols-1 auto-rows-[240px] md:grid-cols-6 md:auto-rows-[160px] gap-3">

        <div className="md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-2 relative overflow-hidden group cursor-pointer">
          <img
            src="/assets/blog-1.jpg"
            alt="blog"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5">
            <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-1">
              Gym &amp; Croosfit
            </p>
            <h3 className="text-white text-sm font-bold leading-snug">
              Many people sign up for affiliate programs
            </h3>
          </div>
        </div>

        <div className="md:col-start-3 md:col-span-2 md:row-start-1 md:row-span-1 bg-orange-600 p-5 flex flex-col justify-between cursor-pointer hover:bg-orange-500 transition-colors duration-300">
          <div className="flex items-center justify-between">
            <p className="text-white text-[10px] font-bold uppercase tracking-widest">
              Gym &amp; Croosfit
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
            </svg>
          </div>
          <h3 className="text-white text-sm font-black uppercase leading-snug">
            Follow our classes gyming on Instagram # Bodybuilding # Photo
          </h3>
        </div>

        {/* ── blog-4 : col 5-6, row 1-2 ── */}
        <div className="md:col-start-5 md:col-span-2 md:row-start-1 md:row-span-2 relative overflow-hidden group cursor-pointer">
          <img
            src="/assets/blog-4.jpg"
            alt="blog"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5">
            <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-1">
              Gym &amp; Croosfit
            </p>
            <h3 className="text-white text-sm font-bold leading-snug">
              Does Hydroderm Work
            </h3>
          </div>
        </div>

        <div className="md:col-start-1 md:col-span-2 md:row-start-3 md:row-span-2 relative overflow-hidden group cursor-pointer">
          <img
            src="/assets/blog-5.jpg"
            alt="blog"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5">
            <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-1">
              Gym &amp; Croosfit
            </p>
            <h3 className="text-white text-sm font-bold leading-snug">
              Your Antibiotic One Day To 10 Day Options
            </h3>
          </div>
        </div>

        <div className="md:col-start-3 md:col-span-2 md:row-start-2 md:row-span-3 relative overflow-hidden group cursor-pointer">
          <img
            src="/assets/blog-3.jpg"
            alt="blog"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5">
            <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-1">
              Gym &amp; Croosfit
            </p>
            <h3 className="text-white text-sm font-bold leading-snug">
              Many people sign up for affiliate programs
            </h3>
          </div>
        </div>

        {/* ── rope + play : col 5-6, row 3-4 ── */}
        <div className="md:col-start-5 md:col-span-2 md:row-start-3 md:row-span-2 relative overflow-hidden group cursor-pointer">
          <img
            src="/assets/blog-2.png"
            alt="blog"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/50" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-800 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 p-5">
            <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-1">
              Gym &amp; Croosfit
            </p>
            <h3 className="text-white text-sm font-bold leading-snug">
              Many people sign up for affiliate programs
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Blog;
