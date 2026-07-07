import React from "react";

function Features() {
  const cards = [
    {
      id: 1,
      img: "./assets/feature-1.jpg",
      title: "GROUP CLASSES",
      description:
        "The Sopranos manages to address the biases and benefits of therapy",
    },
    {
      id: 2,
      img: "./assets/feature-2.jpg",
      title: "PERSONAL TRAINING",
      description:
        "Strep throat is very common during the flu seasons and it can be preceded",
    },
    {
      id: 3,
      img: "./assets/feature-3.jpg",
      title: "SPORTS NUTRITION",
      description:
        "A Human Being’s right to life implies his right to have the free and unrestricted",
    },
  ];

  return (
    <div className="w-full bg-black">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {cards.map((card) => {
          return (
            <div
              key={card.id}
              className="relative h-125 overflow-hidden group
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
                <button className="px-8 py-3 border-2 border-red-500 text-sm font-bold tracking-widest uppercase transition-colors duration-300 hover:bg-red-500">
                  READ MORE
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Features;
