import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const topCoaches = [
  { id: 1, name: 'David Smith', role: 'Strength & Conditioning', rating: 4.9, reviews: 124, avatar: 'https://i.pravatar.cc/150?u=coach1' },
  { id: 2, name: 'Sarah Lee', role: 'Yoga Instructor', rating: 4.8, reviews: 98, avatar: 'https://i.pravatar.cc/150?u=coach2' },
  { id: 3, name: 'Mike Johnson', role: 'HIIT Trainer', rating: 4.7, reviews: 112, avatar: 'https://i.pravatar.cc/150?u=coach3' },
];

const TopCoachesWidget = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-neutral-900 rounded-2xl shadow-lg border border-neutral-800 p-6 text-white"
    >
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
        <Star className="text-yellow-400" size={20} fill="currentColor" />
        Top Coaches
      </h3>
      <div className="space-y-4">
        {topCoaches.map((coach) => (
          <div key={coach.id} className="flex items-center gap-4 p-3 rounded-xl bg-neutral-800/50 hover:bg-neutral-800 transition-colors">
            <img src={coach.avatar} alt={coach.name} className="w-12 h-12 rounded-full border-2 border-neutral-700" />
            <div className="flex-1">
              <h4 className="font-bold">{coach.name}</h4>
              <p className="text-xs text-gray-400">{coach.role}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-yellow-400 text-sm font-bold">
                {coach.rating} <Star size={14} fill="currentColor" />
              </div>
              <p className="text-xs text-gray-400">{coach.reviews} reviews</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TopCoachesWidget;
