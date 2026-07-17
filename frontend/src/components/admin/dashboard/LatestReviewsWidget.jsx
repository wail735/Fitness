import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const reviews = [
  { id: 1, user: 'Elodie M.', text: 'The new HIIT program is absolutely killer! Love it.', rating: 5 },
  { id: 2, user: 'Thomas K.', text: 'Great facilities but it gets a bit crowded around 6PM.', rating: 4 },
];

const LatestReviewsWidget = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
          <Quote className="text-red-500" size={20} />
          Latest Reviews
        </h3>
        <button className="text-sm font-semibold text-red-600 hover:text-red-700">See All</button>
      </div>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-sm text-neutral-800">{review.user}</span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 italic">"{review.text}"</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default LatestReviewsWidget;
