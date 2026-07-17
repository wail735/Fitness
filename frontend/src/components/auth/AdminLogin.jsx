import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@fitness.com' && password === 'admin123') {
      localStorage.setItem('user', JSON.stringify({ email, role: 'admin' }));
      navigate('/admin');
    } else {
      alert('Identifiants incorrects');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className="bg-neutral-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required 
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Mot de passe</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required 
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition duration-200"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;