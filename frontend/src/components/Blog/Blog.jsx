import React from "react";
import HeroBanner from "./HeroBanner";
import BlogContent from "./BlogContent";
import Sidebar from "./Sidebar";
import JoinBanner from "./JoinBanner";

export default function Blog() {
  return (
    <>
      <HeroBanner />
      
      {/* Two Column Layout for Content and Sidebar */}
      <section className="bg-white dark:bg-[#151515] py-20 px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          <BlogContent />
          <Sidebar />
        </div>
      </section>

      <JoinBanner />
    </>
  );
}
