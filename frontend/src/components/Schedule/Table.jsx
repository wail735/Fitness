import React, { useState } from "react";
import ClassBookingModal from "../user/ClassBookingModal";

const categories = [
  { id: "all", title: "Tous" },
  { id: "crossfit", title: "CrossFit" },
  { id: "lungeball", title: "Lunge Ball" },
  { id: "ppsr", title: "PPSR" },
  { id: "walls", title: "Walls" },
  { id: "candy", title: "Candy" },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const schedule = [
  {
    time: "10.00",
    mon: { id: 101, time: "10.00 - 14.00", name: "CROSSFIT LV1", cat: "crossfit", day: "Lundi", trainer: "Alex Rivera", capacity: 15, booked: 8 },
    tue: null,
    wed: { id: 102, time: "10.00 - 15.00", name: "CROSSFIT LV1", cat: "crossfit", day: "Mercredi", trainer: "Alex Rivera", capacity: 15, booked: 9 },
    thu: null,
    fri: { id: 103, time: "10.00 - 13.00", name: "LUNGE BALL BUR", cat: "lungeball", day: "Vendredi", trainer: "Sarah Jenkins", capacity: 12, booked: 5 },
    sat: null,
    sun: { id: 104, time: "10.00 - 13.30", name: "LUNGE BALL BUR", cat: "lungeball", day: "Dimanche", trainer: "Sarah Jenkins", capacity: 12, booked: 7 },
  },
  {
    time: "14.00",
    mon: null,
    tue: { id: 105, time: "14.00 - 17.00", name: "LUNGE BALL BUR", cat: "lungeball", day: "Mardi", trainer: "Sarah Jenkins", capacity: 12, booked: 10 },
    wed: null,
    thu: { id: 106, time: "14.00 - 17.00", name: "CROSSFIT LV1", cat: "crossfit", day: "Jeudi", trainer: "Alex Rivera", capacity: 15, booked: 12 },
    fri: null,
    sat: { id: 107, time: "14.00 - 15.30", name: "WALLS TO KNEES", cat: "walls", day: "Samedi", trainer: "Marc Vasseur", capacity: 10, booked: 6 },
    sun: null,
  },
  {
    time: "16.00",
    mon: { id: 108, time: "16.00 - 18.00", name: "LUNGE BALL BUR", cat: "lungeball", day: "Lundi", trainer: "Sarah Jenkins", capacity: 12, booked: 4 },
    tue: null,
    wed: { id: 109, time: "16.00 - 19.00", name: "CANDY", cat: "candy", day: "Mercredi", trainer: "David Chen", capacity: 14, booked: 11 },
    thu: null,
    fri: { id: 110, time: "16.00 - 19.00", name: "CANDY", cat: "candy", day: "Vendredi", trainer: "David Chen", capacity: 14, booked: 8 },
    sat: { id: 111, time: "16.00 - 17.00", name: "PPSR", cat: "ppsr", day: "Samedi", trainer: "Marc Vasseur", capacity: 10, booked: 3 },
    sun: { id: 112, time: "16.00 - 20.00", name: "MURPH", cat: "crossfit", day: "Dimanche", trainer: "Alex Rivera", capacity: 15, booked: 13 },
  },
  {
    time: "18.00",
    mon: { id: 113, time: "18.00 - 20.00", name: "WALLS TO KNEES", cat: "walls", day: "Lundi", trainer: "Marc Vasseur", capacity: 10, booked: 7 },
    tue: { id: 114, time: "18.00 - 20.00", name: "PPSR", cat: "ppsr", day: "Mardi", trainer: "Marc Vasseur", capacity: 10, booked: 9 },
    wed: null,
    thu: { id: 115, time: "18.00 - 22.00", name: "CHELSEA", cat: "crossfit", day: "Jeudi", trainer: "Alex Rivera", capacity: 15, booked: 15 },
    fri: null,
    sat: { id: 116, time: "18.00 - 22.00", name: "ANNIE", cat: "crossfit", day: "Samedi", trainer: "Alex Rivera", capacity: 15, booked: 11 },
    sun: null,
  },
  {
    time: "20.00",
    mon: { id: 117, time: "21.00 - 23.00", name: "LUNGE BALL BUR", cat: "lungeball", day: "Lundi", trainer: "Sarah Jenkins", capacity: 12, booked: 6 },
    tue: { id: 118, time: "20.00 - 22.00", name: "WALLS TO KNEES", cat: "walls", day: "Mardi", trainer: "Marc Vasseur", capacity: 10, booked: 8 },
    wed: { id: 119, time: "20.30 - 23.00", name: "WALLS TO KNEES", cat: "walls", day: "Mercredi", trainer: "Marc Vasseur", capacity: 10, booked: 5 },
    thu: null,
    fri: { id: 120, time: "22.00 - 23.00", name: "CROSSFIT LV2", cat: "crossfit", day: "Vendredi", trainer: "Alex Rivera", capacity: 15, booked: 14 },
    sat: null,
    sun: { id: 121, time: "21.00 - 23.00", name: "CROSSFIT LV2", cat: "crossfit", day: "Dimanche", trainer: "Alex Rivera", capacity: 15, booked: 10 },
  },
];

const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

function Table() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedClass, setSelectedClass] = useState(null);

  const isCellVisible = (cell) => {
    if (!cell) return true;
    if (activeCategory === "all") return true;
    return cell.cat === activeCategory;
  };

  return (
    <section className="py-20 bg-white dark:bg-[#151515] text-black dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="uppercase tracking-[5px] text-[#e8401c] text-sm font-semibold mb-3">
            Weekly Schedule
          </p>
          <h2
            className="text-4xl sm:text-5xl font-extrabold uppercase tracking-widest"
            style={{ letterSpacing: "0.12em" }}
          >
            Classtime Table
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                background: "none",
                outline: "none",
                cursor: "pointer",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom:
                  activeCategory === cat.id
                    ? "2px solid #e8401c"
                    : "2px solid transparent",
                color: activeCategory === cat.id ? "#e8401c" : "inherit",
                paddingBottom: "4px",
                fontWeight: "700",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                transition: "color 0.3s ease, border-bottom-color 0.3s ease",
              }}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] transition-colors duration-300">
            <thead>
              <tr>
                <th className="px-6 py-4 bg-gray-50 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#2a2a2a] min-w-[80px] transition-colors duration-300" />
                {DAYS.map((day) => (
                  <th
                    key={day}
                    className="uppercase text-xs tracking-widest font-bold px-3 py-4 text-gray-700 dark:text-[#cccccc] bg-gray-50 dark:bg-[#1a1a1a] border-b border-l border-gray-200 dark:border-[#2a2a2a] min-w-[120px] transition-colors duration-300"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {schedule.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="border-t border-gray-200 dark:border-[#2a2a2a] transition-colors duration-300"
                >
                  <td className="font-extrabold text-xl px-6 py-7 text-black dark:text-white bg-gray-50 dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-[#2a2a2a] transition-colors duration-300">
                    {row.time}
                  </td>

                  {DAY_KEYS.map((key) => {
                    const cell = row[key];
                    const visible = isCellVisible(cell);
                    return (
                      <td
                        key={key}
                        className="px-3 py-5 align-middle bg-gray-50 dark:bg-[#1a1a1a] border-l border-gray-200 dark:border-[#2a2a2a] transition-colors duration-300"
                      >
                        <div
                          style={{
                            opacity: cell && visible ? 1 : 0,
                            transform:
                              cell && visible
                                ? "translateY(0px)"
                                : "translateY(6px)",
                            transition:
                              "opacity 0.35s ease, transform 0.35s ease",
                            pointerEvents: cell && visible ? "auto" : "none",
                            minHeight: "50px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                          }}
                        >
                          {cell && (
                            <>
                              <span className="text-gray-600 dark:text-[#cccccc] text-[0.875rem] font-medium transition-colors duration-300">
                                {cell.time}
                              </span>
                              <span
                                style={{
                                  color: "#e8401c",
                                  fontSize: "0.7rem",
                                  fontWeight: 800,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.08em",
                                }}
                              >
                                {cell.name}
                              </span>
                              <button
                                onClick={() => setSelectedClass(cell)}
                                className="mt-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] uppercase rounded-lg transition-colors shadow-sm cursor-pointer"
                              >
                                Réserver
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ClassBookingModal
        selectedClass={selectedClass}
        onClose={() => setSelectedClass(null)}
      />
    </section>
  );
}

export default Table;
