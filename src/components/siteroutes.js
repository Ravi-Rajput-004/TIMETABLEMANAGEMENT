import React from "react";
import { Route, Routes } from "react-router-dom";
import TimetablePage from "./timetable";
import TimetableView from "./showtable";
import Studentregister from "./studentregister";
import Studentlogin from "./studentlogin";
import LandingPage from "./landingpage";
import Hod from "./hod";
import StudentLogin from "./studentlogin";
import Signup from "./signup";
import Login from "./login";
import ComingSoon from "./ComingSoon";

const Siteroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>

        <Route path="/timetable" element={<TimetablePage />}></Route>
        <Route path="/showtable" element={<TimetableView />}></Route>
        <Route path="/studentregister" element={<Studentregister />}></Route>
        <Route path="/studentlogin" element={<StudentLogin />}></Route>
        <Route path="/hod" element={<Hod />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>

        {/* Catch-all route for Coming Soon pages */}
        <Route path="*" element={<ComingSoon />}></Route>
      </Routes>
    </div>
  );
};

export default Siteroutes;
