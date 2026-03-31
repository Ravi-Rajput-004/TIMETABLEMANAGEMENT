import React from 'react';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Premium Decorative Background */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>

      <div className="relative z-10 max-w-lg w-full bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/60 p-12 md:p-16">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-indigo-500/20 rotate-3 transform hover:rotate-0 transition-transform duration-500">
            <i className="fas fa-hammer text-white text-4xl"></i>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">Under Construction</h1>
          
          <p className="text-slate-500 mb-10 leading-relaxed font-semibold text-lg max-w-sm">
            This workspace is being perfected for our next institutional release. 
          </p>

          {/* Progress Indicator */}
          <div className="w-full bg-slate-100 rounded-full h-3 mb-10 overflow-hidden shadow-inner flex p-0.5">
             <div className="h-full bg-gradient-to-r from-indigo-500 via-violet-600 to-indigo-700 rounded-full w-2/3 animate-pulse"></div>
          </div>
          
          <Link 
            to="/" 
            className="group w-full py-4.5 px-8 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-900/10 transition-all duration-500 flex items-center justify-center gap-3"
          >
            <i className="fas fa-chevron-left text-xs group-hover:-translate-x-1 transition-transform"></i>
            Return to Gateway
          </Link>
        </div>
      </div>
      
      <p className="relative z-10 mt-12 text-slate-400 text-xs font-black uppercase tracking-[0.2em] opacity-40">
        &copy; {new Date().getFullYear()} TimetableHub Enterprise. 
      </p>
    </div>
  );
};

export default ComingSoon;
