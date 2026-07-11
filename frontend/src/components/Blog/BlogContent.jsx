import React from "react";
import RelatedNews from "./RelatedNews";
import CommentForm from "./CommentForm";

function BlogContent() {
  return (
    <div className="w-full lg:w-2/3 flex flex-col gap-8">
      
      {/* Main text */}
      <div className="text-gray-600 dark:text-gray-400 text-sm leading-7 space-y-6">
        <p>
          There's a lot of focus on being "strong" and having a "tough mind" in today's fitness
          world. To build muscle, burn fat and transform your body, we are told, we must be
          tough, disciplined and driven.
        </p>
        <p>
          While all of these things are certainly true and necessary, what happens when we
          simply run out of willpower? What happens when our inner drive isn't enough to get us
          to the gym? What happens when we are tired, stressed, overworked and overwhelmed?
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 row-span-2 h-full">
          <img
            src="/assets/home-about.jpg"
            alt="Gym workout"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-span-1 h-32 sm:h-40">
          <img
            src="/assets/blog-1.jpg"
            alt="Workout"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-span-1 h-32 sm:h-40">
          <img
            src="/assets/blog-2.png"
            alt="Kettlebell"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Subheading & more text */}
      <div className="text-gray-400 text-sm leading-7 space-y-6 mt-4">
        <h2 className="text-black dark:text-white text-2xl font-black uppercase tracking-wide">
          Our Year Round Goal is to Change Your Mindset
        </h2>
        <p>
          It's a fact of life that we all have limits. Our physical and mental energy reserves
          are not infinite. When our willpower runs out, we must rely on our habits and our
          environment to keep us moving forward. This is why cultivating a healthy environment
          and building sustainable habits is so crucial to long-term success.
        </p>
        
        {/* Blockquote */}
        <blockquote className="border-l-4 border-orange-500 pl-6 py-2 my-8 italic font-semibold text-black dark:text-white text-lg bg-gray-100 dark:bg-[#111] transition-colors duration-300">
          "Success isn't always about greatness. It's about consistency. Consistent
          hard work leads to success. Greatness will come."
        </blockquote>
        
        <p>
          So how do we build an environment that fosters success? How do we build habits that
          propel us forward even when our motivation is lacking? It starts with small,
          incremental changes. We don't need to overhaul our entire lives overnight. We simply
          need to identify the areas where we can improve and make small adjustments.
        </p>
      </div>

      {/* Tags and Share */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 border-t border-b border-black/10 dark:border-white/10 mt-8 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-black dark:text-white font-bold text-sm uppercase tracking-widest">Tags:</span>
          <div className="flex gap-2">
            <span className="text-gray-600 dark:text-gray-400 text-xs px-3 py-1 bg-gray-200 dark:bg-[#111] hover:text-orange-500 cursor-pointer transition-colors">Gym</span>
            <span className="text-gray-600 dark:text-gray-400 text-xs px-3 py-1 bg-gray-200 dark:bg-[#111] hover:text-orange-500 cursor-pointer transition-colors">Fitness</span>
            <span className="text-gray-600 dark:text-gray-400 text-xs px-3 py-1 bg-gray-200 dark:bg-[#111] hover:text-orange-500 cursor-pointer transition-colors">Crossfit</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-black dark:text-white font-bold text-sm uppercase tracking-widest">Share:</span>
          <div className="flex gap-3 text-gray-400">
            <a href="#" className="hover:text-orange-500 transition-colors"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><i className="fa-brands fa-twitter"></i></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><i className="fa-brands fa-instagram"></i></a>
          </div>
        </div>
      </div>

      <RelatedNews />
      <CommentForm />
      
    </div>
  );
}

export default BlogContent;
