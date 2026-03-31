import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../config";
import { showToast, showAlert } from "../utils/alerts";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const data = { name, email, password };

    try {
      console.log("🚀 Attempting fetch to /signup...");
      const result = await fetch(`${API_URL}/signup`, {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      console.log("📥 Response status:", result.status);

      const res = await result.json();

      if (res.statuscode === 1) {
        showAlert("success", "Registration Successful", "Faculty account created! Please sign in with your credentials.");
        navigate("/login");
      } else {
        showAlert("error", "Registration Denied", res.message || "Unable to process faculty registration.");
      }
    } catch (err) {
      showAlert("error", "System Error", "The registration server is currently unreachable. Please try again in a moment.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute top-[-15%] right-[-10%] w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-15%] left-[-10%] w-72 h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/30 mb-4">
            <i className="fas fa-user-plus text-white text-2xl"></i>
          </div>
          <h2 className="heading-md text-slate-900 mb-2">
            Create Account
          </h2>
          <p className="text-slate-500 font-medium">
            Join the TimetableHub community
          </p>
        </div>

        <div className="card-premium relative overflow-hidden">
          <form className="space-y-5" onSubmit={submit}>
            <div>
              <label className="label-base uppercase tracking-wider text-xs">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-user text-slate-400"></i>
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input-base pl-11"
                  required
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="label-base uppercase tracking-wider text-xs">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-slate-400"></i>
                </div>
                <input
                  type="email"
                  placeholder="you@university.edu"
                  className="input-base pl-11"
                  required
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="label-base uppercase tracking-wider text-xs">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-slate-400"></i>
                </div>
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  className="input-base pl-11"
                  required
                  minLength="6"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full mt-4"
            >
              Create Account
              <i className="fas fa-arrow-right ml-1"></i>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Sign in <i className="fas fa-long-arrow-alt-right ml-1"></i>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
