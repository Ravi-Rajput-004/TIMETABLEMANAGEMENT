import { useEffect, useState } from "react";
import Siteroutes from "./components/siteroutes";
import Header from "./components/header";
import Adminheader from "./components/adminheader";
import context from "./components/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <main className="flex-grow flex flex-col pt-20">
          <Siteroutes />
        </main>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </context.Provider>
    </div>
  );
}

export default App;
