import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../api/axiosConfig";
import { useAuth } from "./AuthContext";

const FitnessContext = createContext();

export const FitnessProvider = ({ children }) => {
  const { user } = useAuth();

  const [classes, setClasses] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [bodyMetrics, setBodyMetrics] = useState([]);
  const [nutritionLogs, setNutritionLogs] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── Fetch public classes (always) ──────────────────────────────────────────
  const fetchClasses = useCallback(async () => {
    try {
      const { data } = await api.get("/classes");
      setClasses(data);
    } catch (err) {
      console.error("Failed to fetch classes:", err);
    }
  }, []);

  // ── Fetch user-specific data (only when logged in) ─────────────────────────
  const fetchUserData = useCallback(async () => {
    if (!user) return;
    try {
      const [bookingsRes, workoutsRes, metricsRes, nutritionRes] = await Promise.all([
        api.get("/classes/my-bookings"),
        api.get("/users/me/workouts"),
        api.get("/users/me/body-metrics"),
        api.get("/users/me/nutrition"),
      ]);
      setUserBookings(bookingsRes.data);
      setWorkouts(workoutsRes.data);
      setBodyMetrics(metricsRes.data);
      setNutritionLogs(nutritionRes.data);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  }, [user]);

  // ── Fetch coach/admin routines ─────────────────────────────────────────────
  const fetchRoutines = useCallback(async () => {
    if (!user || !["coach", "admin"].includes(user.role)) return;
    try {
      const { data } = await api.get("/coach/routines");
      setRoutines(data);
    } catch (err) {
      console.error("Failed to fetch routines:", err);
    }
  }, [user]);

  // ── Trigger fetches on mount and user change ───────────────────────────────
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchClasses();
      await fetchUserData();
      await fetchRoutines();
      setLoading(false);
    };
    init();
  }, [fetchClasses, fetchUserData, fetchRoutines]);

  // ── Book class ─────────────────────────────────────────────────────────────
  const bookClass = async (classData) => {
    try {
      let classId = classData.id;
      
      // If the ID is a fake number (like 101), check if we have a real class matching this.
      let realClass = classes.find(c => c.name === classData.name && c.day === classData.day && c.time === classData.time);
      
      if (!realClass) {
        // Create the class dynamically in the backend
        const { data } = await api.post("/classes", {
           name: classData.name,
           time: classData.time,
           day: classData.day,
           trainer: classData.trainer,
           capacity: classData.capacity,
           category: classData.cat || classData.category || 'Cardio'
        });
        realClass = data;
        setClasses(prev => [...prev, data]);
      }

      classId = realClass.id || realClass._id;

      await api.post(`/classes/${classId}/book`);
      
      // Update local state (if using fake ID in UI, keep fake ID in userBookings so UI works, or use real ID)
      // Actually, since ClassBookingModal checks `userBookings.includes(selectedClass.id)`, we should add the fake ID so UI updates immediately!
      setUserBookings((prev) => [...prev, classData.id, classId]);
      
      return { success: true, message: "Réservation confirmée !" };
    } catch (err) {
      return { success: false, message: err.response?.data?.error || "Erreur de réservation." };
    }
  };

  // ── Cancel booking ─────────────────────────────────────────────────────────
  const cancelBooking = async (classId) => {
    try {
      await api.delete(`/classes/${classId}/book`);
      setUserBookings((prev) => prev.filter((id) => id !== classId));
      setClasses((prev) =>
        prev.map((c) => c.id === classId ? { ...c, booked: Math.max(0, c.booked - 1) } : c)
      );
    } catch (err) {
      console.error("Cancel booking failed:", err);
    }
  };

  // ── Add Workout ────────────────────────────────────────────────────────────
  const addWorkout = async (workoutData) => {
    try {
      const { data } = await api.post("/users/me/workouts", workoutData);
      setWorkouts((prev) => [data, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.error || "Erreur." };
    }
  };

  // ── Add Body Metric ────────────────────────────────────────────────────────
  const addBodyMetric = async (metricData) => {
    try {
      const { data } = await api.post("/users/me/body-metrics", metricData);
      setBodyMetrics((prev) => [...prev, data].sort((a, b) => a.date.localeCompare(b.date)));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.error || "Erreur." };
    }
  };

  // ── Add Nutrition Log ──────────────────────────────────────────────────────
  const addNutritionLog = async (logData) => {
    try {
      const { data } = await api.post("/users/me/nutrition", logData);
      setNutritionLogs((prev) => [data, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.error || "Erreur." };
    }
  };

  // ── Admin: Add Class ───────────────────────────────────────────────────────
  const addClass = async (classData) => {
    try {
      const { data } = await api.post("/classes", classData);
      setClasses((prev) => [...prev, data]);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.error || "Erreur." };
    }
  };

  // ── Admin: Remove Class ────────────────────────────────────────────────────
  const removeClass = async (classId) => {
    try {
      await api.delete(`/classes/${classId}`);
      setClasses((prev) => prev.filter((c) => c.id !== classId));
      setUserBookings((prev) => prev.filter((id) => id !== classId));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.error || "Erreur." };
    }
  };

  // ── Coach: Add Routine ─────────────────────────────────────────────────────
  const addRoutine = async (routineData) => {
    try {
      const { data } = await api.post("/coach/routines", routineData);
      setRoutines((prev) => [data, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.error || "Erreur." };
    }
  };

  return (
    <FitnessContext.Provider
      value={{
        classes, userBookings, workouts, bodyMetrics, nutritionLogs, routines,
        loading,
        bookClass, cancelBooking,
        addWorkout, addBodyMetric, addNutritionLog,
        addClass, removeClass,
        addRoutine,
        refetchClasses: fetchClasses,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) throw new Error("useFitness must be used within a FitnessProvider");
  return context;
};
