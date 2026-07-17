import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden text-neutral-800 font-sans">
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;