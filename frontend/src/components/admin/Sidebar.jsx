import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Dumbbell, 
  CreditCard, 
  Calendar, 
  Activity, 
  Apple, 
  Star, 
  Bell, 
  Settings, 
  UserCircle,
  LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Coaches', path: '/admin/coaches', icon: UserCircle },
    { name: 'Memberships', path: '/admin/memberships', icon: CreditCard },
    { name: 'Workout Programs', path: '/admin/workouts', icon: Calendar },
    { name: 'Exercises', path: '/admin/exercises', icon: Dumbbell },
    { name: 'Nutrition Plans', path: '/admin/nutrition', icon: Apple },
    { name: 'Payments', path: '/admin/payments', icon: Activity },
    { name: 'Reviews', path: '/admin/reviews', icon: Star },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell },
  ];

  const bottomLinks = [
    { name: 'Settings', path: '/admin/settings', icon: Settings },
    { name: 'Profile', path: '/admin/profile', icon: UserCircle },
  ];

  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;
    
    return (
      <Link 
        to={item.path} 
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive 
            ? 'bg-red-600 text-white shadow-md shadow-red-500/20' 
            : 'text-gray-400 hover:bg-neutral-800 hover:text-white'
        }`}
      >
        <Icon size={20} className={isActive ? 'text-white' : 'text-gray-400'} />
        <span className="font-medium">{item.name}</span>
        {isActive && (
          <motion.div 
            layoutId="sidebar-active"
            className="absolute left-0 w-1 h-8 bg-red-600 rounded-r-md"
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </Link>
    );
  };

  return (
    <aside className="w-64 bg-neutral-900 text-white flex flex-col h-screen overflow-y-auto border-r border-neutral-800 shadow-2xl relative">
      <div className="p-6 sticky top-0 bg-neutral-900 z-10 border-b border-neutral-800">
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
          <Dumbbell className="text-red-500" size={28} />
          <span>FIT<span className="text-red-500">ADMIN</span></span>
        </h2>
      </div>
      
      <div className="flex-1 px-4 py-6 space-y-8">
        <div>
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Menu Principal</p>
          <nav className="space-y-1 relative">
            {navLinks.map((link) => (
              <NavItem key={link.name} item={link} />
            ))}
          </nav>
        </div>
        
        <div>
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Préférences</p>
          <nav className="space-y-1">
            {bottomLinks.map((link) => (
              <NavItem key={link.name} item={link} />
            ))}
          </nav>
        </div>
      </div>

      <div className="p-4 sticky bottom-0 bg-neutral-900 border-t border-neutral-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
