import React from "react";

const RELATED_NEWS = [
  {
    img: "/assets/feature-1.jpg",
    title: "Photography studio for affiliate members",
    date: "Jan 10, 2024",
  },
  {
    img: "/assets/feature-2.jpg",
    title: "Photography studio for affiliate members",
    date: "Jan 05, 2024",
  },
  {
    img: "/assets/feature-3.jpg",
    title: "Photography studio for affiliate members",
    date: "Dec 28, 2023",
  },
];

function RelatedNews() {
  return (
    <div className="mt-16">
      <h3 className="text-black dark:text-white text-slate-900 font-black uppercase tracking-widest text-xl mb-8 flex items-center gap-2">
        <div className="w-1 h-6 bg-orange-500"></div> Related News
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {RELATED_NEWS.map((news, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="overflow-hidden mb-4 relative h-40">
              <img
                src={news.img}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500"></div>
            </div>
            <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-1">
              {news.date}
            </p>
            <h4 className="text-black dark:text-white text-slate-900 font-bold text-sm uppercase tracking-wider group-hover:text-orange-400 transition-colors">
              {news.title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedNews;
