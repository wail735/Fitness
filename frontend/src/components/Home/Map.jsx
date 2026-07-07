import React, { useState } from "react";

function Map() {
  const[form,setForm]= useState({
    name:"",
    number:"",
    message:""
  })

  return (
    <section className="flex flex-col w-full">
      <div className="bg-[#e8401c] w-full py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-white text-2xl md:text-3xl font-black uppercase tracking-wide mb-2">
              Get Started Today
            </h2>
            <p className="text-white/90 text-sm">
              New student special! $30 unlimited Gym for the first week and 50% off our member!
            </p>
          </div>
          <button className="border-2 border-white text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#e8401c] transition-colors duration-300 whitespace-nowrap">
            Book Now
          </button>
        </div>
      </div>

      <div className="relative w-full h-[600px] bg-gray-200">
        <iframe
          title="Google Maps Blida"
          src="https://maps.google.com/maps?q=Blida,Algeria&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div className="absolute top-10 right-4 md:right-10 w-[90%] max-w-[400px] bg-white p-8 shadow-2xl z-10 mx-auto left-0 md:left-auto">
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-black font-black uppercase text-sm tracking-widest">
                Weekday:
              </span>
              <span className="text-gray-600 text-sm">06:30 - 11:00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-black font-black uppercase text-sm tracking-widest">
                Saturday:
              </span>
              <span className="text-gray-600 text-sm">07:00 - 22:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black font-black uppercase text-sm tracking-widest">
                Sunday:
              </span>
              <span className="text-gray-600 text-sm">09:00 - 18:00</span>
            </div>
          </div>

          <h3 className="text-black font-black uppercase text-lg tracking-widest mb-6">
            Contact Us
          </h3>

          <form className="flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={form.name}
                onChange={(e)=>setForm({...form,name:e.target.value})}
                placeholder="Name"
                className="w-1/2 p-3 border border-gray-300 text-sm outline-none focus:border-[#e8401c] transition-colors text-black"
              />
              <input
                type="tel"
                value={form.number}
                onChange={(e)=>setForm({...form,number:e.target.value})}
                placeholder="Phone"
                className="w-1/2 p-3 border border-gray-300 text-sm outline-none focus:border-[#e8401c] transition-colors text-black"
              />
            </div>
            <textarea
              placeholder="Message"
              value={form.message}
              onChange={(e)=>setForm({...form,message:e.target.value})}
              rows="4"
              className="w-full p-3 border border-gray-300 text-sm outline-none focus:border-[#e8401c] transition-colors resize-none text-black"
            />
            <button
              type="submit"
              className="mt-2 self-start border-2 border-[#e8401c] text-[#e8401c] px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#e8401c] hover:text-white transition-colors duration-300"
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Map;
