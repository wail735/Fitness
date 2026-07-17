import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { LayoutContext } from "../context/LayoutContext";

const NAV_LINKS = [
  "HOME",
  "ABOUT US",
  "SCHEDULE",
  "GALLERY",
  "BLOG",
  "CONTACTS",
];

const SOCIAL_LINKS = [
  { icon: "fa-instagram", label: "Instagram", href: "#" },
  { icon: "fa-facebook", label: "Facebook", href: "#" },
  { icon: "fa-youtube", label: "YouTube", href: "#" },
  { icon: "fa-linkedin", label: "LinkedIn", href: "#" },
];

function NavBar() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { data, dispatch } = useContext(LayoutContext);
  const isOpen = data.navbarHamburger;
  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-md">
      <nav
        className="relative h-20 w-full px-4 lg:px-8 flex justify-between items-center  border-b border-white/10 shadow-sm bg-white
  text-black
  dark:bg-black
  dark:text-white transition-all duration-300"
      >
        <Link to="/" aria-label="Home" className="group shrink-0">
          <div className="flex gap-2.5 text-2xl items-center">
            <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-500/10 transition-colors duration-300 group-hover:bg-orange-500">
              <i className="fa-solid fa-dumbbell text-orange-500 transition-colors duration-300 group-hover:text-white"></i>
            </div>
            <span className="font-black tracking-tight bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              ACTIVITAR
            </span>
          </div>
        </Link>

        <ul className="hidden lg:flex gap-6 xl:gap-10 dark:text-white text-black font-semibold text-xs xl:text-sm tracking-wide ">
          {NAV_LINKS.map((item) => {
            const path =
              item === "HOME"
                ? "/"
                : `/${item.toLowerCase().replace(" ", "-")}`;

            return (
              <li key={item} className="whitespace-nowrap">
                <Link
                  to={path}
                  className="relative pb-1 text-black dark:text-white hover:text-orange-400 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-orange-400 after:transition-all hover:after:w-full"
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4 xl:gap-6">
          <div className="hidden lg:flex gap-4 xl:gap-5 text-black dark:text-white text-lg">
            {SOCIAL_LINKS.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 hover:scale-110 transition-transform duration-300"
              >
                <i className={`fa-brands ${icon}`}></i>
              </a>
            ))}
          </div>
          <button
            onClick={() => {
              setDarkMode(!darkMode);
            }}
            className="text-black dark:text-white cursor-pointer text-2xl transition-all duration-300 hover:text-orange-400"
          >
            <i className={`fa-solid ${darkMode ? "fa-sun" : "fa-moon"} `}></i>
          </button>
          <button
            onClick={() => dispatch({ type: "TOGGLE_NAVBAR" })}
            className="lg:hidden flex items-center gap-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white text-xl sm:text-sm px-3 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            <i
              className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"} w-4 text-center`}
            ></i>
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden absolute top-20 left-0 w-full bg-black/95 backdrop-blur-lg border-b border-white/10 transition-all duration-400 ease-in-out z-40 overflow-y-auto ${
          isOpen
            ? "max-h-[calc(100vh-5rem)] opacity-100 py-6"
            : "max-h-0 opacity-0 py-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 text-white font-medium tracking-wide">
          {NAV_LINKS.map((item) => {
            const path =
              item === "HOME"
                ? "/"
                : `/${item.toLowerCase().replace(" ", "-")}`;

            return (
              <li key={item}>
                <Link
                  to={path}
                  onClick={() => dispatch({ type: "CLOSE_NAVBAR" })}
                  className="hover:text-orange-400 transition-colors text-lg"
                >
                  {item}
                </Link>
              </li>
            );
          })}
          <li className="flex gap-6 mt-4 pt-4 border-t border-white/20 w-1/2 justify-center">
            {SOCIAL_LINKS.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-orange-400"
              >
                <i className={`fa-brands ${icon}`}></i>
              </a>
            ))}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default NavBar;
