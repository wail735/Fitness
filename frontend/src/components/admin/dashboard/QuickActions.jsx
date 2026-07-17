import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, UserPlus, FileText, BellRing } from 'lucide-react';

const actions = [
  { name: 'Add User', icon: UserPlus, color: 'bg-blue-100 text-blue-600 hover:bg-blue-600' },
  { name: 'Add Coach', icon: PlusCircle, color: 'bg-emerald-100 text-emerald-600 hover:bg-emerald-600' },
  { name: 'Create Membership', icon: FileText, color: 'bg-purple-100 text-purple-600 hover:bg-purple-600' },
  { name: 'Send Notification', icon: BellRing, color: 'bg-amber-100 text-amber-600 hover:bg-amber-600' },
];

const QuickActions = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8"
    >
      <h3 className="text-lg font-bold text-neutral-800 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, idx) => (
          <button 
            key={idx}
            className={`group flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 hover:text-white ${action.color}`}
          >
            <action.icon size={24} className="mb-2 transition-transform group-hover:scale-110" />
            <span className="text-sm font-semibold">{action.name}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;
