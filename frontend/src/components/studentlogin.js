import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../config";
import context from "./context";
import { showToast, showAlert } from "../utils/alerts";

const StudentLogin = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setflag } = useContext(context);
  const navigate = useNavigate();

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

      showToast("success", `Welcome back, ${data.data.name}!`);
      localStorage.setItem("student", JSON.stringify(data.data));
      localStorage.setItem("flag", "student");
      setflag("student");
      navigate("/studentdashboard");
    } catch (error) {
      showAlert("error", "Login Failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      
      <div className="relative z-10 max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/30 mb-4 text-white">
            <i className="fas fa-user-graduate text-2xl"></i>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Student Portal</h2>
          <p className="text-slate-500 font-medium">Access your synchronized schedule</p>
        </div>

        <div className="card-premium">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="label-base uppercase tracking-widest text-[10px]">Institutional Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <i className="fas fa-envelope"></i>
                </div>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                  placeholder="name@university.edu"
                  className="input-base pl-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="label-base uppercase tracking-widest text-[10px]">Security Key</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <i className="fas fa-lock"></i>
                </div>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  placeholder="••••••••"
                  className="input-base pl-11"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-4 disabled:opacity-70"
            >
              {isLoading ? "Authenticating..." : "Sign In to Dashboard"}
              <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              New to TimetableHub?
            </p>
            <Link
              to="/studentregister"
              className="mt-2 inline-flex items-center text-indigo-600 font-black hover:text-indigo-700 transition-colors"
            >
              Create Account <i className="fas fa-chevron-right text-[10px] ml-1"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
