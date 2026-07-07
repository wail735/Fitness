import React from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";

function Page404() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-500, 500], [25, -25]);
  const rotateY = useTransform(x, [-500, 500], [-25, 25]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="relative min-h-screen flex flex-col justify-center items-center bg-black text-white px-4 text-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-red-900/10 pointer-events-none"></div>

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="relative z-10 flex flex-col items-center cursor-default"
      >
        <h1
          style={{ transform: "translateZ(80px)" }}
          className="text-[120px] sm:text-[180px] font-extrabold tracking-tighter leading-none text-transparent bg-clip-text bg-linear-to-br from-red-600 to-orange-400 drop-shadow-2xl mb-2"
        >
          404
        </h1>

        <p
          style={{ transform: "translateZ(40px)" }}
          className="text-xl sm:text-3xl font-semibold uppercase tracking-widest mb-4 drop-shadow-md"
        >
          Oups ! Page introuvable.
        </p>

        <p
          style={{ transform: "translateZ(20px)" }}
          className="text-gray-400 text-sm sm:text-base max-w-md mx-auto mb-10"
        >
          Il semble que vous ayez quitté la piste. Cette page a probablement
          soulevé trop lourd et n'existe plus.
        </p>

        <motion.div style={{ transform: "translateZ(60px)" }}>
          <Link
            to="/"
            className="inline-block border-2 border-red-500 hover:bg-red-500 text-white px-8 py-3 text-base font-semibold uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.8)]"
          >
            Retourner à page d'acceuil
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Page404;
