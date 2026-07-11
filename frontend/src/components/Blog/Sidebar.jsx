import React, { useState } from "react";

const CATEGORIES = [
  "Bodybuilding",
  "Boxing",
  "Crossfit",
  "Fitness",
  "Yoga",
];

const RECENT_NEWS = [
  {
    img: "/assets/blog-1.jpg",
    title: "The Best Fitness Workouts to Build Strong Bones",
    date: "Jan 10, 2024",
  },
  {
    img: "/assets/blog-3.jpg",
    title: "How to maximize your time in the gym",
    date: "Jan 05, 2024",
  },
  {
    img: "/assets/blog-4.jpg",
    title: "Advanced exercises for chest growth",
    date: "Dec 28, 2023",
  },
  {
    img: "/assets/blog-5.jpg",
    title: "Healthy eating habits for athletes",
    date: "Dec 15, 2023",
  },
];

function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = RECENT_NEWS.filter((news) =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full lg:w-1/3 flex flex-col gap-10">
      
      {/* Search */}
      <div className="bg-gray-200 dark:bg-[#111] p-8 transition-colors duration-300">
        <h3 className="text-black dark:text-white font-black uppercase tracking-widest text-lg mb-6 flex items-center gap-2">
          <div className="w-1 h-5 bg-orange-500"></div> Search
        </h3>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full bg-white dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 px-4 py-3 text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
          />
          <button className="absolute right-0 top-0 h-full px-4 text-gray-400 hover:text-orange-500 transition-colors">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-gray-200 dark:bg-[#111] p-8 transition-colors duration-300">
        <h3 className="text-black dark:text-white font-black uppercase tracking-widest text-lg mb-6 flex items-center gap-2">
          <div className="w-1 h-5 bg-orange-500"></div> Categories
        </h3>
        <ul className="flex flex-col gap-3">
          {CATEGORIES.map((cat, idx) => (
            <li key={idx}>
              <a
                href="#"
                className="flex justify-between items-center text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors text-sm uppercase tracking-wide py-2 border-b border-black/5 dark:border-white/5"
              >
                {cat}
                <i className="fa-solid fa-chevron-right text-[10px]"></i>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent News */}
      <div className="bg-gray-200 dark:bg-[#111] p-8 transition-colors duration-300">
        <h3 className="text-black dark:text-white font-black uppercase tracking-widest text-lg mb-6 flex items-center gap-2">
          <div className="w-1 h-5 bg-orange-500"></div> Recent News
        </h3>
        <div className="flex flex-col gap-5">
          {filteredNews.length > 0 ? (
            filteredNews.map((news, idx) => (
              <div key={idx} className="flex gap-4 group cursor-pointer">
                <img
                  src={news.img}
                  alt=""
                  className="w-20 h-20 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="flex flex-col justify-center">
                  <h4 className="text-black dark:text-white font-bold text-xs uppercase tracking-wider mb-2 leading-tight group-hover:text-orange-500 transition-colors">
                    {news.title}
                  </h4>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest">
                    {news.date}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm italic">No news found.</p>
          )}
        </div>
      </div>

    </div>
  );
}

export default Sidebar;
