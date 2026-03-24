import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import context from './context';

const Adminheader = () => {
  const navigate = useNavigate();
  const { setflag } = useContext(context);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('flag');
    setflag(null);
    navigate('/', { replace: true });
    window.location.reload();
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <i className="fas fa-calendar-alt text-white text-lg"></i>
            </div>
            <span className="font-bold text-2xl text-gray-900 hidden sm:block transition-all duration-300">
              Timetable<span className="text-blue-600">Hub</span>
              <span className="text-xs font-semibold text-purple-600 ml-2 tracking-wide uppercase">Admin</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            <Link to="/" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
              Home
            </Link>
            <Link to="/timetable" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
              TableMaker
            </Link>
            <Link to="/showtable" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
              Show Table
            </Link>
            <Link to="/hod" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
              HOD
            </Link>
            <Link to="/" onClick={handleLogout} className="ml-4 px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
              Logout
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Adminheader;