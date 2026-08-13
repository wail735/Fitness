import { Outlet } from "react-router-dom";

import NavBar from "../NavBar";

export const PublicLayout = () => {
  return (
    <div className="relative bg-white dark:bg-[#151515] text-black dark:text-white text-slate-900 transition-colors duration-300 min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};
/*
<Outlet /> : C'est le "trou" où React Router affiche la page demandée 
(Hero, About, Schedule...). Il remplace l'endroit où tu avais <NavBar /> 
directement dans App.jsx.


*/
