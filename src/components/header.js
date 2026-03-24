import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import context from './context';

const Header = () => {
  const { flag, setflag } = useContext(context);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('flag');
    setflag(null);
    navigate('/');
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
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            <Link to="/" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
              Home
            </Link>
            <Link to="/studentregister" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
              Student Register
            </Link>

            {flag ? (
              <>
                {flag === 'student' && (
                  <Link to="/studentdashboard" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="ml-4 px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Link to="/studentlogin" className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  Student Login
                </Link>
                <Link to="/login" className="px-5 py-2 rounded-xl text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all duration-300">
                  Login
                </Link>
                <Link to="/signup" className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
