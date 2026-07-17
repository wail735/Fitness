import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ArrowUpRight } from 'lucide-react';

const payments = [
  { id: 1, user: 'Alice D.', amount: '€49.99', status: 'Completed', date: 'Today, 10:23 AM' },
  { id: 2, user: 'Marc T.', amount: '€19.99', status: 'Processing', date: 'Today, 09:15 AM' },
  { id: 3, user: 'Lucas D.', amount: '€89.99', status: 'Failed', date: 'Yesterday, 14:45 PM' },
];

const RecentPayments = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
          <CreditCard className="text-red-500" size={20} />
          Recent Payments
        </h3>
        <button className="text-sm font-semibold text-red-600 hover:text-red-700">View All</button>
      </div>
      <div className="space-y-4">
        {payments.map((payment) => (
          <div key={payment.id} className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
            <div>
              <p className="font-bold text-sm text-neutral-800">{payment.user}</p>
              <p className="text-xs text-gray-500">{payment.date}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-neutral-800">{payment.amount}</p>
              <p className={`text-xs font-semibold ${
                payment.status === 'Completed' ? 'text-green-600' :
                payment.status === 'Processing' ? 'text-amber-600' : 'text-red-600'
              }`}>{payment.status}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentPayments;
