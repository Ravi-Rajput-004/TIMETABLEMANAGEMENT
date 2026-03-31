import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import context from "./context";
import TimetablePage from "./timetable";
import TimetableView from "./showtable";
import Studentregister from "./studentregister";
import StudentLogin from "./studentlogin";
import StudentDashboard from "./studentdashboard";
import LandingPage from "./landingpage";
import Hod from "./hod";
import Signup from "./signup";
import Login from "./login";
import ComingSoon from "./ComingSoon";

// Security Guard Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const { flag } = useContext(context);
  const storedFlag = localStorage.getItem("flag");
  const currentFlag = flag || storedFlag;

  if (!currentFlag) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole) {
    const roles = Array.isArray(allowedRole) ? allowedRole : [allowedRole];
    if (!roles.includes(currentFlag)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

const Siteroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>

        <Route 
          path="/timetable" 
          element={<ProtectedRoute allowedRole={["admin", "hod"]}><TimetablePage /></ProtectedRoute>} 
        />
        <Route 
          path="/showtable" 
          element={<ProtectedRoute allowedRole={["admin", "hod"]}><TimetableView /></ProtectedRoute>} 
        />
        <Route path="/studentregister" element={<Studentregister />}></Route>
        <Route path="/studentlogin" element={<StudentLogin />}></Route>
        <Route 
          path="/studentdashboard" 
          element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/hod" 
          element={<ProtectedRoute allowedRole={["admin", "hod"]}><Hod /></ProtectedRoute>} 
        />
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>

        {/* Catch-all route */}
        <Route path="*" element={<ComingSoon />}></Route>
      </Routes>
    </div>
  );
};

export default Siteroutes;
