import React, { useState } from "react";

const categories = [
  { id: "all", title: "All Class" },
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
    mon: { time: "10.00 - 14.00", name: "CROSSFIT LV1",   cat: "crossfit"  },
    tue: null,
    wed: { time: "10.00 - 15.00", name: "CROSSFIT LV1",   cat: "crossfit"  },
    thu: null,
    fri: { time: "10.00 - 13.00", name: "LUNGE BALL BUR", cat: "lungeball" },
    sat: null,
    sun: { time: "10.00 - 13.30", name: "LUNGE BALL BUR", cat: "lungeball" },
  },
  {
    time: "14.00",
    mon: null,
    tue: { time: "14.00 - 17.00", name: "LUNGE BALL BUR", cat: "lungeball" },
    wed: null,
    thu: { time: "14.00 - 17.00", name: "CROSSFIT LV1",   cat: "crossfit"  },
    fri: null,
    sat: { time: "14.00 - 15.30", name: "WALLS TO KNEES", cat: "walls"     },
    sun: null,
  },
  {
    time: "16.00",
    mon: { time: "16.00 - 18.00", name: "LUNGE BALL BUR", cat: "lungeball" },
    tue: null,
    wed: { time: "16.00 - 19.00", name: "CANDY",          cat: "candy"     },
    thu: null,
    fri: { time: "16.00 - 19.00", name: "CANDY",          cat: "candy"     },
    sat: { time: "16.00 - 17.00", name: "PPSR",           cat: "ppsr"      },
    sun: { time: "16.00 - 20.00", name: "MURPH",          cat: "crossfit"  },
  },
  {
    time: "18.00",
    mon: { time: "18.00 - 20.00", name: "WALLS TO KNEES", cat: "walls"    },
    tue: { time: "18.00 - 20.00", name: "PPSR",           cat: "ppsr"     },
    wed: null,
    thu: { time: "18.00 - 22.00", name: "CHELSEA",        cat: "crossfit" },
    fri: null,
    sat: { time: "18.00 - 22.00", name: "ANNIE",          cat: "crossfit" },
    sun: null,
  },
  {
    time: "20.00",
    mon: { time: "21.00 - 23.00", name: "LUNGE BALL BUR", cat: "lungeball" },
    tue: { time: "20.00 - 22.00", name: "WALLS TO KNEES", cat: "walls"     },
    wed: { time: "20.30 - 23.00", name: "WALLS TO KNEES", cat: "walls"     },
    thu: null,
    fri: { time: "22.00 - 23.00", name: "CROSSFIT LV2",   cat: "crossfit"  },
    sat: null,
    sun: { time: "21.00 - 23.00", name: "CROSSFIT LV2",   cat: "crossfit"  },
  },
];

const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

function Table() {
  const [activeCategory, setActiveCategory] = useState("all");

  const isCellVisible = (cell) => {
    if (!cell) return true;
    if (activeCategory === "all") return true;
    return cell.cat === activeCategory;
  };

  return (
    <section
      style={{ background: "#151515" }}
      className="py-20 text-white"
    >
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
                borderBottom: activeCategory === cat.id
                  ? "2px solid #e8401c"
                  : "2px solid transparent",
                color: activeCategory === cat.id ? "#e8401c" : "#ffffff",
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
          <table
            className="w-full text-center"
            style={{
              borderCollapse: "collapse",
              background: "#1a1a1a",
              border: "1px solid #2a2a2a",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "18px 24px",
                    background: "#1a1a1a",
                    borderBottom: "1px solid #2a2a2a",
                    minWidth: "80px",
                  }}
                />
                {DAYS.map((day) => (
                  <th
                    key={day}
                    className="uppercase text-xs tracking-widest font-bold"
                    style={{
                      padding: "18px 12px",
                      color: "#cccccc",
                      background: "#1a1a1a",
                      borderBottom: "1px solid #2a2a2a",
                      borderLeft: "1px solid #2a2a2a",
                      minWidth: "120px",
                    }}
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
                  style={{ borderTop: "1px solid #2a2a2a" }}
                >
                  <td
                    className="font-extrabold text-xl"
                    style={{
                      padding: "28px 24px",
                      color: "#ffffff",
                      background: "#1a1a1a",
                      borderRight: "1px solid #2a2a2a",
                    }}
                  >
                    {row.time}
                  </td>

                  {DAY_KEYS.map((key) => {
                    const cell = row[key];
                    // visible = true si la cellule appartient à la catégorie active (ou si "all")
                    // Les cellules vides (null) sont toujours "visibles" mais n'affichent rien
                    const visible = isCellVisible(cell);
                    return (
                      <td
                        key={key}
                        style={{
                          padding: "20px 12px",
                          borderLeft: "1px solid #2a2a2a",
                          verticalAlign: "middle",
                          background: "#1a1a1a",
                        }}
                      >
                        {/*
                          Le div reste TOUJOURS dans le DOM (même si vide).
                          On anime opacity + translateY via transition CSS.
                          Quand visible=false → opacité 0 + léger décalage vers le bas.
                          Quand visible=true  → opacité 1 + position normale.
                        */}
                        <div
                          style={{
                            opacity: cell && visible ? 1 : 0,
                            transform: cell && visible
                              ? "translateY(0px)"
                              : "translateY(6px)",
                            transition: "opacity 0.35s ease, transform 0.35s ease",
                            pointerEvents: cell && visible ? "auto" : "none",
                            minHeight: "40px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "4px",
                          }}
                        >
                          {cell && (
                            <>
                              <span style={{ color: "#cccccc", fontSize: "0.875rem", fontWeight: 500 }}>
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
    </section>
  );
}

export default Table;
