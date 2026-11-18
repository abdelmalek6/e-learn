import React, { useEffect, useState } from "react";
import { MyCoursesDummyData } from "../../assets/assets.js";

function MyCourses() {
  const [myCourses, setMyCourses] = useState(null);
  const [isActive, setIsActive] = useState([]);

  const fetchCourses = async () => {
    setMyCourses(MyCoursesDummyData);
  };

  const handleClick = (index) => {
    setIsActive((prev) => {
      const updatedState = [...prev];
      updatedState[index] = !updatedState[index];

      return updatedState;
    });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="px-10 max-md:px-5 py-10 w-full h-full">
      <h1 className="text-xl text-gray-800 font-medium mb-6">My Courses</h1>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                All Courses
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Earnings
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Students
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Course Status
              </th>
            </tr>
          </thead>

          <tbody>
            {myCourses?.map((course, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-14 rounded"
                    />
                    <span className="text-gray-700 font-medium text-sm">
                      {course.title}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 text-gray-700 font-medium text-sm">
                  $ {course.Earning}
                </td>

                <td className="px-4 py-3 text-gray-700 font-medium text-sm">
                  {course.studentsEnrolled}
                </td>

                <td className="px-4 py-3 flex items-center gap-2 ">
                  <button
                    type="button"
                    onClick={() => handleClick(index)}
                    className={`relative w-10 h-6 rounded-full transition-colors duration-300 ${
                      isActive[index] ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
                        isActive[index] ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>

                  <span className="ml-2 text-gray-700 font-medium text-sm">
                    {isActive[index] ? "Live" : "Private"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyCourses;
