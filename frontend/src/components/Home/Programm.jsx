import React from "react";

function Programm() {
  const cards = [
    {
      id: 1,
      img: "./assets/class-1.jpg",
      title: "Crossfit Level 1",
      description:
        "Sufferers around the globe will be happy to hear that there are sleep apnea remedies.",
      btn: "Read More",
    },
    {
      id: 2,
      img: "./assets/class-2.jpg",
      title: "BootCamp",
      description:
        "The oil, also called linseed oil, has many industrial uses – it is an important ingredient",
      btn: "Read More",
    },
    {
      id: 3,
      img: "./assets/class-3.jpg",
      title: "Energy Blast",
      description:
        "It is a very common occurrence like cold or fever depending upon your lifestyle.",
      btn: "Read More",
    },
    {
      id: 4,
      img: "./assets/class-4.jpg",
      title: "CLASSIC BODY BALANCE",
      description:
        "The procedure is usually a preferred alternative to photorefractive keratectomy.",
      btn: "Read More",
    },
  ];
  return (
    <>
      <section className='relative bg-[url("./assets/classes-title-bg.jpg")] bg-cover bg-center py-24'>
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
          <span className="uppercase tracking-[4px] text-orange-500 font-semibold mb-3">
            Training Programs
          </span>

          <h2 className="text-white text-4xl md:text-5xl font-extrabold uppercase mb-6">
            Choose Your Program
          </h2>

          <p className="text-gray-300 text-lg leading-8">
            Our CrossFit experts can help you discover new training techniques
            and exercises that offer a dynamic and efficient full-body workout.
          </p>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          return (
            <div
              key={card.id}
              className="relative h-125 overflow-hidden group grid
  before:content-['']
  before:z-1
  before:absolute
  before:bottom-0
  before:left-0
  before:w-full
  before:h-0
  before:bg-orange-600/70
  before:transition-all
  before:duration-500
  hover:before:h-3"
            >
              <img
                src={card.img}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 "
              />

              <div className="infos relative z-10 flex flex-col items-center justify-center h-full text-center p-8 text-white">
                <h1 className="font-extrabold text-2xl md:text-3xl mb-4 tracking-wider uppercase">
                  {card.title}
                </h1>
                <p className="text-sm md:text-base mb-8 max-w-sm text-gray-200">
                  {card.description}
                </p>
                <button className="px-8 py-3 border-2 border-red-500 text-white text-sm font-bold tracking-widest uppercase transition-colors duration-300 hover:bg-red-500">
                  READ MORE
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Programm;
