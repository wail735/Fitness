import NavBar from "./components/NavBar";
import Hero from "./components/Home/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Page404 from "./components/Page404";
function App() {
  return (
    <main className="relative bg-[#151515] text-white">
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about-us" element={<About />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/" />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
