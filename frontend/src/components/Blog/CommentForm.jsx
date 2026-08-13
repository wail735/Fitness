import React, { useState } from "react";

function CommentForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.comment) {
      alert("Please fill in all fields.");
      return;
    }
    // Simulate submission
    console.log("Form submitted:", formData);
    alert("Thank you for your comment!");
    // Reset form
    setFormData({ name: "", email: "", comment: "" });
  };

  return (
    <div className="mt-16">
      <h3 className="text-black dark:text-white text-slate-900 font-black uppercase tracking-widest text-xl mb-8 flex items-center gap-2">
        <div className="w-1 h-6 bg-orange-500"></div> Leave a Comment
      </h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full bg-gray-100 dark:bg-[#111] border border-black/5 dark:border-white/10 px-5 py-4 text-sm text-black dark:text-white text-slate-900 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full bg-gray-100 dark:bg-[#111] border border-black/5 dark:border-white/10 px-5 py-4 text-sm text-black dark:text-white text-slate-900 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>
        
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Comment"
          rows="5"
          className="w-full bg-gray-100 dark:bg-[#111] border border-black/5 dark:border-white/10 px-5 py-4 text-sm text-black dark:text-white text-slate-900 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
        ></textarea>
        
        <button
          type="submit"
          className="self-start bg-orange-500 hover:bg-orange-600 dark:text-white text-slate-900 font-bold uppercase tracking-widest text-xs px-8 py-4 transition-colors duration-300"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
