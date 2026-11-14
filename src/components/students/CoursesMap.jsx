import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
function CoursesMap({ course }) {
  const {getRank}=useContext(AppContext)
  return (
    <Link
      to={`/students/course-details/${course._id}`}
      onClick={() => {
        scrollTo(0, 0);
      }}
      className=" border-gray-300 border-[1px]  flex flex-col  rounded-xl overflow-hidden "
    >
      <img src={course.courseThumbnail} />

      <div className="px-3 ">
        <h1 className="text-[19px] font-medium pt-4 pb-2  leading-5 ">
          {course.courseTitle}
        </h1>
        <p className="font-medium text-sm text-gray-500 ">{course.educator.name || "Abdelmalek"} </p>

        <div className="flex items-center  ">
          <p className="mr-3">{getRank(course)}</p>
          {Array.from({ length: 5 }).map((_, i) => {
            return <img src={ Math.floor(i<getRank(course))? assets.star:assets.star_blank  } className="w-4" />;
          })}
          <p className="ml-3">{`(${course.courseRatings.length})`}</p>
        </div>

        <p className=" text-lg font-medium text-gray-900 ">
          {"$" +
            (
              course.coursePrice -
              (course.discount * course.coursePrice) / 100
            ).toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

export default CoursesMap;
