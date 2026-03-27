import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import API_URL from "../config";
import { toast } from "react-toastify";


const Showtable = () => {
  const [timetables, setTimetables] = useState([]);
  const [filteredTimetables, setFilteredTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    semester: "",
    class: "",
    branch: "",
  });

  const tableRefs = useRef([]);

  const classBranches = {
    MCA: ["Computer Science", "Information Technology"],
    MBA: ["Business Administration", "Finance"],
    "B.Tech": ["Computer Science", "Electronics", "Mechanical"],
  };

  const timeSlots = [
    "9:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-1:00",
    "1:00-2:00",
    "2:00-3:00",
    "3:00-4:00",
  ];

  useEffect(() => {
    const fetchTimetables = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/timetables`);
        setTimetables(response.data.data || []);
        setFilteredTimetables(response.data.data || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
        toast.error("Failed to load timetables");
      } finally {
        setLoading(false);
      }
    };

    fetchTimetables();
  }, []);

  useEffect(() => {
    const filtered = timetables.filter((table) => {
      const semesterMatch =
        filters.semester === "" ||
        table.semester.toString() === filters.semester;
      const classMatch = filters.class === "" || table.class === filters.class;
      const branchMatch =
        filters.branch === "" || table.branch === filters.branch;
      return semesterMatch && classMatch && branchMatch;
    });
    setFilteredTimetables(filtered);
  }, [filters, timetables]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "class" ? { branch: "" } : {}),
    }));
  };

  const resetFilters = () => {
    setFilters({
      semester: "",
      class: "",
      branch: "",
    });
  };

  const downloadPDF = (index) => {
    const element = tableRefs.current[index];
    const opt = {
      margin: 0.5,
      filename: `timetable_${filteredTimetables[index].class}_${filteredTimetables[index].branch}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
    };
    
    toast.info("Preparing your PDF download...");
    html2pdf().set(opt).from(element).save();
    toast.success("Download started!");
  };

  if (loading)
    return (
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
        <p className="text-gray-500 font-medium">Loading timetables...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-200 font-semibold flex items-center gap-3">
          <i className="fas fa-exclamation-triangle text-xl"></i>
          Error: {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/25 mb-4">
            <i className="fas fa-table text-white text-2xl"></i>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Timetable Overview
          </h1>
          <p className="text-gray-500 mt-2 font-medium text-lg">
            Browse and download class schedules
          </p>
        </div>

        {/* Filters Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/50 ring-1 ring-gray-100 p-5 sm:p-6 mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <i className="fas fa-filter text-blue-600"></i>
            </div>
            <h2 className="text-lg font-black text-gray-900">Filter Schedules</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                Semester
              </label>
              <select
                name="semester"
                value={filters.semester}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none font-medium appearance-none"
              >
                <option value="">All Semesters</option>
                {Array.from({ length: 8 }, (_, i) => i + 1).map((sem) => (
                  <option key={sem} value={sem.toString()}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                Class
              </label>
              <select
                name="class"
                value={filters.class}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none font-medium appearance-none"
              >
                <option value="">All Classes</option>
                {Object.keys(classBranches).map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                Branch
              </label>
              <select
                name="branch"
                value={filters.branch}
                onChange={handleFilterChange}
                disabled={!filters.class}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none font-medium disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
              >
                <option value="">All Branches</option>
                {filters.class &&
                  classBranches[filters.class].map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
              </select>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="w-full px-6 py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <i className="fas fa-undo text-sm"></i>
              Reset Filters
            </button>
          </div>
        </div>

        {filteredTimetables.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 ring-1 ring-gray-100 p-12 md:p-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-calendar-times text-4xl text-gray-300"></i>
            </div>
            <p className="text-gray-500 text-lg font-medium max-w-sm mx-auto">
              {timetables.length > 0
                ? "We couldn't find any timetables matching your current filters."
                : "No timetable data has been uploaded to the system yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-8 sm:space-y-12">
            {filteredTimetables.map((table, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-blue-500/10"
                ref={(el) => (tableRefs.current[index] = el)}
              >
                <div className="px-6 sm:px-8 py-6 sm:py-7 border-b border-gray-100 bg-gray-50/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-blue-600 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-2 text-xs md:text-sm">
                      <i className="fas fa-layer-group"></i>
                      Sem {table.semester}
                    </span>
                    <span className="bg-white text-gray-700 border-2 border-gray-100 font-bold px-4 py-2 rounded-xl flex items-center gap-2 text-xs md:text-sm">
                      <i className="fas fa-users text-blue-500"></i>
                      {table.class}
                    </span>
                    <span className="bg-white text-gray-700 border-2 border-gray-100 font-bold px-4 py-2 rounded-xl flex items-center gap-2 text-xs md:text-sm">
                      <i className="fas fa-code-branch text-purple-500"></i>
                      {table.branch}
                    </span>
                  </div>
                  <button
                    onClick={() => downloadPDF(index)}
                    className="w-full md:w-auto group px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-green-500/20 transition-all duration-300 text-sm flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-file-pdf"></i>
                    Export as PDF
                    <i className="fas fa-download group-hover:translate-y-0.5 transition-transform"></i>
                  </button>
                </div>

                <div className="overflow-x-auto p-4 sm:p-8 custom-scrollbar">
                  <table className="min-w-[800px] w-full border-separate border-spacing-0 rounded-2xl border border-gray-200 overflow-hidden">
                    <thead>
                      <tr className="bg-gray-900">
                        <th className="px-6 py-5 text-center text-xs font-black text-white uppercase tracking-widest border-r border-gray-800/50">
                          Day
                        </th>
                        {timeSlots.map((time, i) => (
                          <th
                            key={i}
                            className="px-4 py-5 text-center text-[10px] md:text-xs font-black text-gray-400 border-r border-gray-800/50 last:border-0 uppercase tracking-widest"
                          >
                            {time}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {table.days.map((day, dIdx) => (
                        <tr
                          key={dIdx}
                          className={`${dIdx % 2 === 0 ? "bg-white" : "bg-gray-50/30"} hover:bg-blue-50/50 transition-colors group`}
                        >
                          <td className="px-6 py-6 whitespace-nowrap text-sm font-black text-gray-900 bg-gray-50/50 border-r border-gray-200 text-center sticky left-0 z-10 group-hover:bg-blue-50 transition-colors">
                            {day.name}
                          </td>
                          {day.slots.map((slot, sIdx) => (
                            <td
                              key={sIdx}
                              className="px-4 py-6 text-center border-r border-gray-100 last:border-0 min-w-[140px]"
                            >
                              {slot.subject ? (
                                <div className="flex flex-col items-center justify-center gap-2">
                                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                                    slot.type === "Lab" || slot.type === "Practical"
                                      ? "bg-purple-100 text-purple-700"
                                      : "bg-green-100 text-green-700"
                                  }`}>
                                    {slot.type || "Lecture"}
                                  </span>
                                  <strong
                                    className="text-gray-900 text-sm block leading-tight font-extrabold"
                                    title={slot.subject}
                                  >
                                    {slot.subject}
                                  </strong>
                                  <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50/50 px-2.5 py-1 rounded-lg">
                                    <i className="fas fa-user-circle text-[10px]"></i>
                                    <span className="text-[10px] font-bold uppercase truncate max-w-[100px]" title={slot.teacher}>
                                      {slot.teacher || "TBA"}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-gray-200 font-light">—</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Showtable;
