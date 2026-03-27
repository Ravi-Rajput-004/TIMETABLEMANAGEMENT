import React, { useState, useEffect } from "react";
import API_URL from "../config";
import { toast } from "react-toastify";


const Hod = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    department: "",
    specialization: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/teachers`);
      if (!response.ok) {
        throw new Error("Failed to fetch teachers");
      }
      const data = await response.json();
      setTeachers(data.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/teachers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeacher),
      });

      if (!response.ok) {
        throw new Error("Failed to add teacher");
      }

      toast.success("Teacher added successfully!");
      setNewTeacher({
        name: "",
        email: "",
        department: "",
        specialization: "",
      });
      fetchTeachers();
    } catch (error) {
       toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-[-10%] right-[-5%] w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/25 mb-4">
            <i className="fas fa-chalkboard-teacher text-white text-2xl"></i>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            HOD Dashboard
          </h1>
          <p className="text-gray-500 mt-2 font-medium text-lg">
            Manage your faculty team
          </p>
        </div>

        {/* Add Teacher Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 ring-1 ring-gray-100 p-8 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <i className="fas fa-user-plus text-green-600"></i>
            </div>
            <h2 className="text-xl font-black text-gray-900">
              Add New Teacher
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-user text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={newTeacher.name}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none font-medium"
                    required
                    placeholder="Dr. John Smith"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-gray-400"></i>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={newTeacher.email}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none font-medium"
                    required
                    placeholder="teacher@university.edu"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                  Department
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-building text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    name="department"
                    value={newTeacher.department}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none font-medium"
                    required
                    placeholder="Computer Science"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                  Specialization
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-flask text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    name="specialization"
                    value={newTeacher.specialization}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none font-medium"
                    required
                    placeholder="Machine Learning"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="group px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Adding...
                </>
              ) : (
                <>
                  <i className="fas fa-plus"></i>
                  Add Teacher
                </>
              )}
            </button>
          </form>
        </div>

        {/* Teacher Directory */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-6 sm:px-8 py-6 border-b border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <i className="fas fa-users text-white text-sm"></i>
              </div>
              <h2 className="text-xl font-black text-gray-900">
                Faculty Directory
              </h2>
            </div>
            <span className="bg-indigo-50 text-indigo-700 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-indigo-100">
              {teachers.length} Active Members
            </span>
          </div>

          {isLoading ? (
            <div className="flex flex-col justify-center items-center py-20 gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-100 border-t-indigo-600"></div>
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Loading Records...</p>
            </div>
          ) : teachers.length === 0 ? (
            <div className="text-center py-20 px-6">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-user-slash text-3xl text-gray-300"></i>
              </div>
              <p className="text-gray-500 font-medium max-w-xs mx-auto">No teachers have been added to the directory yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="min-w-[700px] w-full border-separate border-spacing-0">
                <thead>
                  <tr className="bg-white">
                    <th scope="col" className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                      Faculty Member
                    </th>
                    <th scope="col" className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                      Contact Information
                    </th>
                    <th scope="col" className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                      Department
                    </th>
                    <th scope="col" className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                      Specialization
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {teachers.map((teacher, idx) => (
                    <tr
                      key={teacher._id}
                      className="hover:bg-indigo-50/30 transition-colors group"
                    >
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md group-hover:scale-110 transition-transform">
                            {teacher.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-extrabold text-gray-900">{teacher.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-gray-600">
                          <i className="fas fa-envelope text-xs text-indigo-400"></i>
                          <span className="text-sm font-medium">{teacher.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-[10px] font-black rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-tighter">
                          {teacher.department}
                        </span>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-gray-600">
                          <i className="fas fa-award text-xs text-amber-500"></i>
                          <span className="text-sm font-bold">{teacher.specialization}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hod;
