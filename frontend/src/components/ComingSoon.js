import React from 'react';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-[-15%] left-[-10%] w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"></div>

      <div className="relative z-10 max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 ring-1 ring-gray-100 p-10">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25">
            <i className="fas fa-rocket text-white text-3xl"></i>
          </div>
          
          <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Coming Soon</h1>
          
          <p className="text-gray-500 mb-8 leading-relaxed font-medium">
            We're working hard to bring you this feature. Stay tuned for exciting updates!
          </p>

          {/* Progress Indicator */}
          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2.5 rounded-full w-3/4 animate-pulse"></div>
          </div>
          
          <Link 
            to="/" 
            className="group w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
            Back to Home
          </Link>
        </div>
      </div>
      
      <p className="relative z-10 mt-8 text-gray-400 text-sm font-medium">
        &copy; {new Date().getFullYear()} TimetableHub. All rights reserved.
      </p>
    </div>
  );
};

export default ComingSoon;
