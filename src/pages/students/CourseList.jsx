import React, { useContext, useEffect, useMemo, useState } from "react";
import { assets } from "../../assets/assets";
import CoursesMap from "../../components/students/CoursesMap";
import { AppContext } from "../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

function CourseList() {
  const navigate = useNavigate();
  const { input } = useParams();
  const { AllCourses } = useContext(AppContext);
  const [search, setSearch] = useState(input || "");

  useEffect(() => {
    setSearch(input || "");
  }, [input]);

  const SearchedCourse = useMemo(() => {
    const courses = AllCourses || [];
    const q = search.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((item) =>
      item.courseTitle?.toLowerCase().includes(q),
    );
  }, [search, AllCourses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = search.trim();
    navigate(
      q
        ? `/students/course-list/${encodeURIComponent(q)}`
        : "/students/course-list",
    );
  };

  const clearSearch = () => {
    setSearch("");
    navigate("/students/course-list");
  };

  return (
    <div className="px-16 md:px-23 py-15">
      <div className="flex pb-8 items-center justify-center md:flex-row flex-col md:justify-between gap-4">
        <h1 className="text-[40px] max-md:text-3xl font-medium text-gray-900">
          Course List
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex px-1.5 items-center py-1 border-gray-300 border-[1px] w-[50%] rounded"
        >
          <img src={assets.search_icon} className="w-5" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search For Courses"
            type="text"
            className="outline-none py-3 px-4 w-full h-full"
          />
          <button
            type="submit"
            className="py-3 px-9 cursor-pointer rounded text-sm font-medium text-white bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>

      {input && (
        <div className="w-fit flex-wrap px-2 flex items-center gap-3 py-2 border-gray-300 border-1 rounded">
          <p className="text-black text-sm font-medium">{input}</p>
          <img
            onClick={clearSearch}
            src={assets.cross_icon}
            className="w-3 cursor-pointer"
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-4">
        {SearchedCourse.length > 0 ? (
          SearchedCourse.map((course, idx) => (
            <CoursesMap course={course} key={course._id || idx} />
          ))
        ) : (
          <p className="text-gray-500">No courses found.</p>
        )}
      </div>
    </div>
  );
}

export default CourseList;
