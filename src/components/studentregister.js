import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "./config";


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
  const [status, setStatus] = useState(null);
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
      setStatus({ success: false, message: "Passwords do not match" });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

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

      setStatus({
        success: true,
        message: "Registration successful! Redirecting to login...",
      });

      setTimeout(() => {
        navigate("/studentlogin");
      }, 2000);
    } catch (error) {
      setStatus({ success: false, message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-[-15%] left-[-10%] w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"></div>

      <div className="relative z-10 max-w-2xl w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl shadow-lg shadow-green-500/30 mb-4">
            <i className="fas fa-user-graduate text-white text-2xl"></i>
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Student Registration
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            Fill in your academic details to get started
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 ring-1 ring-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section: Personal Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-user text-blue-600 text-sm"></i>
                </div>
                <h3 className="text-sm font-black text-gray-700 uppercase tracking-wider">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={studentData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-green-500 focus:ring-4 focus:ring-green-100 focus:bg-white transition-all outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={studentData.email}
                    onChange={handleChange}
                    required
                    placeholder="student@university.edu"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-green-500 focus:ring-4 focus:ring-green-100 focus:bg-white transition-all outline-none font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Section: Security */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-lock text-purple-600 text-sm"></i>
                </div>
                <h3 className="text-sm font-black text-gray-700 uppercase tracking-wider">Security</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={studentData.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                    placeholder="Min. 6 characters"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={studentData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength="6"
                    placeholder="Re-type password"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all outline-none font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Section: Academic Details */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-graduation-cap text-green-600 text-sm"></i>
                </div>
                <h3 className="text-sm font-black text-gray-700 uppercase tracking-wider">Academic Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    name="rollNo"
                    value={studentData.rollNo}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 2024-CS-001"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-green-500 focus:ring-4 focus:ring-green-100 focus:bg-white transition-all outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                    Semester
                  </label>
                  <select
                    name="semester"
                    value={studentData.semester}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-green-500 focus:ring-4 focus:ring-green-100 focus:bg-white transition-all outline-none font-medium appearance-none"
                  >
                    <option value="">Select Semester</option>
                    {[...Array(8)].map((_, i) => (
                      <option key={i + 1} value={(i + 1).toString()}>
                        Semester {i + 1}
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
                    value={studentData.class}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-green-500 focus:ring-4 focus:ring-green-100 focus:bg-white transition-all outline-none font-medium appearance-none"
                  >
                    <option value="">Select Class</option>
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
                    value={studentData.branch}
                    onChange={handleChange}
                    required
                    disabled={!studentData.class}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-green-500 focus:ring-4 focus:ring-green-100 focus:bg-white transition-all outline-none font-medium disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
                  >
                    <option value="">Select Branch</option>
                    {studentData.class &&
                      classBranches[studentData.class].map((branch) => (
                        <option key={branch} value={branch}>
                          {branch}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full py-4 px-4 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-xl font-bold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Registering...
                </>
              ) : (
                <>
                  Create Account
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </>
              )}
            </button>

            {status && (
              <div
                className={`mt-4 p-4 rounded-xl font-semibold text-center flex items-center gap-3 justify-center ${status.success ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
              >
                <i className={`fas ${status.success ? "fa-check-circle" : "fa-exclamation-circle"}`}></i>
                {status.message}
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/studentlogin"
                  className="font-bold text-green-600 hover:text-green-700 transition-colors"
                >
                  Login here →
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
