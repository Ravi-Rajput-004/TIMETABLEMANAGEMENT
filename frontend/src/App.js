import React, { useState, useEffect } from "react";
import Siteroutes from "./components/siteroutes";
import Header from "./components/header";
import context from "./components/context";
import Adminheader from "./components/adminheader";

function App() {
  const [flag, setflag] = useState(() => localStorage.getItem("flag") || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (flag) {
      localStorage.setItem("flag", flag);
    } else {
      localStorage.removeItem("flag");
    }
  }, [flag]);

  return (
    <div className="App min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <context.Provider value={{ setflag, flag }}>
        {flag === "admin" || flag === "hod" ? <Adminheader /> : <Header />}
        <main className="flex-grow flex flex-col pt-16 md:pt-20">
          <Siteroutes />
        </main>
      </context.Provider>
    </div>
  );
}

export default App;
