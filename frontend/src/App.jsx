import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LayoutProvider } from "./context/LayoutContext";

// Layouts
import { PublicLayout } from "./components/layouts/PublicLayout";
import AdminLayout from "./components/admin/AdminLayout";

// Auth
import { AdminProtectedRoute } from "./components/auth/AdminProtectedRoute";
import AdminLogin from "./components/auth/AdminLogin";

// Public Pages
import Hero from "./components/Home/Hero";
import About from "./components/About/About";
import Schedule from "./components/Schedule/Schedule";
import Gallery from "./components/Gallery/Gallery";
import Blog from "./components/Blog/Blog";
import Contact from "./components/Contact/Contact";
import Page404 from "./components/Page404";

// Admin Pages
import Dashboard from "./components/admin/Dashboard";

function App() {
  return (
    <ThemeProvider>
      <LayoutProvider>
        <BrowserRouter>
        <Routes>
          {/* Zone 1: Site Public */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Hero />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contacts" element={<Contact />} />
            <Route path="*" element={<Page404 />} />
          </Route>

          {/* Zone 2: Administration */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </LayoutProvider>
    </ThemeProvider>
  );
}

export default App;
