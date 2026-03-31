import React from 'react';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8fafc] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden font-sans">
      
      {/* --- High-End Background Elements --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/30 rounded-full mix-blend-multiply filter blur-[120px] animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-200/30 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234338ca' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        {/* Floating Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white shadow-sm border border-slate-200/50 animate-bounce-slow">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Evolution in Progress</span>
        </div>

        {/* Main Card */}
        <div className="bg-white/40 backdrop-blur-3xl rounded-[3rem] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.08)] border border-white/80 p-10 md:p-20 relative overflow-hidden">
          
          <div className="flex flex-col items-center">
            {/* Elegant Icon Design */}
            <div className="relative mb-8 group">
               <div className="absolute inset-0 bg-indigo-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
               <div className="relative w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-700 group-hover:rotate-[360deg]">
                 <i className="fas fa-layer-group text-indigo-400 text-3xl"></i>
               </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Great</span> is Coming.
            </h1>
            
            <p className="text-slate-500 mb-12 leading-relaxed font-medium text-lg max-w-md mx-auto">
              Our engineering team is finalizing the next generation of institutional scheduling. Get ready for a seamless experience.
            </p>

            {/* Premium Progress Bar */}
            <div className="w-full max-w-sm mb-12">
              <div className="flex justify-between items-end mb-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Deployment Phase</span>
                <span className="text-sm font-black text-indigo-600">88%</span>
              </div>
              <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden p-[2px]">
                <div className="h-full bg-gradient-to-r from-indigo-500 via-violet-600 to-indigo-800 rounded-full w-[88%] shadow-[0_0_15px_rgba(79,70,229,0.4)]"></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link 
                to="/" 
                className="px-10 py-4 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-sm transition-all duration-500 shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3"
              >
                Return to Dashboard
              </Link>
              <button className="px-10 py-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 font-bold text-sm transition-all duration-300 flex items-center justify-center gap-3">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <p className="relative z-10 mt-16 text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">
        Enterprise Standard • 2024 Release
      </p>

      {/* Global CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 10s infinite alternate;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;