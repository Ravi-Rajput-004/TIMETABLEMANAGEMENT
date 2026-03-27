import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config";
import { toast } from "react-toastify";


const StudentLogin = () => {

  const timeSlots = [
    "9:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-1:00",
    "1:00-2:00",
    "2:00-3:00",
    "3:00-4:00",
  ];

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [studentDetails, setStudentDetails] = useState(null);
  const [timetable, setTimetable] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingTimetable, setLoadingTimetable] = useState(false);
  const [timetableError, setTimetableError] = useState(null);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/students/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      toast.success(`Welcome back, ${data.data.name}!`);
      setStudentDetails(data.data);
      localStorage.setItem("student", JSON.stringify(data.data));
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTimetable = useCallback(async () => {
    if (!studentDetails) return;

    setLoadingTimetable(true);
    setTimetableError(null);

    try {
      const response = await fetch(`${API_URL}/api/timetables`);
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to fetch timetable");

      const filteredTimetable = data.data.find(
          (table) =>
              table.semester.toString() === studentDetails.semester &&
              table.class === studentDetails.class &&
              table.branch === studentDetails.branch,
      );

      if (!filteredTimetable) {
        throw new Error(
            "No timetable found for your class, semester and branch",
        );
      }

      setTimetable(filteredTimetable);
    } catch (error) {
      setTimetableError(error.message);
      setTimetable(null);
    } finally {
      setLoadingTimetable(false);
    }
  }, [studentDetails]);

  useEffect(() => {
    const storedStudent = localStorage.getItem("student");
    if (storedStudent) {
      setStudentDetails(JSON.parse(storedStudent));
    }
  }, []);

  useEffect(() => {
    if (studentDetails) {
      fetchTimetable();
    }
  }, [studentDetails, fetchTimetable]);

  const handleLogout = () => {
    localStorage.removeItem("student");
    setStudentDetails(null);
    setTimetable(null);
    toast.info("Logged out from student dashboard");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      {!studentDetails ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="relative z-10 max-w-md w-full">
            {/* Brand Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30 mb-4">
                <i className="fas fa-graduation-cap text-white text-2xl"></i>
              </div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                Student Login
              </h2>
              <p className="text-gray-500 mt-2 font-medium">
                Access your academic dashboard
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 ring-1 ring-gray-100">
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <i className="fas fa-envelope text-gray-400"></i>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required
                      placeholder="student@university.edu"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <i className="fas fa-lock text-gray-400"></i>
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full py-4 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Logging in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </>
                  )}
                </button>

                {error && (
                  <div className="mt-4 p-4 rounded-xl font-semibold text-center bg-red-50 text-red-700 border border-red-200 flex items-center gap-3 justify-center">
                    <i className="fas fa-exclamation-circle"></i>
                    {error}
                  </div>
                )}
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <Link
                    to="/studentregister"
                    className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Register here →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 max-w-6xl w-full mx-auto">
          {/* Student Dashboard Header */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 ring-1 ring-gray-100 p-6 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <span className="text-white font-black text-xl">
                    {studentDetails.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">
                    Welcome back, {studentDetails.name}!
                  </h2>
                  <p className="text-sm text-gray-500 font-medium">
                    <i className="fas fa-graduation-cap mr-1"></i>
                    {studentDetails.class} · {studentDetails.branch} · Semester {studentDetails.semester}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/20 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          </div>

          {/* Timetable Section */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="px-6 sm:px-8 py-6 border-b border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <i className="fas fa-calendar-alt text-white text-sm"></i>
                </div>
                <h3 className="text-xl font-black text-gray-900">
                  Your Weekly Schedule
                </h3>
              </div>
              <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-blue-100">
                {studentDetails.class} · Sem {studentDetails.semester}
              </span>
            </div>

            <div className="p-4 sm:p-8">
              {loadingTimetable ? (
                <div className="flex flex-col justify-center items-center py-20 gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-blue-600"></div>
                  <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Fetching Schedule...</p>
                </div>
              ) : timetableError ? (
                <div className="p-10 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-center font-bold flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <i className="fas fa-exclamation-triangle text-2xl"></i>
                  </div>
                  <p className="max-w-sm mx-auto">{timetableError}</p>
                </div>
              ) : timetable ? (
                <div className="overflow-x-auto custom-scrollbar rounded-2xl border border-gray-100 shadow-sm">
                  <table className="min-w-[800px] w-full border-separate border-spacing-0">
                    <thead>
                      <tr className="bg-gray-900">
                        <th
                          scope="col"
                          className="py-5 px-6 text-center text-xs font-black text-white uppercase tracking-widest border-r border-gray-800 bg-gray-900 sticky left-0 z-20"
                        >
                          Day
                        </th>
                        {timeSlots.map((time, i) => (
                          <th
                            key={i}
                            scope="col"
                            className="px-4 py-5 text-center text-[10px] font-black text-gray-400 border-r border-gray-800 last:border-0 uppercase tracking-widest"
                          >
                            {time}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {timetable.days.map((day, dIdx) => (
                        <tr
                          key={dIdx}
                          className={`${dIdx % 2 === 0 ? "bg-white" : "bg-gray-50/20"} hover:bg-blue-50/50 transition-colors group`}
                        >
                          <td className="whitespace-nowrap py-6 px-6 text-sm font-black text-gray-900 border-r border-gray-100 bg-gray-50/50 sticky left-0 z-10 group-hover:bg-blue-50 transition-colors text-center">
                            {day.name}
                          </td>
                          {day.slots.map((slot, sIdx) => (
                            <td
                              key={sIdx}
                              className="px-4 py-6 text-center border-r border-gray-100 last:border-0 min-w-[150px]"
                            >
                              {slot.subject ? (
                                <div className="flex flex-col items-center justify-center gap-2">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                    slot.type === "Lab" || slot.type === "Practical"
                                      ? "bg-purple-100 text-purple-700"
                                      : "bg-blue-100 text-blue-700"
                                  }`}>
                                    {slot.type || "Lecture"}
                                  </span>
                                  <strong
                                    className="text-gray-900 text-sm block leading-tight font-extrabold"
                                    title={slot.subject}
                                  >
                                    {slot.subject}
                                  </strong>
                                  <div className="flex items-center gap-1 text-gray-400">
                                    <i className="fas fa-user-circle text-[10px]"></i>
                                    <span className="text-[10px] font-bold uppercase truncate max-w-[110px]" title={slot.teacher}>
                                      {slot.teacher}
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
              ) : (
                <div className="p-20 text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-calendar-times text-4xl text-gray-200"></i>
                  </div>
                  <p className="text-gray-500 font-extrabold uppercase text-xs tracking-widest">No Schedule Data</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentLogin;
