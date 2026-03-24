import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import API_URL from "./config";


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
    html2pdf().set(opt).from(element).save();
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
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 ring-1 ring-gray-100 p-6 mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <i className="fas fa-filter text-blue-600"></i>
            </div>
            <h2 className="text-lg font-black text-gray-900">Filter Schedules</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                Semester
              </label>
              <select
                name="semester"
                value={filters.semester}
                onChange={handleFilterChange}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none font-medium appearance-none"
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
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                Class
              </label>
              <select
                name="class"
                value={filters.class}
                onChange={handleFilterChange}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none font-medium appearance-none"
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
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                Branch
              </label>
              <select
                name="branch"
                value={filters.branch}
                onChange={handleFilterChange}
                disabled={!filters.class}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none font-medium disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
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
              className="px-6 py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <i className="fas fa-undo text-sm"></i>
              Reset
            </button>
          </div>
        </div>

        {filteredTimetables.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 ring-1 ring-gray-100 p-16 text-center">
            <i className="fas fa-calendar-times text-5xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 text-lg font-medium">
              {timetables.length > 0
                ? "No timetables match the selected filters"
                : "No timetable data available"}
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {filteredTimetables.map((table, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 ring-1 ring-gray-100 overflow-hidden"
                ref={(el) => (tableRefs.current[index] = el)}
              >
                <div className="px-6 sm:px-8 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="bg-blue-100 text-blue-800 font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5">
                      <i className="fas fa-layer-group text-xs"></i>
                      Sem {table.semester}
                    </span>
                    <span className="bg-purple-100 text-purple-800 font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5">
                      <i className="fas fa-users text-xs"></i>
                      {table.class}
                    </span>
                    <span className="bg-indigo-100 text-indigo-800 font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5">
                      <i className="fas fa-code-branch text-xs"></i>
                      {table.branch}
                    </span>
                  </div>
                  <button
                    onClick={() => downloadPDF(index)}
                    className="group px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-green-500/20 transition-all duration-300 text-sm whitespace-nowrap flex items-center gap-2"
                  >
                    <i className="fas fa-file-pdf"></i>
                    Download PDF
                    <i className="fas fa-download group-hover:translate-y-0.5 transition-transform text-xs"></i>
                  </button>
                </div>

                <div className="overflow-x-auto p-6 sm:p-8">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-900 to-gray-800">
                        <th className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-wider bg-gray-900 border-r border-gray-700">
                          <i className="fas fa-calendar-day mr-2"></i>Day
                        </th>
                        {timeSlots.map((time, i) => (
                          <th
                            key={i}
                            className="px-3 py-4 text-center text-xs font-bold text-gray-300 whitespace-nowrap border-r border-gray-700 last:border-0 uppercase tracking-wide"
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
                          className={`${dIdx % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-blue-50/30 transition-colors`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-gray-900 bg-gray-50 border-r border-gray-200 text-center">
                            {day.name}
                          </td>
                          {day.slots.map((slot, sIdx) => (
                            <td
                              key={sIdx}
                              className="px-3 py-4 text-center border-r border-gray-100 last:border-0"
                            >
                              {slot.subject ? (
                                <div className="flex flex-col items-center justify-center space-y-1.5">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                                    slot.type === "Lab"
                                      ? "bg-purple-100 text-purple-700"
                                      : "bg-green-100 text-green-700"
                                  }`}>
                                    {slot.type || "Lecture"}
                                  </span>
                                  <strong
                                    className="text-gray-900 text-sm block truncate max-w-[140px]"
                                    title={slot.subject}
                                  >
                                    {slot.subject}
                                  </strong>
                                  <span
                                    className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-bold truncate max-w-[140px]"
                                    title={slot.teacher}
                                  >
                                    {slot.teacher || "TBA"}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-gray-300 italic text-sm">
                                  —
                                </span>
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
