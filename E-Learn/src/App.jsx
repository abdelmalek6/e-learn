import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./pages/students/Home.jsx";
import NewCourse from "./pages/educator/NewCourse.jsx";
import CourseList from "./pages/students/CourseList.jsx";
import CourseDetails from "./pages/students/CourseDetails.jsx";
import MyEnrollments from "./pages/students/MyEnrollments.jsx";
import Educator from "./pages/educator/Educator.jsx";
import Dashboard from "./pages/educator/Dashboard.jsx";
import StudentsEnroll from "./pages/educator/StudentsEnroll.jsx";
import Mycourses from "./pages/educator/MyCourses.jsx";
import Navbar from "./components/students/Navbar.jsx";
import Watch from "./pages/students/Watch.jsx";
import Enav from "./components/educator/Enav.jsx";
function App() {
  const isDashbaord = useMatch("/educator/*");
  return (
    <div className=" min-h-screen ">
      {!isDashbaord &&<Navbar /> }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students/course-list/:input" element={<CourseList />} />
        <Route path="/students/course-list" element={<CourseList />} />
        <Route path="/students/watch/:id" element={<Watch />} />
        <Route
          path="/students/course-details/:id"
          element={<CourseDetails />}
        />

        <Route path="/students/my-enrollments" element={<MyEnrollments />} />

        <Route path="/educator" element={<Educator />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students-enroll" element={<StudentsEnroll />} />
          <Route path="new-course" element={<NewCourse />} />
          <Route path="my-courses" element={<Mycourses />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
