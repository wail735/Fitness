import React, { useState } from "react";
import { Calculator, Flame, Activity, Droplets, PieChart, Scale } from "lucide-react";

export default function Calculators() {
  const [activeTab, setActiveTab] = useState("bmi"); // bmi | tdee | macros | hydration

  // BMI State
  const [bmiWeight, setBmiWeight] = useState(75);
  const [bmiHeight, setBmiHeight] = useState(175);
  
  // TDEE State
  const [tdeeAge, setTdeeAge] = useState(25);
  const [tdeeGender, setTdeeGender] = useState("male");
  const [tdeeWeight, setTdeeWeight] = useState(75);
  const [tdeeHeight, setTdeeHeight] = useState(175);
  const [tdeeActivity, setTdeeActivity] = useState(1.375); // 1.2, 1.375, 1.55, 1.725
  const [tdeeGoal, setTdeeGoal] = useState("maintain"); // maintain, lose, gain

  // Calculate BMI
  const heightM = bmiHeight / 100;
  const bmiValue = heightM > 0 ? (bmiWeight / (heightM * heightM)).toFixed(1) : 0;
  
  const getBmiCategory = (val) => {
    if (val < 18.5) return { label: "Insuffisance pondérale", color: "text-blue-400", bg: "bg-blue-500/20" };
    if (val < 25) return { label: "Poids normal", color: "text-emerald-400", bg: "bg-emerald-500/20" };
    if (val < 30) return { label: "Surpoids", color: "text-amber-400", bg: "bg-amber-500/20" };
    return { label: "Obésité", color: "text-red-400", bg: "bg-red-500/20" };
  };

  const bmiCat = getBmiCategory(parseFloat(bmiValue));

  // Calculate BMR (Mifflin-St Jeor)
  const bmr = tdeeGender === "male"
    ? 10 * tdeeWeight + 6.25 * tdeeHeight - 5 * tdeeAge + 5
    : 10 * tdeeWeight + 6.25 * tdeeHeight - 5 * tdeeAge - 161;

  const tdeeBase = Math.round(bmr * tdeeActivity);
  
  let targetCalories = tdeeBase;
  if (tdeeGoal === "lose") targetCalories = Math.round(tdeeBase * 0.82); // -18% deficit
  if (tdeeGoal === "gain") targetCalories = Math.round(tdeeBase * 1.15); // +15% surplus

  // Macros (Protein ~ 2g/kg, Fat ~ 1g/kg, Rest Carbs)
  const proteinGrams = Math.round(tdeeWeight * 2.0);
  const fatGrams = Math.round(tdeeWeight * 0.9);
  const proteinCals = proteinGrams * 4;
  const fatCals = fatGrams * 9;
  const carbCals = Math.max(0, targetCalories - (proteinCals + fatCals));
  const carbGrams = Math.round(carbCals / 4);

  // Hydration (approx 35ml per kg + activity bonus)
  const hydrationLiters = ((tdeeWeight * 0.035) * (tdeeActivity > 1.4 ? 1.2 : 1)).toFixed(1);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-500 text-xs font-semibold uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            Outils & Calculatrices Fitness
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Calculez Vos Métriques d'Entraînement
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Obtenez des mesures précises pour votre IMC, vos besoins caloriques journaliers (TDEE), vos macronutriments et votre hydratation.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-[#12141a] border border-slate-800/50 rounded-2xl">
          <button
            onClick={() => setActiveTab("bmi")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
              activeTab === "bmi"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <Scale className="w-4 h-4" />
            Calculateur IMC
          </button>
          <button
            onClick={() => setActiveTab("tdee")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
              activeTab === "tdee"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <Flame className="w-4 h-4" />
            Calories & TDEE
          </button>
          <button
            onClick={() => setActiveTab("macros")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
              activeTab === "macros"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <PieChart className="w-4 h-4" />
            Macronutriments
          </button>
          <button
            onClick={() => setActiveTab("hydration")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
              activeTab === "hydration"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <Droplets className="w-4 h-4" />
            Hydratation
          </button>
        </div>

        {/* Tab Contents */}
        <div className="bg-[#12141a] border border-slate-800/50 rounded-2xl p-6 sm:p-8 shadow-xl">
          
          {/* TAB 1: BMI */}
          {activeTab === "bmi" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Scale className="w-5 h-5 text-red-500" /> Indice de Masse Corporelle (IMC)
                </h3>
                
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                    <span>Poids: {bmiWeight} kg</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="160"
                    value={bmiWeight}
                    onChange={(e) => setBmiWeight(Number(e.target.value))}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                    <span>Taille: {bmiHeight} cm</span>
                  </div>
                  <input
                    type="range"
                    min="130"
                    max="220"
                    value={bmiHeight}
                    onChange={(e) => setBmiHeight(Number(e.target.value))}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* BMI Result Card */}
              <div className="flex flex-col items-center justify-center p-8 bg-[#0b0c10] border border-slate-800/50 rounded-2xl text-center">
                <span className="text-slate-500 font-medium mb-2">Votre IMC est de</span>
                <span className="text-6xl font-black text-white mb-4">{bmiValue}</span>
                <div className={`px-4 py-2 rounded-lg font-bold text-sm ${bmiCat.bg} ${bmiCat.color}`}>
                  {bmiCat.label}
                </div>
                <p className="text-xs text-slate-400 mt-4 max-w-xs">
                  Un IMC équilibré se situe entre 18.5 et 24.9. Il sert de point de référence pour mesurer votre santé générale.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: TDEE & Calories */}
          {activeTab === "tdee" && (
            <div className="bg-[#12141a] border border-slate-800/50 rounded-3xl p-6 md:p-8 shadow-xl">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                <Flame className="w-5 h-5 text-amber-500" /> Calculateur TDEE & Calories
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Sexe</label>
                      <select
                        value={tdeeGender}
                        onChange={(e) => setTdeeGender(e.target.value)}
                        className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-2 px-3 text-sm text-white focus:border-red-500 focus:outline-none"
                      >
                        <option value="male">Homme</option>
                        <option value="female">Femme</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Âge</label>
                      <input
                        type="number"
                        value={tdeeAge}
                        onChange={(e) => setTdeeAge(Number(e.target.value))}
                        className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-2 px-3 text-sm text-white focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Poids (kg)</label>
                      <input
                        type="number"
                        value={tdeeWeight}
                        onChange={(e) => setTdeeWeight(Number(e.target.value))}
                        className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-2 px-3 text-sm text-white focus:border-red-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Taille (cm)</label>
                      <input
                        type="number"
                        value={tdeeHeight}
                        onChange={(e) => setTdeeHeight(Number(e.target.value))}
                        className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-2 px-3 text-sm text-white focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Niveau d'activité physique</label>
                    <select
                      value={tdeeActivity}
                      onChange={(e) => setTdeeActivity(Number(e.target.value))}
                      className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-2 px-3 text-sm text-white focus:border-red-500 focus:outline-none"
                    >
                      <option value="1.2">Sédentaire (Bureau, peu de sport)</option>
                      <option value="1.375">Légèrement actif (1 à 3 séances/semaine)</option>
                      <option value="1.55">Modérément actif (3 à 5 séances/semaine)</option>
                      <option value="1.725">Très actif (6 à 7 séances/semaine)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Objectif principal</label>
                    <div className="flex bg-[#0b0c10] border border-slate-800/50 rounded-xl p-1 gap-1">
                      <button
                        type="button"
                        onClick={() => setTdeeGoal("lose")}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                          tdeeGoal === "lose" ? "bg-amber-600 text-white" : "text-slate-400"
                        }`}
                      >
                        Sèche (-18%)
                      </button>
                      <button
                        type="button"
                        onClick={() => setTdeeGoal("maintain")}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                          tdeeGoal === "maintain" ? "bg-red-600 text-white" : "text-slate-400"
                        }`}
                      >
                        Maintien
                      </button>
                      <button
                        type="button"
                        onClick={() => setTdeeGoal("gain")}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                          tdeeGoal === "gain" ? "bg-emerald-600 text-white" : "text-slate-400"
                        }`}
                      >
                        Prise de masse (+15%)
                      </button>
                    </div>
                  </div>
                </div>

                {/* TDEE Output */}
                <div className="bg-[#0b0c10] border border-slate-800/50 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs uppercase font-semibold text-slate-500">Métabolisme de Base (BMR)</span>
                    <div className="text-2xl font-bold text-slate-200 mb-4">{Math.round(bmr)} kcal/jour</div>
                    
                    <span className="text-xs uppercase font-semibold text-slate-500">Dépense Totale (TDEE Maintien)</span>
                    <div className="text-2xl font-bold text-slate-200 mb-4">{tdeeBase} kcal/jour</div>
                  </div>

                  <div className="bg-red-600/10 border border-red-500/30 rounded-xl p-4 text-center">
                    <span className="text-xs uppercase font-semibold text-red-400">Objectif Calorique Ciblé</span>
                    <div className="text-4xl font-extrabold text-white mt-1">{targetCalories} <span className="text-sm font-normal text-slate-400">kcal/jour</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Macros */}
          {activeTab === "macros" && (
            <div className="bg-[#12141a] border border-slate-800/50 rounded-3xl p-6 md:p-8 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6">Répartition des Macronutriments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    Sur la base de votre objectif de <strong>{targetCalories} kcal</strong> et d'un poids de <strong>{tdeeWeight} kg</strong>, voici une répartition optimale de vos macros.
                  </p>
                  
                  <div className="bg-[#0b0c10] border border-slate-800/50 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-red-400">Protéines</span>
                      <p className="text-[10px] text-slate-500">~2g par kg de poids de corps</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-white">{proteinGrams}g</span>
                      <p className="text-xs text-slate-500">{proteinCals} kcal</p>
                    </div>
                  </div>

                  <div className="bg-[#0b0c10] border border-slate-800/50 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Lipides</span>
                      <p className="text-[10px] text-slate-500">~0.9g par kg de poids de corps</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-white">{fatGrams}g</span>
                      <p className="text-xs text-slate-500">{fatCals} kcal</p>
                    </div>
                  </div>

                  <div className="bg-[#0b0c10] border border-slate-800/50 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Glucides</span>
                      <p className="text-[10px] text-slate-500">Le reste des calories</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-white">{carbGrams}g</span>
                      <p className="text-xs text-slate-500">{carbCals} kcal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Hydration */}
          {activeTab === "hydration" && (
            <div className="bg-[#12141a] border border-slate-800/50 rounded-3xl p-6 md:p-8 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6">Besoins en Hydratation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Poids (kg)</label>
                    <input
                      type="number"
                      value={tdeeWeight}
                      onChange={(e) => setTdeeWeight(e.target.value)}
                      className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-3 px-4 text-white focus:border-red-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Niveau d'Activité</label>
                    <select
                      value={tdeeActivity}
                      onChange={(e) => setTdeeActivity(e.target.value)}
                      className="w-full bg-[#0b0c10] border border-slate-800/50 rounded-xl py-3 px-4 text-white focus:border-red-500 focus:outline-none transition-colors"
                    >
                      <option value="1.2">Faible (Sédentaire)</option>
                      <option value="1.375">Modéré</option>
                      <option value="1.55">Élevé (Sportif régulier)</option>
                      <option value="1.725">Très élevé (Sportif intense)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-8 bg-[#0b0c10] border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)] rounded-2xl text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full"></div>
                  <Droplets className="w-12 h-12 text-blue-400 mb-4 relative z-10" />
                  <span className="text-slate-400 font-medium mb-1 relative z-10">Volume Quotidien Recommandé</span>
                  <span className="text-5xl font-black text-white relative z-10">{hydrationLiters} <span className="text-lg text-slate-400 font-normal">Litres</span></span>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
