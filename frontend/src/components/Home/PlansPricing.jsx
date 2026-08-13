import React, { useState } from "react";

const plans = [
  {
    title: "Normal",
    monthlyPrice: 55,
    yearlyPrice: 45,
    features: [
      "Unlimited access to the gym",
      "1 classes per week",
      "FREE drinking package",
      "1 Free personal training",
    ],
    featured: false,
  },
  {
    title: "Professional",
    monthlyPrice: 95,
    yearlyPrice: 79,
    features: [
      "Unlimited access to the gym",
      "2 classes per week",
      "FREE drinking package",
      "2 Free personal training",
    ],
    featured: true,
  },
  {
    title: "Advanced",
    monthlyPrice: 165,
    yearlyPrice: 139,
    features: [
      "Unlimited access to the gym",
      "6 classes per week",
      "FREE drinking package",
      "5 Free personal training",
    ],
    featured: false,
  },
];

export const PricingSimpleIcon = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-[url('/assets/price-bg.png')] bg-cover bg-center overflow-hidden">

      <div className="absolute inset-0 bg-red-950/75 z-0" />

      <div className="relative z-10 w-full max-w-5xl">

        <div className="text-center mb-10">
          <h1 className="text-white text-3xl md:text-5xl font-black uppercase tracking-widest mb-3 drop-shadow-lg">
            Choose Your Pricing Plan
          </h1>
          <p className="text-white/70 text-sm max-w-md mx-auto leading-relaxed mb-7">
            These reports started to surface when Congress was having hearings about the
            painkiller, Vioxx. A Food and Drug Administration staff member.
          </p>

          <div className="inline-flex items-center gap-3 text-white text-sm font-medium">
            <span className={isYearly ? "opacity-50" : "opacity-100"}>Monthly</span>

            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
                isYearly ? "bg-red-600" : "bg-white/30"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                  isYearly ? "left-7" : "left-1"
                }`}
              />
            </button>

            <span className={isYearly ? "opacity-100" : "opacity-50"}>Years</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`relative bg-white dark:bg-[#1a1a1a] text-center rounded-sm shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl ${
                plan.featured ? "scale-105" : "scale-100"
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                  <div className="absolute top-3 -right-3 bg-red-600 text-white text-[10px] font-bold w-12 text-center rotate-45 py-0.5">
                    ★
                  </div>
                </div>
              )}

              <div className="px-8 pt-10 pb-8">
                <h3 className="text-base font-black uppercase tracking-widest text-gray-900 dark:text-white text-slate-900 mb-5 transition-colors">
                  {plan.title}
                </h3>

                <div className="flex items-start justify-center gap-1 mb-1">
                  <sup className="text-2xl font-bold text-gray-900 dark:text-white text-slate-900 mt-3 leading-none transition-colors">$</sup>
                  <span className="text-7xl font-black text-gray-900 dark:text-white text-slate-900 leading-none transition-colors">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                </div>

                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">
                  {isYearly ? "Yearly" : "Monthly"}
                </p>

                <hr className="border-gray-100 dark:border-white/5 mb-5 transition-colors" />

                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="text-sm text-gray-500 text-center">
                      {f}
                    </li>
                  ))}
                </ul>

                <button className="w-full py-3 border-2 border-red-600 text-red-600 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-red-600 hover:text-white transition-colors duration-200">
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const PlansPricing = PricingSimpleIcon;
