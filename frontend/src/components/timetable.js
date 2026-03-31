import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_URL from "../config";
import { showToast, showAlert } from "../utils/alerts";

const Timetable = () => {
  const [teachers, setTeachers] = useState([]);
  const classBranches = {
    MCA: ["Computer Science", "Information Technology"],
    MBA: ["Business Administration", "Finance"],
    "B.Tech": ["Computer Science", "Electronics", "Mechanical"],
  };

  const [timetableData, setTimetableData] = useState({
    semester: "",
    class: "",
    branch: "",
    days: Array(5).fill().map((_, i) => ({
      name: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][i],
      slots: Array(7).fill({ subject: "", teacher: "", time: "", type: "" }),
    })),
    unavailableTeachers: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allTimetables, setAllTimetables] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const timeSlots = ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 01:00", "01:00 - 02:00", "02:00 - 03:00", "03:00 - 04:00"];
  const classTypes = ["Lecture", "Tutorial", "Practical", "Lab"];

  useEffect(() => {
    fetchTeachers();
    fetchAllTimetables();
    if (location.state && location.state.editData) {
      const { editData } = location.state;
      setTimetableData({ ...editData });
      setIsEditing(true);
      setEditId(editData._id);
      showToast("info", "Active Session: Editing Existing Schedule");
    }
  }, [location]);

  const fetchTeachers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/teachers`);
      const data = await response.json();
      setTeachers(data.data.map((t) => t.name));
    } catch (error) { showAlert("error", "Faculty Sync Error", "Could not load the member list from database."); }
  };

  const fetchAllTimetables = async () => {
    try {
      const response = await fetch(`${API_URL}/api/timetables`);
      const data = await response.json();
      setAllTimetables(data.data);
    } catch (error) { console.error(error); }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTimetableData(prev => ({ ...prev, [name]: value, ...(name === "class" ? { branch: "" } : {}) }));
  };

  const handleSlotChange = (dayIndex, slotIndex, field, value) => {
    const updatedDays = [...timetableData.days];
    updatedDays[dayIndex].slots[slotIndex] = { ...updatedDays[dayIndex].slots[slotIndex], [field]: value };
    setTimetableData(prev => ({ ...prev, days: updatedDays }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!timetableData.semester || !timetableData.class || !timetableData.branch) {
      showAlert("warning", "Missing Details", "Please select Semester, Department, and Branch before publishing.");
      return;
    }

    setIsSubmitting(true);
    try {
      const url = isEditing ? `${API_URL}/api/timetables/${editId}` : `${API_URL}/api/timetables`;
      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(timetableData),
      });

      if (!response.ok) throw new Error("Synchronization Error");
      showToast("success", isEditing ? "Schedule Updated Successfully!" : "Schedule Published Successfully!");
      navigate("/showtable");
    } catch (error) { showAlert("error", "Action Failed", error.message); } finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12 px-4 md:px-8 relative">
      <div className="max-w-[1700px] mx-auto space-y-8 animate-in fade-in duration-700">
        
        {/* Responsive Header */}
        <div className="card-premium flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white/70 backdrop-blur-xl border-slate-200">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
               <i className="fas fa-layer-group text-2xl"></i>
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{isEditing ? "Update Schedule" : "Create New Schedule"}</h1>
              <p className="text-slate-500 font-medium">Design academic timelines with automated conflict detection.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            {isEditing && (
              <button onClick={() => navigate("/showtable")} className="btn-secondary px-8 flex-grow lg:flex-grow-0">Cancel</button>
            )}
            <button onClick={handleSubmit} disabled={isSubmitting} className="btn-primary px-10 shadow-indigo-600/30 flex-grow lg:flex-grow-0">
               {isSubmitting ? "Publishing..." : isEditing ? "Update Changes" : "Publish Timetable"}
            </button>
          </div>
        </div>

        {/* Institutional Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[ 
            { label: "Semester", name: "semester", options: Array.from({ length: 8 }, (_, i) => `Semester ${i+1}`) },
            { label: "Department", name: "class", options: Object.keys(classBranches) },
            { label: "Specialty / Branch", name: "branch", options: timetableData.class ? classBranches[timetableData.class] : [], disabled: !timetableData.class }
          ].map(sel => (
            <div key={sel.name} className="card-premium p-6 border-slate-200 space-y-3 bg-white/50">
              <label className="label-base uppercase tracking-[0.2em] text-[10px] opacity-60">{sel.label}</label>
              <select name={sel.name} value={timetableData[sel.name]} onChange={handleInputChange} disabled={sel.disabled} className="input-base text-sm font-bold appearance-none bg-white">
                <option value="">Choose {sel.label}</option>
                {sel.options.map(opt => <option key={opt} value={opt.replace("Semester ", "")}>{opt}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* Master Grid */}
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-indigo-500/5 border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-separate border-spacing-0 min-w-[1400px]">
              <thead>
                <tr className="bg-slate-900">
                  <th className="p-6 text-center text-[10px] font-black text-white uppercase tracking-[0.2em] border-r border-slate-800 sticky left-0 z-30 bg-slate-900">Day / Period</th>
                  {timeSlots.map(time => (
                    <th key={time} className="p-6 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-800 last:border-0">{time}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {timetableData.days.map((day, dIdx) => (
                  <tr key={dIdx} className="group hover:bg-indigo-50/20 transition-colors">
                    <td className="sticky left-0 z-20 p-8 text-sm font-black text-slate-900 border-r border-slate-200 bg-white group-hover:bg-indigo-50/80 text-center uppercase tracking-tighter transition-colors">
                      {day.name}
                    </td>
                    {day.slots.map((slot, sIdx) => (
                      <td key={sIdx} className="p-4 border-r border-slate-100 last:border-0 min-w-[240px]">
                        <div className="card-premium p-5 space-y-4 bg-white/40 shadow-sm border-slate-100 group-hover:border-indigo-100 transition-all hover:scale-[1.02] hover:shadow-lg">
                           <input type="text" placeholder="Subject Name" value={slot.subject} onChange={(e) => handleSlotChange(dIdx, sIdx, "subject", e.target.value)} className="w-full bg-transparent border-b border-slate-200 focus:border-indigo-500 outline-none p-1 text-sm font-black text-slate-800 placeholder:opacity-30 transition-all" />
                           <select value={slot.teacher} onChange={(e) => handleSlotChange(dIdx, sIdx, "teacher", e.target.value)} className="w-full input-base text-[10px] font-bold py-1.5 px-3 bg-white/60">
                             <option value="">Select Faculty</option>
                             {teachers.map(t => <option key={t} value={t}>{t}</option>)}
                           </select>
                           <div className="flex gap-2">
                             <select value={slot.type} onChange={(e) => handleSlotChange(dIdx, sIdx, "type", e.target.value)} className="flex-grow input-base text-[10px] font-black text-indigo-600 bg-indigo-50 border-indigo-100 py-1.5 px-2">
                               <option value="">Mode</option>
                               {classTypes.map(type => <option key={type} value={type}>{type}</option>)}
                             </select>
                           </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timetable;