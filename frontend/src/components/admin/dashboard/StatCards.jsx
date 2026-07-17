import React from 'react';
import { motion } from 'framer-motion';
import { Users, CreditCard, Activity, TrendingUp, TrendingDown, Star } from 'lucide-react';

const statsData = [
  { id: 1, title: 'Total Users', value: '2,845', change: '+12.5%', isPositive: true, icon: Users },
  { id: 2, title: 'Active Memberships', value: '1,492', change: '+5.2%', isPositive: true, icon: CreditCard },
  { id: 3, title: 'Monthly Revenue', value: '€24,500', change: '+8.1%', isPositive: true, icon: Activity },
  { id: 4, title: 'New Signups', value: '345', change: '-2.4%', isPositive: false, icon: TrendingDown },
  { id: 5, title: 'Active Coaches', value: '42', change: '+0.0%', isPositive: true, icon: Star },
  { id: 6, title: 'Pending Reviews', value: '18', change: '-12%', isPositive: true, icon: TrendingUp },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } }
};

const StatCards = () => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {statsData.map((stat) => (
        <motion.div 
          key={stat.id} 
          variants={itemVariants}
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group transition-colors duration-300 hover:border-red-100"
        >
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
            <h3 className="text-3xl font-black text-neutral-900 mb-2 tracking-tight">{stat.value}</h3>
            <div className={`flex items-center text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <span>{stat.change}</span>
              <span className="text-gray-400 ml-2 font-normal">vs last month</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
            <stat.icon size={28} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatCards;
