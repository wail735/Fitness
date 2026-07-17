import React from 'react';
import { motion } from 'framer-motion';
import StatCards from './dashboard/StatCards';
import ChartsWidget from './dashboard/ChartsWidget';
import QuickActions from './dashboard/QuickActions';
import RecentUsersTable from './dashboard/RecentUsersTable';
import RecentActivities from './dashboard/RecentActivities';
import TopCoachesWidget from './dashboard/TopCoachesWidget';
import LatestReviewsWidget from './dashboard/LatestReviewsWidget';
import RecentPayments from './dashboard/RecentPayments';

const Dashboard = () => {
  return (
    <div className="pb-10">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex justify-between items-end"
      >
        <div>
          <h1 className="text-3xl font-black text-neutral-900 tracking-tight mb-2">Dashboard Overview</h1>
          <p className="text-gray-500 font-medium">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-gray-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </motion.div>

      <StatCards />
      
      <QuickActions />

      <ChartsWidget />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2">
          <RecentUsersTable />
        </div>
        <div className="space-y-6">
          <TopCoachesWidget />
          <RecentPayments />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivities />
        <LatestReviewsWidget />
      </div>
    </div>
  );
};

export default Dashboard;