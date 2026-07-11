import React, { useState } from "react";

const FILTERS = [
  { id: "all",      label: "All Classes" },
  { id: "crossfit", label: "Crossfit" },
  { id: "females",  label: "Females" },
  { id: "gym",      label: "Gym" },
];

const PHOTOS = [
  { id: 1, src: "/assets/blog-1.jpg",          cat: "females",  span: "" },
  { id: 2, src: "/assets/class-1.jpg",         cat: "crossfit", span: "" },
  { id: 3, src: "/assets/blog-3.jpg",          cat: "gym",      span: "" },
  { id: 4, src: "/assets/blog-4.jpg",          cat: "crossfit", span: "" },
  { id: 5, src: "/assets/blog-5.jpg",          cat: "females",  span: "" },
  { id: 6, src: "/assets/home-about.jpg",      cat: "gym",      span: "" },
  { id: 7, src: "/assets/feature-2.jpg",       cat: "crossfit", span: "" },
  { id: 8, src: "/assets/class-2.jpg",         cat: "gym",      span: "" },
  { id: 9, src: "/assets/blog-2.png",          cat: "females",  span: "" },
];

function GalleryGrid() {
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === "all" ? PHOTOS : PHOTOS.filter((p) => p.cat === active);

  return (
    <section className="bg-gray-100 dark:bg-[#151515] py-20 px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`px-6 py-2 text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
                active === f.id
                  ? "bg-orange-500 border-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                  : "border-black/15 dark:border-white/15 text-gray-600 dark:text-gray-400 hover:border-orange-500 hover:text-orange-400 bg-transparent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-3 auto-rows-[200px]">
          {filtered.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setLightbox(photo.src)}
              className={`group relative overflow-hidden cursor-pointer ${photo.span}`}
            >
              <img
                src={photo.src}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 transition-all duration-400 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                  <div className="w-10 h-10 border-2 border-orange-500 flex items-center justify-center text-orange-400">
                    <i className="fa-solid fa-magnifying-glass-plus text-sm"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-8 text-white text-3xl hover:text-orange-400 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-w-4xl max-h-[85vh] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

export default GalleryGrid;
