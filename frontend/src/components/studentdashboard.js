import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";
import context from "./context";
import { showToast } from "../utils/alerts";

const StudentDashboard = () => {
  const [studentDetails, setStudentDetails] = useState(null);
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timetableError, setTimetableError] = useState(null);
  const { setflag } = useContext(context);
  const navigate = useNavigate();

  const timeSlots = [
    "9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-1:00",
    "1:00-2:00", "2:00-3:00", "3:00-4:00",
  ];

  const fetchTimetable = useCallback(async (details) => {
    try {
      const response = await fetch(`${API_URL}/api/timetables`);
      const data = await response.json();

      if (!response.ok) throw new Error("Synchronization Error");

      // Case-insensitive matching for robust lookups
      const filtered = data.data.find(
        (table) =>
          table.semester.toString() === details.semester.toString() &&
          table.class.trim().toLowerCase() === details.class.trim().toLowerCase() &&
          table.branch.trim().toLowerCase() === details.branch.trim().toLowerCase()
      );

      if (!filtered) throw new Error(`No schedule published for ${details.class} (${details.branch}) - Sem ${details.semester} yet.`);
      setTimetable(filtered);
    } catch (error) {
      setTimetableError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("student");
    if (stored) {
      const details = JSON.parse(stored);
      setStudentDetails(details);
      fetchTimetable(details);
    } else {
      navigate("/studentlogin");
    }
  }, [navigate, fetchTimetable]);

  const handleLogout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("flag");
    setflag(null);
    showToast("success", "Logged out successfully");
    navigate("/");
  };

  if (!studentDetails) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Profile Card */}
        <div className="card-premium flex flex-col md:flex-row justify-between items-center gap-6 border-indigo-100 bg-white/80 backdrop-blur-xl">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-500/20 ring-4 ring-white">
              <span className="text-white font-black text-3xl">
                {studentDetails.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Hi, {studentDetails.name}!
              </h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                  {studentDetails.class}
                </span>
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                  Sem {studentDetails.semester}
                </span>
                <span className="bg-violet-50 text-violet-700 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                  {studentDetails.branch}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-indigo-500/5 border border-slate-200 overflow-hidden">
          <div className="px-8 py-8 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                 <i className="fas fa-calendar-alt text-white text-xl"></i>
               </div>
               <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Weekly Schedule</h3>
                  <p className="text-slate-500 text-sm font-medium">Real-time synchronized updates</p>
               </div>
            </div>
            <div className="hidden sm:block">
               <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest border border-emerald-100">
                 Live Now
               </span>
            </div>
          </div>

          <div className="p-4 sm:p-8">
            {loading ? (
              <div className="flex flex-col items-center py-24 gap-6">
                 <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                 <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Synchronizing...</p>
              </div>
            ) : timetableError ? (
              <div className="p-16 text-center bg-rose-50 rounded-3xl border border-rose-100">
                 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <i className="fas fa-exclamation-triangle text-rose-500 text-3xl"></i>
                 </div>
                 <h4 className="text-xl font-black text-slate-900 mb-2">Schedule Not Found</h4>
                 <p className="text-slate-500 max-w-sm mx-auto font-medium">{timetableError}</p>
              </div>
            ) : (
              <div className="overflow-x-auto custom-scrollbar rounded-2xl border border-slate-200 shadow-sm">
                <table className="min-w-[1000px] w-full border-separate border-spacing-0">
                  <thead className="bg-slate-900">
                    <tr>
                      <th className="py-6 px-8 text-center text-[10px] font-black text-white uppercase tracking-[0.2em] border-r border-slate-800 sticky left-0 z-20 bg-slate-900">Day</th>
                      {timeSlots.map(time => (
                        <th key={time} className="px-6 py-6 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-800 last:border-0">{time}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {timetable.days.map((day, dIdx) => (
                      <tr key={dIdx} className="group hover:bg-indigo-50/40 transition-colors">
                        <td className="py-8 px-8 text-sm font-black text-slate-900 border-r border-slate-100 bg-slate-50/80 sticky left-0 z-10 group-hover:bg-indigo-50/80 text-center uppercase tracking-tighter">
                          {day.name}
                        </td>
                        {day.slots.map((slot, sIdx) => (
                          <td key={sIdx} className="px-6 py-8 text-center border-r border-slate-100 last:border-0 min-w-[180px]">
                            {slot.subject ? (
                              <div className="space-y-3">
                                <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                  slot.type === "Lab" || slot.type === "Practical" 
                                    ? "bg-violet-100 text-violet-700" 
                                    : "bg-indigo-100 text-indigo-700"
                                }`}>
                                  {slot.type || "Lecture"}
                                </span>
                                <div className="text-sm font-black text-slate-900 truncate" title={slot.subject}>{slot.subject}</div>
                                <div className="flex items-center justify-center gap-1.5 text-slate-400">
                                   <i className="fas fa-user-circle text-[10px]"></i>
                                   <span className="text-[10px] font-bold uppercase tracking-wider">{slot.teacher}</span>
                                </div>
                              </div>
                            ) : (
                              <div className="h-4 w-4 bg-slate-100 rounded-full mx-auto opacity-30"></div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
