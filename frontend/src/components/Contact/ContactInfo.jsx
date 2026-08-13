import React, { useState } from "react";

function ContactInfo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }
    console.log("Contact form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-white dark:bg-[#151515] py-20 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Left Column: Info */}
        <div className="w-full lg:w-1/3 flex flex-col gap-10">
          
          {/* Information */}
          <div>
            <h3 className="text-black dark:text-white text-slate-900 font-black uppercase tracking-widest text-lg mb-6">
              Information
            </h3>
            <div className="flex flex-col gap-4 text-sm font-semibold tracking-wide">
              <p className="flex items-center gap-4 text-black dark:text-white text-slate-900">
                <i className="fa-solid fa-phone text-orange-500"></i>
                (12)-100-100-100
              </p>
              <p className="flex items-center gap-4 text-black dark:text-white text-slate-900">
                <i className="fa-solid fa-envelope text-orange-500"></i>
                info.colorlib@gmail.com
              </p>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-black dark:text-white text-slate-900 font-black uppercase tracking-widest text-lg mb-6">
              Address
            </h3>
            <div className="flex items-start gap-4 text-sm font-semibold tracking-wide text-black dark:text-white text-slate-900 leading-relaxed">
              <i className="fa-solid fa-location-dot text-orange-500 mt-1"></i>
              <p>
                Iris Watson, Maryland,<br />
                United State, New York City
              </p>
            </div>
          </div>
          
        </div>

        {/* Right Column: Form */}
        <div className="w-full lg:w-2/3">
          <h3 className="text-black dark:text-white text-slate-900 font-black uppercase tracking-widest text-lg mb-8">
            Get In Touch
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full bg-gray-100 dark:bg-[#1a1a1a] border border-black/5 dark:border-white/5 px-5 py-4 text-sm text-black dark:text-white text-slate-900 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-gray-100 dark:bg-[#1a1a1a] border border-black/5 dark:border-white/5 px-5 py-4 text-sm text-black dark:text-white text-slate-900 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows="6"
              className="w-full bg-gray-100 dark:bg-[#1a1a1a] border border-black/5 dark:border-white/5 px-5 py-4 text-sm text-black dark:text-white text-slate-900 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
            ></textarea>
            <button
              type="submit"
              className="self-start bg-orange-500 hover:bg-orange-600 dark:text-white text-slate-900 font-bold uppercase tracking-widest text-xs px-10 py-4 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}

export default ContactInfo;
