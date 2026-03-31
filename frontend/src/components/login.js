import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import context from "./context";
import API_URL from "../config";
import { showToast, showAlert } from "../utils/alerts";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { setflag } = useContext(context);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const all = { email, password };

    try {
      const result = await fetch(`${API_URL}/login`, {
        method: "POST",
        body: JSON.stringify(all),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const res = await result.json();

      if (res.statuscode === 1) {
        showToast("success", "Faculty Authentication Success!");
        localStorage.setItem("flag", res.utype);
        setflag(res.utype);
        navigate("/");
      } else {
        showAlert("error", "Access Denied", "Unauthorized faculty credentials. Please check your admin privileges.");
      }
    } catch (err) {
      console.log(err);
      showAlert("error", "Server Error", "Unable to connect to the authentication server. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute top-[-15%] left-[-10%] w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-72 h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/30 mb-4">
            <i className="fas fa-chalkboard-teacher text-white text-2xl"></i>
          </div>
          <h2 className="heading-md text-slate-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-slate-500 font-medium">
            Faculty & Admin Portal Access
          </p>
        </div>

        <div className="card-premium relative overflow-hidden">
          <form className="space-y-5" onSubmit={submit}>
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
                  placeholder="faculty@university.edu"
                  className="input-base pl-11"
                  onChange={(e) => setemail(e.target.value)}
                  required
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
                  placeholder="••••••••"
                  className="input-base pl-11"
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full mt-4"
            >
              Sign In
              <i className="fas fa-arrow-right ml-1"></i>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Create one <i className="fas fa-long-arrow-alt-right ml-1"></i>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
