import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import context from './context';
import { toast } from 'react-toastify';

const Adminheader = () => {
  const navigate = useNavigate();
  const { setflag } = useContext(context);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('flag');
    setflag(null);
    setIsMenuOpen(false);
    toast.info("Admin logged out successfully");
    navigate('/', { replace: true });
    window.location.reload();
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsMenuOpen(false)}>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <i className="fas fa-calendar-alt text-white text-lg"></i>
            </div>
            <span className="font-bold text-xl sm:text-2xl text-gray-900 transition-all duration-300 flex items-center">
              Timetable<span className="text-blue-600">Hub</span>
              <span className="hidden xs:inline-block text-[10px] font-semibold text-white bg-purple-600 px-2 py-0.5 rounded-md ml-2 tracking-wide uppercase">Admin</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
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

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none transition-all duration-300"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen border-b border-gray-100' : 'max-h-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2 bg-white/95 backdrop-blur-md">
          <Link to="/" className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/timetable" className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all" onClick={() => setIsMenuOpen(false)}>
            TableMaker
          </Link>
          <Link to="/showtable" className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all" onClick={() => setIsMenuOpen(false)}>
            Show Table
          </Link>
          <Link to="/hod" className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all" onClick={() => setIsMenuOpen(false)}>
            HOD
          </Link>
          <button
            onClick={handleLogout}
            className="w-full mt-4 flex items-center justify-center px-4 py-3 rounded-xl text-base font-bold text-white bg-gradient-to-r from-red-500 to-rose-600 shadow-md shadow-red-500/20"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Adminheader;