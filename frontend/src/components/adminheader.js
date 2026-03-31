import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import context from './context';
import { showToast } from '../utils/alerts';

const Adminheader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setflag } = useContext(context);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('flag');
    setflag(null);
    setIsMenuOpen(false);
    showToast("success", "Admin Session Cleared");
    navigate('/', { replace: true });
    window.location.reload();
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'TableMaker', path: '/timetable' },
    { name: 'Show Table', path: '/showtable' },
    { name: 'HOD', path: '/hod' }
  ];

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-700/50 py-2' 
          : 'bg-slate-900 py-4'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsMenuOpen(false)}>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <i className="fas fa-calendar-alt text-white text-lg"></i>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl text-white tracking-tight flex items-center">
                Timetable<span className="text-indigo-400">Hub</span>
              </span>
              <span className="text-[9px] font-black text-indigo-300 tracking-widest uppercase">Admin Portal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.name}
                  to={link.path} 
                  className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 relative ${
                    isActive 
                      ? 'text-white bg-white/10' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-indigo-500 rounded-t-full"></span>
                  )}
                </Link>
              );
            })}

            <div className="h-6 w-px bg-slate-700 mx-2"></div>

            <button 
              onClick={handleLogout} 
              className="ml-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-slate-800 border border-slate-700 hover:bg-rose-500 hover:border-rose-500 hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 flex items-center gap-2 group"
            >
              <span>Logout</span>
              <i className="fas fa-sign-out-alt text-slate-400 group-hover:text-white transition-colors"></i>
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-slate-900 border-t border-slate-800 ${
          isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-6 space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name}
                to={link.path} 
                className={`block px-4 py-3 rounded-xl text-base font-bold transition-all ${
                  isActive 
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          
          <div className="pt-4 mt-2 border-t border-slate-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-base font-bold text-white bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
            >
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Adminheader;