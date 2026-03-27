import React, { useContext } from "react";
import { Link } from "react-router-dom";
import context from "./context";

const LandingPage = () => {
  const { flag } = useContext(context);

  return (
    <div className="font-sans text-gray-800 leading-relaxed overflow-x-hidden m-0 p-0 bg-white">
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-12 md:py-24 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-[-5%] left-[-10%] w-64 md:w-96 h-64 md:h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[20%] right-[-5%] w-56 md:w-80 h-56 md:h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="flex-1 max-w-2xl mb-12 md:mb-0 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">Smart Scheduling 2.0</span>
          </div>
          
          <h1 className="text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 text-gray-900 tracking-tight">
            Master Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Academic Time
            </span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto md:mx-0">
            Never miss a lecture again. Our automated timetable system synchronizes your classes, 
            assignments, and exams into one seamless digital experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            {!flag && (
              <>
                <Link
                  to="/studentregister"
                  className="group relative px-8 py-4 rounded-2xl font-bold text-white bg-gray-900 overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-center"
                >
                  <div className="absolute inset-0 w-3 bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-[400ms] ease-out group-hover:w-full"></div>
                  <span className="relative group-hover:text-white">Student Get Started</span>
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 rounded-2xl font-bold text-gray-700 bg-white border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md text-center"
                >
                  Faculty / HOD Login
                </Link>
              </>
            )}
            {flag === 'student' && (
              <Link
                to="/studentdashboard"
                className="group relative px-8 py-4 rounded-2xl font-bold text-white bg-gray-900 overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-center"
              >
                <div className="absolute inset-0 w-3 bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-[400ms] ease-out group-hover:w-full"></div>
                <span className="relative group-hover:text-white">Go to Dashboard <i className="fas fa-arrow-right ml-2"></i></span>
              </Link>
            )}
            {(flag === 'admin' || flag === 'hod') && (
              <Link
                to="/hod"
                className="group relative px-8 py-4 rounded-2xl font-bold text-white bg-gray-900 overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-center"
              >
                <div className="absolute inset-0 w-3 bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-[400ms] ease-out group-hover:w-full"></div>
                <span className="relative group-hover:text-white">Admin Dashboard <i className="fas fa-arrow-right ml-2"></i></span>
              </Link>
            )}
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-8 justify-center md:justify-start">
            <div className="flex items-center gap-2">
              <i className="fas fa-shield-alt text-green-500 text-sm"></i>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Secure Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-clock text-blue-500 text-sm"></i>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Real-time Sync</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-headset text-purple-500 text-sm"></i>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">24/7 Support</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end relative z-10 w-full md:w-auto">
          {/* Floating UI Elements - hidden on tiny screens */}
          <div className="absolute -top-10 -left-10 hidden xl:block animate-bounce bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-20">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold">10:30</div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Upcoming</p>
                  <p className="text-sm font-bold">Data Structures</p>
                </div>
             </div>
          </div>

          <div className="relative group w-full max-w-sm md:max-w-md lg:max-w-lg">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
            <img
              src="https://img.freepik.com/free-vector/students-concept-illustration_114360-9087.jpg"
              alt="Students learning"
              className="relative w-full h-auto drop-shadow-2xl transition-all duration-500 group-hover:rotate-1"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 text-center">
            <div>
                <p className="text-3xl md:text-4xl font-black text-white">5K+</p>
                <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mt-2 px-2">Active Students</p>
            </div>
            <div>
                <p className="text-3xl md:text-4xl font-black text-white">100%</p>
                <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mt-2 px-2">Automated</p>
            </div>
            <div>
                <p className="text-3xl md:text-4xl font-black text-white">50+</p>
                <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mt-2 px-2">Departments</p>
            </div>
            <div>
                <p className="text-3xl md:text-4xl font-black text-white">24/7</p>
                <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mt-2 px-2">Access</p>
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-12 py-24 text-center bg-gray-50/50">
        <h2 className="text-3xl md:text-5xl font-black mb-6 text-gray-900 px-2 leading-tight">
           Designed for Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Excellence</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-500 mb-16 md:mb-24 max-w-2xl mx-auto px-4">
          Built to solve complex scheduling conflicts and keep you updated in real-time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 max-w-7xl mx-auto">
          {[
            { icon: "fa-calendar-alt", title: "Smart Timetable", desc: "Dynamic scheduling that updates instantly if a professor reschedules a class.", color: "blue" },
            { icon: "fa-book", title: "Resource Portal", desc: "One-click access to specific lecture materials linked directly to your schedule.", color: "purple" },
            { icon: "fa-chart-line", title: "Attendance Insight", desc: "Track your lecture attendance automatically against your weekly timetable.", color: "green" },
            { icon: "fa-comments", title: "Sync Updates", desc: "Get push notifications for emergency holiday declarations or venue changes.", color: "orange" }
          ].map((feature, idx) => (
            <div key={idx} className="group bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100 hover:shadow-2xl hover:border-transparent transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gray-100/50 rounded-bl-[5rem] transition-all group-hover:scale-[10] duration-700 opacity-50 z-0"></div>
                <div className={`relative z-10 w-16 h-16 rounded-2xl bg-${feature.color}-50 flex items-center justify-center mx-auto mb-8 transition-transform group-hover:rotate-12 group-hover:scale-110`}>
                    <i className={`fas ${feature.icon} text-2xl text-${feature.color}-600`}></i>
                </div>
                <h3 className="relative z-10 text-xl font-extrabold mb-4 text-gray-900 group-hover:text-blue-700 transition-colors">
                    {feature.title}
                </h3>
                <p className="relative z-10 text-gray-500 leading-relaxed font-medium text-sm md:text-base">
                    {feature.desc}
                </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-12 py-24 md:py-32 bg-white overflow-hidden">
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 px-2">The Student Voice</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto">
          <div className="bg-gray-50 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 relative border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <i className="fas fa-quote-left absolute top-10 right-10 text-6xl text-blue-200/40"></i>
            <p className="text-lg md:text-xl text-gray-700 font-medium italic mb-10 relative z-10 leading-relaxed">
              "The automatic timetable sync saved my semester. I used to manually write down my schedules, but now everything is just there on my phone."
            </p>
            <div className="flex items-center gap-5">
              <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Sarah" className="w-12 h-12 md:w-16 md:h-16 rounded-2xl object-cover ring-4 ring-white" />
              <div>
                <h4 className="text-base md:text-lg font-black text-gray-900">Sarah Johnson</h4>
                <p className="text-blue-600 font-bold text-xs md:text-sm tracking-wide">COMP SCIENCE, 3RD YEAR</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 relative hover:shadow-2xl transition-shadow duration-300">
            <i className="fas fa-quote-left absolute top-10 right-10 text-6xl text-white/5"></i>
            <p className="text-lg md:text-xl text-gray-200 font-medium italic mb-10 relative z-10 leading-relaxed">
              "I love how I can see which room my next lecture is in without hunting through emails. The UI is incredibly intuitive."
            </p>
            <div className="flex items-center gap-5">
              <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Michael" className="w-12 h-12 md:w-16 md:h-16 rounded-2xl object-cover ring-4 ring-gray-800" />
              <div>
                <h4 className="text-base md:text-lg font-black text-white">Michael Chen</h4>
                <p className="text-blue-400 font-bold text-xs md:text-sm tracking-wide">BUSINESS MGMT, 2ND YEAR</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {!flag && (
      <section className="mx-4 md:mx-12 my-20 rounded-[2.5rem] md:rounded-[3rem] py-20 md:py-24 text-center bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[200%] rotate-45 bg-white/20"></div>
        </div>
        <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10 px-6">
          <h2 className="text-3xl md:text-6xl font-black mb-8 leading-tight text-white">
            Ready to Streamline Your Day?
          </h2>
          <p className="text-lg md:text-xl mb-10 md:mb-12 text-blue-50 font-medium">
            Join the digital campus revolution and never miss a single minute of your education.
          </p>
          <Link
            to="/studentregister"
            className="group px-8 md:px-12 py-4 md:py-5 rounded-2xl font-black text-blue-700 bg-white shadow-2xl hover:bg-gray-100 hover:shadow-3xl transition-all duration-300 text-lg md:text-xl flex items-center gap-3"
          >
            Create Your Account
            <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
          </Link>
        </div>
      </section>
      )}

      {/* Professional Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-10">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <i className="fas fa-calendar-alt text-white text-lg"></i>
                </div>
                <span className="text-2xl font-bold text-white">Timetable<span className="text-blue-500">Hub</span></span>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed max-w-sm">
                Revolutionizing academic scheduling with smart technology. Helping students and faculty manage time efficiently.
              </p>
              <div className="flex gap-4">
                {[ "twitter", "linkedin-in", "github", "instagram" ].map(social => (
                  <a key={social} href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <i className={`fab fa-${social} text-sm`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="xs:col-span-1">
              <h3 className="text-white font-bold text-lg mb-6">Explore</h3>
              <ul className="space-y-4">
                {["Home", "About Us", "Features", "Pricing", "Contact"].map(item => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase().replace(" ", "")}`} className="text-gray-400 hover:text-blue-400 text-sm md:text-base transition-colors duration-300">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Students */}
            <div className="xs:col-span-1">
              <h3 className="text-white font-bold text-lg mb-6">Students</h3>
              <ul className="space-y-4">
                {!flag ? (
                  <>
                    <li><Link to="/studentregister" className="text-gray-400 hover:text-blue-400 text-sm md:text-base transition-colors">Register</Link></li>
                    <li><Link to="/studentlogin" className="text-gray-400 hover:text-blue-400 text-sm md:text-base transition-colors">Login</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/studentdashboard" className="text-gray-400 hover:text-blue-400 text-sm md:text-base transition-colors">Dashboard</Link></li>
                    <li><Link to="/showtable" className="text-gray-400 hover:text-blue-400 text-sm md:text-base transition-colors">Timetables</Link></li>
                  </>
                )}
              </ul>
            </div>

            {/* Faculty */}
            <div className="xs:col-span-1">
              <h3 className="text-white font-bold text-lg mb-6">Faculty</h3>
              <ul className="space-y-4">
                {!flag ? (
                  <li><Link to="/login" className="text-gray-400 hover:text-blue-400 text-sm md:text-base transition-colors">Faculty Login</Link></li>
                ) : (
                  <>
                    <li><Link to="/hod" className="text-gray-400 hover:text-blue-400 text-sm md:text-base transition-colors">HOD portal</Link></li>
                    <li><Link to="/timetable" className="text-gray-400 hover:text-blue-400 text-sm md:text-base transition-colors">TableMaker</Link></li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-gray-800 mt-16 pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-white font-bold text-xl mb-3">Newsletter</h3>
                <p className="text-gray-400 text-sm md:text-base">Stay updated with the latest scheduling features.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-5 py-3.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:shadow-lg transition-all duration-300">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-xs md:text-sm text-center md:text-left">
              © 2024 TimetableHub. Made with <i className="fas fa-heart text-red-500 mx-1"></i> for better education.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {["Privacy", "Terms", "Cookies"].map(policy => (
                <Link key={policy} to={`/${policy.toLowerCase()}`} className="text-gray-500 hover:text-blue-400 text-xs md:text-sm transition-colors">{policy} Policy</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles for Blobs and Animations */}
      <style>{`
        @keyframes blob {
          0% { transform: scale(1); }
          33% { transform: scale(1.1) translate(30px, -50px); }
          66% { transform: scale(0.9) translate(-20px, 20px); }
          100% { transform: scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;