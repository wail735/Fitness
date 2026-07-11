import NavBar from "./components/NavBar";
import Hero from "./components/Home/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About/About";
import Schedule from "./components/Schedule/Schedule";
import Gallery from "./components/Gallery/Gallery";
import Blog from "./components/Blog/Blog";
import Contact from "./components/Contact/Contact";
import Page404 from "./components/Page404";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <main className="relative bg-white dark:bg-[#151515] text-black dark:text-white transition-colors duration-300">
        <BrowserRouter>
          <NavBar />

        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/" />
        </Routes>
        </BrowserRouter>
      </main>
    </ThemeProvider>
  );
}

export default App;
