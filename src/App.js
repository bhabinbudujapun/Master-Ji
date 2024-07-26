import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import OtpForm from "./OtpForm/OtpForm";
import CourseList from "./CourseList/CourseList";
import Batches from "./Batches/Batches";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/otp-form" element={<OtpForm />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/batches" element={<Batches />} />
        <Route path="/" element={<Navigate to="/otp-form" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
