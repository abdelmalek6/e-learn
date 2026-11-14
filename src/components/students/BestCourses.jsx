import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CoursesMap from "./CoursesMap.jsx";
import { AppContext } from "../../context/AppContext.jsx";
function BestCourses() {
  const { AllCourses } = useContext(AppContext);

  return (
    <div className="flex flex-col space-y-7 md:space-y-10  py-12 ">
      <div>
        <h1 className=" text-3xl text-gray-800 font-medium text-center mb-4 ">
          Learn from the best
        </h1>
        <p className=" text-gray-500 md:px-80 px-3 font-medium  text-sm md:text-[17px]  text-center px-2  ">
          Discover our top-rated courses across various categories. From coding
          and design to business and wellness, our courses are crafted to
          deliver results.
        </p>
      </div>
      {/* courses */}
      <div className=" py-2 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 flex-1 gap-2 px-4 md:px-30 ">
        {AllCourses.slice(0, 4).map((course, index) => {
          return <CoursesMap  course={course} key={index} />;
        })}
      </div>

      {/* btn */}
      <Link
        to="/students/course-list"
        onClick={() => {
          scrollTo(0, 0);
        }}
        className=" py-2.5 cursor-pointer px-5 w-fit mx-auto border-gray-300 border-1 rounded-xl  text-gray-600 font-medium text-sm  "
      >
        Show all courses
      </Link>
    </div>
  );
}

export default BestCourses;
