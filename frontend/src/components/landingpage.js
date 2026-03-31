import React, { useContext } from "react";
import { Link } from "react-router-dom";
import context from "./context";

const LandingPage = () => {
  const { flag } = useContext(context);

  return (
    <div className="font-sans text-slate-800 leading-relaxed overflow-x-hidden bg-white">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="section-container bg-slate-50 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="flex-1 w-full text-center lg:text-left z-10 pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Academic Scheduling Redefined</span>
          </div>
          
          <h1 className="heading-xl text-slate-900 mb-6">
            Master Your <br className="hidden sm:block"/>
            <span className="text-gradient">
              Campus Time
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
            Seamlessly coordinate lectures, exams, and faculty schedules. A unified digital infrastructure designed for modern educational institutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            {!flag && (
              <>
                <Link
                  to="/studentregister"
                  className="btn-dark w-full sm:w-auto text-center"
                >
                  Student Portal <i className="fas fa-arrow-right text-sm"></i>
                </Link>
                <Link
                  to="/login"
                  className="btn-secondary w-full sm:w-auto text-center border-slate-300"
                >
                  <i className="fas fa-chalkboard-teacher text-slate-400"></i> Faculty Login
                </Link>
              </>
            )}
            {flag === 'student' && (
              <Link
                to="/studentdashboard"
                className="btn-primary w-full sm:w-auto text-center"
              >
                Go to Dashboard <i className="fas fa-arrow-right"></i>
              </Link>
            )}
            {(flag === 'admin' || flag === 'hod') && (
              <Link
                to="/hod"
                className="btn-dark w-full sm:w-auto text-center"
              >
                Admin Workspace <i className="fas fa-arrow-right"></i>
              </Link>
            )}
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-6 mt-12 justify-center lg:justify-start border-t border-slate-200/60 pt-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center"><i className="fas fa-shield-alt text-emerald-600 text-xs"></i></div>
              <span className="text-xs text-slate-600 font-bold uppercase tracking-wider">Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center"><i className="fas fa-bolt text-indigo-600 text-xs"></i></div>
              <span className="text-xs text-slate-600 font-bold uppercase tracking-wider">Real-time Sync</span>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full flex justify-center lg:justify-end relative z-10 min-h-[400px]">
          <div className="relative group w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-[550px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-700 -z-10"></div>
            <div className="bg-white p-2 rounded-3xl border border-slate-200 shadow-2xl relative overflow-hidden flex flex-col h-full">
               {/* Mockup Top Bar */}
               <div className="flex gap-1.5 px-4 py-3 border-b border-slate-100 mb-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
               </div>
               <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center">
                 <img
                  src="https://img.freepik.com/free-vector/schedule-concept-illustration_114360-1531.jpg"
                  alt="Dashboard Mockup"
                  className="w-full h-full object-cover rounded-xl"
                 />
               </div>
              <div className="absolute bottom-4 -left-4 sm:-left-8 bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 sm:gap-4 animate-bounce-slow">
                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600"><i className="fas fa-bell text-lg sm:text-xl"></i></div>
                 <div>
                    <h4 className="text-sm font-bold text-slate-900">Lecture Updated</h4>
                    <p className="text-[10px] sm:text-xs font-medium text-slate-500">Room 302 • 10:00 AM</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-200 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 text-center divide-x-0 lg:divide-x divide-slate-100">
            <div>
                <p className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">15K+</p>
                <p className="text-slate-500 text-xs sm:text-sm font-bold uppercase tracking-widest mt-2">Active Scholars</p>
            </div>
            <div>
                <p className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">100%</p>
                <p className="text-slate-500 text-xs sm:text-sm font-bold uppercase tracking-widest mt-2">Uptime Reliability</p>
            </div>
            <div>
                <p className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">40+</p>
                <p className="text-slate-500 text-xs sm:text-sm font-bold uppercase tracking-widest mt-2">Departments Synced</p>
            </div>
            <div>
                <p className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">0</p>
                <p className="text-slate-500 text-xs sm:text-sm font-bold uppercase tracking-widest mt-2">Scheduling Clashes</p>
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-12 py-32 text-center bg-slate-50">
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="heading-lg mb-6 text-slate-900">
             Engineered for <span className="text-indigo-600">Educational Excellence</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
            Eliminate administrative overhead. Our platform auto-resolves conflicts and delivers real-time updates directly to your personalized dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1600px] mx-auto">
          {[
            { icon: "fa-calendar-check", title: "Conflict Resolution", desc: "Automated engine that instantly blocks double-bookings for faculty and rooms.", color: "indigo" },
            { icon: "fa-cloud-download-alt", title: "Cloud synchronization", desc: "Access your schedule from any device, anywhere, always perfectly synced.", color: "violet" },
            { icon: "fa-chart-pie", title: "Analytical Insights", desc: "Comprehensive dashboards for HODs to monitor resource utilization.", color: "emerald" },
            { icon: "fa-sliders-h", title: "Dynamic Adjustments", desc: "Seamlessly push temporary adjustments and emergency cancellations.", color: "rose" }
          ].map((feature, idx) => (
            <div key={idx} className="card-premium text-left group">
                <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <i className={`fas ${feature.icon} text-2xl text-${feature.color}-600`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {feature.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">
                    {feature.desc}
                </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-12 py-32 bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-slate-50 rounded-full translate-x-1/2 -translate-y-1/2 -z-10"></div>
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-20">
            <h2 className="heading-md text-slate-900 mb-4 px-2">Trusted by Top Institutions</h2>
            <div className="w-24 h-1.5 bg-indigo-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200 hover:shadow-lg transition-shadow">
            <div className="flex text-amber-400 mb-6 gap-1"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div>
            <p className="text-lg text-slate-700 font-medium mb-8 leading-relaxed">
              "The automated conflict detection has saved our administrative team hundreds of hours per semester. It's an indispensable modern tool."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-700">SJ</div>
              <div className="text-left">
                <h4 className="text-base font-bold text-slate-900">Dr. Sarah Johnson</h4>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wide">Dean of Computer Science</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-10 border border-slate-800 hover:shadow-2xl transition-shadow relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full"></div>
            <div className="flex text-amber-400 mb-6 gap-1 relative z-10"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div>
            <p className="text-lg text-slate-300 font-medium mb-8 leading-relaxed relative z-10">
              "Finally, a timetable application that feels like it was built in this decade. Extremely snappy, reliable, and looks incredibly premium."
            </p>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center font-bold text-white border border-slate-700">MC</div>
              <div className="text-left">
                <h4 className="text-base font-bold text-white">Michael Chen</h4>
                <p className="text-indigo-400 text-xs font-bold uppercase tracking-wide">University Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {!flag && (
      <section className="mx-6 md:mx-12 my-24 rounded-3xl p-12 md:p-20 text-center bg-slate-900 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/20 blur-[100px] rounded-full"></div>
        <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight text-white tracking-tight">
            Ready to Upgrade Your <br className="hidden md:block"/> Academic Infrastructure?
          </h2>
          <p className="text-lg mb-10 text-slate-400 font-medium max-w-xl mx-auto">
            Deploy the smartest scheduling platform on your campus today. Seamless transitions. No technical debt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to="/studentregister"
              className="btn-secondary w-full sm:w-auto"
            >
              Get Started Now <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* Professional Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <i className="fas fa-calendar-alt text-white text-lg"></i>
                </div>
                <span className="text-xl font-extrabold text-slate-900 tracking-tight">Timetable<span className="text-indigo-600">Hub</span></span>
              </div>
              <p className="text-slate-500 mb-8 max-w-sm font-medium leading-relaxed">
                The institutional standard for academic coordination, timeline management, and faculty resource optimization.
              </p>
              <div className="flex gap-3">
                {[ "twitter", "linkedin-in", "github" ].map(social => (
                  <a key={social} href="#" className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all">
                    <i className={`fab fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>

            <div className="col-span-1">
              <h3 className="text-slate-900 font-bold mb-6 tracking-wide">Platform</h3>
              <ul className="space-y-3">
                {["Features", "Enterprise", "Security", "Pricing"].map(item => (
                  <li key={item}>
                    <Link to="/" className="text-slate-500 hover:text-indigo-600 font-medium transition-colors text-sm">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-1">
              <h3 className="text-slate-900 font-bold mb-6 tracking-wide">Resources</h3>
              <ul className="space-y-3">
                {["Documentation", "API Reference", "Support Center", "Status"].map(item => (
                  <li key={item}>
                    <Link to="/" className="text-slate-500 hover:text-indigo-600 font-medium transition-colors text-sm">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-1">
              <h3 className="text-slate-900 font-bold mb-6 tracking-wide">Company</h3>
              <ul className="space-y-3">
                {["About", "Careers", "Contact", "Partners"].map(item => (
                  <li key={item}>
                    <Link to="/" className="text-slate-500 hover:text-indigo-600 font-medium transition-colors text-sm">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm font-medium">
              © {new Date().getFullYear()} TimetableHub Inc. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/" className="text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors">Privacy Policy</Link>
              <Link to="/" className="text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
      <style>{`
        .animate-bounce-slow {
           animation: bounce 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;