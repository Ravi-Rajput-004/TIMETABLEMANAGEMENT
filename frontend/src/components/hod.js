import React, { useState, useEffect } from "react";
import API_URL from "../config";
import { showToast, showAlert, showConfirm } from "../utils/alerts";

const Hod = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    contact: "",
    department: "",
    specialization: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/teachers`);
      if (!response.ok) throw new Error("Failed to fetch teachers");
      const data = await response.json();
      setTeachers(data.data);
    } catch (error) {
      showAlert("error", "Error", error.message);
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
      const isUpdating = editingId !== null;
      const url = isUpdating ? `${API_URL}/api/teachers/${editingId}` : `${API_URL}/api/teachers`;
      const method = isUpdating ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTeacher),
      });

      if (!response.ok) throw new Error(`Failed to ${isUpdating ? "update" : "add"} teacher`);

      showToast("success", `Teacher ${isUpdating ? "updated" : "added"} successfully!`);
      resetForm();
      fetchTeachers();
    } catch (error) {
       showAlert("error", "Action Failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (teacher) => {
    setNewTeacher({
      name: teacher.name,
      email: teacher.email,
      contact: teacher.contact || "",
      department: teacher.department,
      specialization: teacher.specialization,
    });
    setEditingId(teacher._id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    const isConfirmed = await showConfirm(
      "Confirm Removal",
      "This action will permanently delete the faculty record from the database. Are you sure?"
    );
    
    if(!isConfirmed) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/teachers/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Delete operation failed");
      showToast("success", "Faculty Record Purged");
      fetchTeachers();
      if(editingId === id) resetForm();
    } catch (error) {
      showAlert("error", "System Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setNewTeacher({ name: "", email: "", contact: "", department: "", specialization: "" });
    setEditingId(null);
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Page Header */}
        <div className="card-premium flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/70 backdrop-blur-xl border-slate-200">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Faculty Workspace</h1>
            <p className="text-slate-500 font-medium mt-1">Manage institutional teaching resources and department specialty.</p>
          </div>
          <button
            onClick={() => isFormOpen ? resetForm() : setIsFormOpen(true)}
            className={`btn-primary shadow-indigo-600/20 ${isFormOpen ? 'bg-slate-900 border-0' : ''}`}
          >
            <i className={`fas ${isFormOpen ? 'fa-times' : 'fa-plus-circle'}`}></i>
            {isFormOpen ? "Cancel Registration" : "Register New Faculty"}
          </button>
        </div>

        {/* Dynamic Form */}
        {isFormOpen && (
          <div className="card-premium border-indigo-200 bg-indigo-50/10 shadow-2xl shadow-indigo-500/5 animate-in zoom-in-95 duration-300">
            <h2 className="text-xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
               <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                 <i className={`fas ${editingId ? "fa-user-edit" : "fa-user-plus"}`}></i>
               </div>
               {editingId ? "Edit Faculty Profile" : "New Faculty Registration"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="label-base uppercase tracking-widest text-[10px]">Full Professional Name</label>
                  <input type="text" name="name" value={newTeacher.name} onChange={handleInputChange} className="input-base" required placeholder="Dr. John Smith" />
                </div>
                <div className="space-y-2">
                  <label className="label-base uppercase tracking-widest text-[10px]">Institutional Email</label>
                  <input type="email" name="email" value={newTeacher.email} onChange={handleInputChange} className="input-base" required placeholder="name@university.edu" />
                </div>
                <div className="space-y-2">
                  <label className="label-base uppercase tracking-widest text-[10px]">Emergency Contact</label>
                  <input type="text" name="contact" value={newTeacher.contact} onChange={handleInputChange} className="input-base" required placeholder="+1 234 567 8900" />
                </div>
                <div className="space-y-2">
                  <label className="label-base uppercase tracking-widest text-[10px]">Primary Department</label>
                  <select name="department" value={newTeacher.department} onChange={handleInputChange} className="input-base appearance-none" required>
                    <option value="">Select Department</option>
                    <option value="CS">Computer Science</option>
                    <option value="IT">Information Tech</option>
                    <option value="ECE">Electronics</option>
                    <option value="MBA">Management</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="label-base uppercase tracking-widest text-[10px]">Core Specialization</label>
                  <input type="text" name="specialization" value={newTeacher.specialization} onChange={handleInputChange} className="input-base" required placeholder="e.g. Artificial Intelligence" />
                </div>
                <div className="flex items-end">
                   <button type="submit" disabled={isLoading} className="btn-primary w-full py-3.5 shadow-indigo-600/30">
                     {isLoading ? "Processing..." : editingId ? "Update Profile" : "Register Member"}
                   </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Directory Table */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-8 py-7 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                   <i className="fas fa-users text-white text-xl"></i>
                </div>
                <div>
                   <h3 className="text-2xl font-black text-slate-900 tracking-tight">Faculty Directory</h3>
                   <p className="text-slate-500 text-sm font-medium">{teachers.length} active records found</p>
                </div>
             </div>
          </div>

          <div className="p-4 sm:p-8">
            {isLoading && teachers.length === 0 ? (
               <div className="flex flex-col items-center py-24 gap-6">
                  <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Loading Database...</p>
               </div>
            ) : teachers.length === 0 ? (
               <div className="p-16 text-center bg-slate-50 rounded-3xl border border-slate-100">
                  <i className="fas fa-user-slash text-slate-200 text-5xl mb-6"></i>
                  <h4 className="text-xl font-black text-slate-900 mb-2">Directory is Empty</h4>
                  <p className="text-slate-500 font-medium">Start by registering your first faculty member above.</p>
               </div>
            ) : (
              <div className="overflow-x-auto custom-scrollbar rounded-2xl border border-slate-200">
                <table className="w-full border-separate border-spacing-0 min-w-[1000px]">
                  <thead>
                    <tr className="bg-slate-900">
                      <th className="py-6 px-10 text-left text-[10px] font-black text-white uppercase tracking-[0.2em] border-r border-slate-800 sticky left-0 z-20 bg-slate-900">Member</th>
                      <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-800">Email & Contact</th>
                      <th className="px-8 py-6 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-800">Dept</th>
                      <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-800">Expertise</th>
                      <th className="px-8 py-6 text-center text-[10px] font-black text-white uppercase tracking-widest">Controls</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {teachers.map((teacher) => (
                      <tr key={teacher._id} className="group hover:bg-indigo-50/40 transition-all duration-300">
                        <td className="py-8 px-10 border-r border-slate-100 bg-white group-hover:bg-indigo-50/40 sticky left-0 z-10">
                          <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-110 transition-transform">
                              {teacher.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-base font-black text-slate-900 tracking-tight">{teacher.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-8 border-r border-slate-100">
                           <div className="space-y-1">
                              <p className="text-sm font-bold text-slate-700">{teacher.email}</p>
                              <p className="text-xs text-slate-400 font-medium"><i className="fas fa-phone-alt mr-1"></i> {teacher.contact || "No Contact"}</p>
                           </div>
                        </td>
                        <td className="px-8 py-8 text-center border-r border-slate-100">
                           <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-widest border border-slate-200">
                             {teacher.department}
                           </span>
                        </td>
                        <td className="px-8 py-8 border-r border-slate-100">
                           <div className="flex items-center gap-2">
                             <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                             <span className="text-xs font-bold text-slate-600">{teacher.specialization}</span>
                           </div>
                        </td>
                        <td className="px-8 py-8">
                           <div className="flex justify-center items-center gap-3">
                              <button onClick={() => handleEdit(teacher)} className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm flex items-center justify-center">
                                 <i className="fas fa-edit text-sm"></i>
                              </button>
                              <button onClick={() => handleDelete(teacher._id)} className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-rose-500 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all shadow-sm flex items-center justify-center">
                                 <i className="fas fa-trash-alt text-sm"></i>
                              </button>
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
    </div>
  );
};

export default Hod;
