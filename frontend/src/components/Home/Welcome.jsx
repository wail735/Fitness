import React from "react";

function Welcome() {
  return (
    <section className="bg-white dark:bg-[#171717] py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center text-center md:text-start">
        <div>
          <h2 className="text-5xl font-extrabold uppercase dark:text-white text-slate-900 mb-10 ">
            Welcome to CrossFit
          </h2>

          <p className="dark:text-white text-slate-900 text-2xl font-semibold leading-relaxed mb-8 max-w-xl">
            CrossFit is a cutting-edge functional fitness system that can help
            everyday men.
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-8 text-lg mb-12 max-w-xl">
            Success isn’t really that difficult. There is a significant portion
            of the population here in North America, that actually want and need
            success to be hard! For those of you who are serious about having
            more, doing more, giving more and being more.
          </p>

          <button className="bg-linear-to-r from-[#e16221] via-[#e2501e] to-[#e43e1d] text-white uppercase font-bold tracking-[3px] px-10 py-4 hover:opacity-90 transition cursor-pointer">
            Learn More
          </button>
        </div>

        <div className="flex justify-center lg:justify-end">
          <img
            src="./assets/home-about.jpg"
            alt="CrossFit"
            className="w-full max-w-140 h-140 object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Welcome;
