import { useEffect, useState } from "react";
import Siteroutes from "./components/siteroutes";
import Header from "./components/header";
import Adminheader from "./components/adminheader";
import context from "./components/context";

function App() {
  const [flag, setflag] = useState(localStorage.getItem("flag"));

  useEffect(() => {
    if (flag) {
      localStorage.setItem("flag", flag);
    }
  }, [flag]);

  return (
    <div className="App min-h-screen flex flex-col bg-gray-50 text-slate-800 font-sans">
      <context.Provider value={{ setflag, flag }}>
        {flag === "admin" ? <Adminheader /> : <Header />}
        <main className="flex-grow flex flex-col pt-16">
          <Siteroutes />
        </main>
      </context.Provider>
    </div>
  );
}

export default App;
