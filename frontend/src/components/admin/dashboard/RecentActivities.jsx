import React from 'react';
import { motion } from 'framer-motion';

const activities = [
  { id: 1, type: 'payment', title: 'Payment Received', desc: 'Alice D. paid €49.99 for Premium Plan', time: '2 mins ago', color: 'bg-green-500' },
  { id: 2, type: 'user', title: 'New Registration', desc: 'Marc T. created a new account', time: '1 hour ago', color: 'bg-blue-500' },
  { id: 3, type: 'review', title: 'New Review', desc: 'Sophie M. rated a class 5 stars', time: '3 hours ago', color: 'bg-amber-500' },
  { id: 4, type: 'system', title: 'System Update', desc: 'Server maintenance completed', time: '5 hours ago', color: 'bg-neutral-800' },
  { id: 5, type: 'payment', title: 'Payment Failed', desc: 'Lucas D. payment was declined', time: '1 day ago', color: 'bg-red-500' },
];

const RecentActivities = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
    >
      <h3 className="text-lg font-bold text-neutral-800 mb-6">Recent Activities</h3>
      <div className="relative border-l border-gray-200 ml-3 space-y-6">
        {activities.map((activity, index) => (
          <div key={activity.id} className="relative pl-6">
            <span className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${activity.color} ring-4 ring-white`}></span>
            <div className="flex justify-between items-start mb-1">
              <h4 className="text-sm font-bold text-neutral-800">{activity.title}</h4>
              <span className="text-xs font-medium text-gray-400">{activity.time}</span>
            </div>
            <p className="text-sm text-gray-600">{activity.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentActivities;
