import React from 'react';
import { motion } from 'framer-motion';
import { MoreVertical } from 'lucide-react';

const recentUsers = [
  { id: 1, name: 'Alice Dupont', email: 'alice.d@example.com', plan: 'Premium', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Marc Tremblay', email: 'marc.t@example.com', plan: 'Basic', status: 'Pending', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Sophie Martin', email: 'sophie.m@example.com', plan: 'VIP', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Lucas Dubois', email: 'lucas.d@example.com', plan: 'Basic', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: 'Emma Blanc', email: 'emma.b@example.com', plan: 'Premium', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=5' },
];

const RecentUsersTable = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-neutral-800">Recent Users</h3>
        <button className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">User</th>
              <th className="px-6 py-4 font-semibold">Membership</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-gray-200" />
                  <div>
                    <p className="font-semibold text-neutral-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-neutral-700">{user.plan}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.status === 'Active' ? 'bg-green-100 text-green-700' :
                    user.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-neutral-800 transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RecentUsersTable;
