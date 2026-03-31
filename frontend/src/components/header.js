import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import context from './context';
import { showToast } from '../utils/alerts';

const Header = () => {
  const { flag, setflag } = useContext(context);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("flag");
    localStorage.removeItem("student"); // Also clear student data
    setflag(null);
    setIsMenuOpen(false);
    showToast("success", "Admin session ended");
    navigate('/', { replace: true });
    // Force a smooth reload to clear any lingering context
    window.location.reload();
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsMenuOpen(false)}>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <i className="fas fa-calendar-alt text-white text-lg"></i>
            </div>
            <span className="font-bold text-xl sm:text-2xl text-slate-900 transition-all duration-300">
              Timetable<span className="text-indigo-600">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 w-full justify-end">
            <Link to="/" className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300">
              Home
            </Link>
            <Link to="/studentregister" className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300">
              Student Register
            </Link>

            {flag ? (
              <>
                {flag === 'student' && (
                  <Link to="/studentdashboard" className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300">
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="ml-4 btn-dark"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Link to="/studentlogin" className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                  Student Login
                </Link>
                <Link to="/login" className="px-5 py-2 rounded-xl text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-all duration-300">
                  Faculty Login
                </Link>
                <Link to="/signup" className="btn-primary ml-2">
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none transition-all duration-300"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen border-b border-slate-100' : 'max-h-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2 bg-white/95 backdrop-blur-md">
          <Link to="/" className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/studentregister" className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all" onClick={() => setIsMenuOpen(false)}>
            Student Register
          </Link>
          
          {flag ? (
            <>
              {flag === 'student' && (
                <Link to="/studentdashboard" className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="w-full mt-4 btn-dark py-3"
              >
                 <i className="fas fa-sign-out-alt mr-2"></i>Logout
              </button>
            </>
          ) : (
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <Link to="/studentlogin" className="block px-4 py-3 rounded-xl text-base font-medium text-center text-indigo-600 bg-indigo-50" onClick={() => setIsMenuOpen(false)}>
                Student Login
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/login" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-bold text-indigo-600 border-2 border-indigo-50 transition-all" onClick={() => setIsMenuOpen(false)}>
                  Faculty Login
                </Link>
                <Link to="/signup" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-500/20" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
