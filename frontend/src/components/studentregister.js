import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../config";
import { toast } from "react-toastify";


const StudentRegister = () => {
  const classBranches = {
    MCA: ["Computer Science", "Information Technology"],
    MBA: ["Business Administration", "Finance"],
    "B.Tech": ["Computer Science", "Electronics", "Mechanical"],
  };

  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rollNo: "",
    semester: "",
    class: "",
    branch: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "class" ? { branch: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (studentData.password !== studentData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Registration failed");

      toast.success("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/studentlogin");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 md:py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-[-5%] left-[-10%] w-64 md:w-96 h-64 md:h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-64 md:w-96 h-64 md:h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-2xl w-full">
        {/* Brand Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-teal-700 rounded-2xl shadow-xl shadow-green-500/20 mb-6">
            <i className="fas fa-user-graduate text-white text-2xl"></i>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
             Student Join
          </h1>
          <p className="text-gray-500 font-bold uppercase text-[10px] md:text-xs tracking-widest px-4">
             Unlock your digital academic schedule
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-2xl p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-white/50 ring-1 ring-gray-100/50">
          <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
            {/* Section: Personal Info */}
            <div className="space-y-6">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100 shadow-sm">
                    <i className="fas fa-user text-blue-600 text-[10px]"></i>
                  </div>
                  <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest">Personal Details</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={studentData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-green-600 focus:bg-white transition-all outline-none font-bold text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Email ID</label>
                    <input
                      type="email"
                      name="email"
                      value={studentData.email}
                      onChange={handleChange}
                      required
                      placeholder="name@college.edu"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-green-600 focus:bg-white transition-all outline-none font-bold text-sm"
                    />
                  </div>
               </div>
            </div>

            {/* Section: Academic Info */}
            <div className="space-y-6">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center border border-green-100 shadow-sm">
                    <i className="fas fa-graduation-cap text-green-600 text-[10px]"></i>
                  </div>
                  <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest">Academic Info</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Roll Number</label>
                    <input
                      type="text"
                      name="rollNo"
                      value={studentData.rollNo}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 21CS001"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-green-600 focus:bg-white transition-all outline-none font-bold text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Semester</label>
                    <select
                      name="semester"
                      value={studentData.semester}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-green-600 focus:bg-white transition-all outline-none font-bold text-sm appearance-none"
                    >
                      <option value="">Select Sem</option>
                      {[1,2,3,4,5,6,7,8].map(s => (
                        <option key={s} value={s.toString()}>Semester {s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Class</label>
                    <select
                      name="class"
                      value={studentData.class}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-green-600 focus:bg-white transition-all outline-none font-bold text-sm appearance-none"
                    >
                      <option value="">Select Class</option>
                      {Object.keys(classBranches).map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Branch</label>
                    <select
                      name="branch"
                      value={studentData.branch}
                      onChange={handleChange}
                      required
                      disabled={!studentData.class}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-green-600 focus:bg-white transition-all outline-none font-bold text-sm disabled:opacity-50 appearance-none"
                    >
                      <option value="">Select Branch</option>
                      {studentData.class && classBranches[studentData.class].map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
               </div>
            </div>

            {/* Section: Security */}
            <div className="space-y-6">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center border border-purple-100 shadow-sm">
                    <i className="fas fa-lock text-purple-600 text-[10px]"></i>
                  </div>
                  <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest">Security</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={studentData.password}
                      onChange={handleChange}
                      required
                      minLength="6"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-purple-600 focus:bg-white transition-all outline-none font-bold text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Verify Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={studentData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength="6"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-purple-600 focus:bg-white transition-all outline-none font-bold text-sm"
                    />
                  </div>
               </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full py-4 px-6 bg-gradient-to-r from-green-600 to-teal-700 hover:from-green-700 hover:to-teal-800 text-white rounded-2xl font-black shadow-xl shadow-green-500/30 hover:shadow-green-500/40 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/50 border-t-white"></div>
                    <span className="uppercase tracking-widest text-xs">Processing...</span>
                  </>
                ) : (
                  <>
                    <span className="uppercase tracking-widest text-xs">Complete Registration</span>
                    <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  </>
                )}
              </button>
            </div>

            <div className="pt-8 border-t border-gray-100 flex flex-col items-center gap-3">
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest text-center">
                Already have an academic account?
              </p>
              <Link
                to="/studentlogin"
                className="text-green-600 text-sm font-black hover:text-green-700 transition-colors flex items-center gap-1 group"
              >
                Login to Dashboard
                <i className="fas fa-chevron-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
