import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  BarChart, Bar
} from 'recharts';

const userRegistrations = [
  { name: 'Jan', users: 120 }, { name: 'Feb', users: 180 },
  { name: 'Mar', users: 240 }, { name: 'Apr', users: 190 },
  { name: 'May', users: 290 }, { name: 'Jun', users: 345 },
];

const membershipData = [
  { name: 'Basic', value: 400 },
  { name: 'Premium', value: 300 },
  { name: 'VIP', value: 100 },
];
const COLORS = ['#171717', '#dc2626', '#f87171']; // Neutral-900, Red-600, Red-400

const monthlyRevenue = [
  { name: 'Jan', revenue: 15000 }, { name: 'Feb', revenue: 18000 },
  { name: 'Mar', revenue: 22000 }, { name: 'Apr', revenue: 20000 },
  { name: 'May', revenue: 23500 }, { name: 'Jun', revenue: 24500 },
];

const ChartsWidget = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Line Chart */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2"
      >
        <h3 className="text-lg font-bold text-neutral-800 mb-6">User Registrations (6 Months)</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userRegistrations}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
              <RechartsTooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
              />
              <Line type="monotone" dataKey="users" stroke="#dc2626" strokeWidth={3} dot={{ r: 4, fill: '#dc2626', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Pie Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-bold text-neutral-800 mb-6">Membership Distribution</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={membershipData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {membershipData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Bar Chart (Full Width) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-3"
      >
        <h3 className="text-lg font-bold text-neutral-800 mb-6">Monthly Revenue (€)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
              <RechartsTooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ fill: '#f9fafb' }}
              />
              <Bar dataKey="revenue" fill="#171717" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default ChartsWidget;
