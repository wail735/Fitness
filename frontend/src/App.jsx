import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LayoutProvider } from "./context/LayoutContext";
import { AuthProvider } from "./context/AuthContext";
import { FitnessProvider } from "./context/FitnessContext";

// Layouts
import { PublicLayout } from "./components/layouts/PublicLayout";
import PortalLayout from "./components/layouts/PortalLayout";
import AdminLayout from "./components/admin/AdminLayout";
import Footer from "./components/Footer";

// Auth Components
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute";
import AuthPage from "./pages/AuthPage";

// Public Pages
import Hero from "./components/Home/Hero";
import About from "./components/About/About";
import Schedule from "./components/Schedule/Schedule";
import Gallery from "./components/Gallery/Gallery";
import Blog from "./components/Blog/Blog";
import Contact from "./components/Contact/Contact";
import Page404 from "./components/Page404";

// User Portal Pages & Tools
import Calculators from "./components/user/Calculators";
import UserDashboard from "./components/user/UserDashboard";
import WorkoutTracker from "./components/user/WorkoutTracker";
import BodyTracker from "./components/user/BodyTracker";
import NutritionTracker from "./components/user/NutritionTracker";
import SettingsPage from "./components/user/Settings";
import AppearancePage from "./components/user/Appearance";
import SupportPage from "./components/user/Support";

// Coach Portal Pages
import CoachDashboard from "./components/coach/CoachDashboard";
import WorkoutBuilder from "./components/coach/WorkoutBuilder";

// Admin Portal Pages
import Dashboard from "./components/admin/Dashboard";
import ScheduleManager from "./components/admin/ScheduleManager";

function App() {
  return (
    <ThemeProvider>
      <LayoutProvider>
        <AuthProvider>
          <FitnessProvider>
            <BrowserRouter>
              <div className="flex flex-col min-h-screen">
                <div className="flex-grow">
                  <Routes>
                    {/* Zone 1: Site Public & Outils Membre */}
                    <Route element={<PublicLayout />}>
                      <Route path="/" element={<Hero />} />
                      <Route path="/about-us" element={<About />} />
                      <Route path="/schedule" element={<Schedule />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/contacts" element={<Contact />} />
                      <Route path="/calculators" element={<Calculators />} />

                      <Route path="*" element={<Page404 />} />
                    </Route>

                    {/* Espace Membre (Nouveau Design Dashboard) */}
                    <Route element={<PortalLayout />}>
                      <Route path="/my-dashboard" element={<UserDashboard />} />
                      <Route path="/my-workouts" element={<WorkoutTracker />} />
                      <Route path="/my-body" element={<BodyTracker />} />
                      <Route path="/my-nutrition" element={<NutritionTracker />} />
                      <Route path="/my-settings" element={<SettingsPage />} />
                      <Route path="/my-appearance" element={<AppearancePage />} />
                      <Route path="/my-support" element={<SupportPage />} />
                    </Route>

                    {/* Zone 2: Espace Professionnel & Connexion */}
                    <Route path="/login" element={<AuthPage />} />
                    <Route path="/admin/login" element={<AuthPage />} /> {/* Backward compatibility */}

                    {/* Espace Coach (Protégé) */}
                    <Route element={<AdminProtectedRoute allowedRoles={["coach", "admin"]} />}>
                      <Route element={<PortalLayout />}>
                        <Route path="/coach" element={<CoachDashboard />} />
                        <Route path="/coach/builder" element={<WorkoutBuilder />} />
                      </Route>
                    </Route>

                    {/* Espace Administration (Protégé) */}
                    <Route element={<AdminProtectedRoute allowedRoles={["admin"]} />}>
                      <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="schedule" element={<ScheduleManager />} />
                      </Route>
                    </Route>
                  </Routes>
                </div>
                <Footer />
              </div>
            </BrowserRouter>
          </FitnessProvider>
        </AuthProvider>
      </LayoutProvider>
    </ThemeProvider>
  );
}

export default App;
