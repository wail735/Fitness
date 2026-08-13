import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-[#151515] text-gray-600 dark:text-gray-400 pt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20">
        
        {/* ── COLUMN 1: Logo & Info ── */}
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-[#e8401c]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.5 4v4h-2V6h-2v12h2v-2h2v4h-4v-2H7v2H3v-4h2v-2H3V6h2V4h4v2h8V4h4zM7 8v8h10V8H7z" />
            </svg>
            <h2 className="text-black dark:text-white text-slate-900 text-2xl font-black uppercase tracking-widest">
              Activitar
            </h2>
          </div>
          <p className="text-sm leading-loose">
            Despite growth of the Internet over the past seven years, the use of
            toll-free phone numbers in television advertising continues.
          </p>

          {/* Socials */}
          <div>
            <h4 className="text-black dark:text-white text-slate-900 text-sm font-bold uppercase tracking-widest mb-4">
              Follow Us
            </h4>
            <div className="flex items-center gap-4">
              {/* Facebook */}
              <a href="#" className="hover:text-[#e8401c] transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              {/* Twitter */}
              <a href="#" className="hover:text-[#e8401c] transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="hover:text-[#e8401c] transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── COLUMN 2: Our Blog ── */}
        <div className="flex flex-col gap-6">
          <h3 className="text-black dark:text-white text-slate-900 text-base font-bold uppercase tracking-widest">
            Our Blog
          </h3>
          <ul className="flex flex-col gap-5">
            <li>
              <a href="#" className="hover:text-[#e8401c] transition-colors group">
                <h5 className="text-sm font-bold text-black dark:text-white text-slate-900 uppercase mb-1 group-hover:text-[#e8401c]">
                  Most people who work
                </h5>
                <div className="flex items-center gap-2 text-xs text-[#e8401c]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Jan 02, 2019</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#e8401c] transition-colors group">
                <h5 className="text-sm font-bold text-black dark:text-white text-slate-900 uppercase mb-1 group-hover:text-[#e8401c]">
                  Freelance design tricks how
                </h5>
                <div className="flex items-center gap-2 text-xs text-[#e8401c]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Jan 02, 2019</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#e8401c] transition-colors group">
                <h5 className="text-sm font-bold text-black dark:text-white text-slate-900 uppercase mb-1 group-hover:text-[#e8401c]">
                  Have a computer at home have had
                </h5>
                <div className="flex items-center gap-2 text-xs text-[#e8401c]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Jan 02, 2019</span>
                </div>
              </a>
            </li>
          </ul>
        </div>

        {/* ── COLUMN 3: Program ── */}
        <div className="flex flex-col gap-6">
          <h3 className="text-black dark:text-white text-slate-900 text-base font-bold uppercase tracking-widest">
            Program
          </h3>
          <ul className="flex flex-col gap-4 text-sm font-semibold">
            <li><a href="#" className="hover:text-[#e8401c] transition-colors">Bodybuilding</a></li>
            <li><a href="#" className="hover:text-[#e8401c] transition-colors">Running</a></li>
            <li><a href="#" className="hover:text-[#e8401c] transition-colors">Streching</a></li>
            <li><a href="#" className="hover:text-[#e8401c] transition-colors">Weight Loss</a></li>
            <li><a href="#" className="hover:text-[#e8401c] transition-colors">Gym Fitness</a></li>
          </ul>
        </div>

        {/* ── COLUMN 4: Get Info ── */}
        <div className="flex flex-col gap-6">
          <h3 className="text-black dark:text-white text-slate-900 text-base font-bold uppercase tracking-widest">
            Get Info
          </h3>
          <ul className="flex flex-col gap-6">
            <li className="flex items-start gap-4 text-sm leading-relaxed">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#e8401c] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <strong className="block text-black dark:text-white text-slate-900 mb-1">Phone:</strong>
                <span>+213 55 12 34 56</span>
              </div>
            </li>
            <li className="flex items-start gap-4 text-sm leading-relaxed">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#e8401c] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <strong className="block text-black dark:text-white text-slate-900 mb-1">Email:</strong>
                <a href="mailto:contact@activitar.com" className="hover:text-[#e8401c] transition-colors">contact@activitar.com</a>
              </div>
            </li>
            <li className="flex items-start gap-4 text-sm leading-relaxed">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#e8401c] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <strong className="block text-black dark:text-white text-slate-900 mb-1">Address:</strong>
                <span>Blida, Algérie</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="bg-gray-200 dark:bg-[#0a0a0a] py-6 text-center text-xs text-gray-500 dark:text-gray-500 tracking-wide border-t border-black/5 dark:border-white/5 px-4 transition-colors duration-300">
        Copyright ©2026 All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
