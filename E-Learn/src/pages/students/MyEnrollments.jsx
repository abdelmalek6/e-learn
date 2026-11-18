import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import humanizeDuration from "humanize-duration";
import { useNavigate } from "react-router-dom";

function MyEnrollments() {
  const { enrolledcourses, TotaleCourse } = useContext(AppContext);
  const [lecteurs, setcompletedLecteur] = useState([
    { lecteur: 2, completedlecteur: 4 },
    { lecteur: 1, completedlecteur: 6 },
    { lecteur: 4, completedlecteur: 12 },
    { lecteur: 2, completedlecteur: 9 },
    { lecteur: 0, completedlecteur: 8 },
    { lecteur: 5, completedlecteur: 6 },
    { lecteur: 2, completedlecteur: 4 },
    { lecteur: 10, completedlecteur: 10 },
  ]);
  
  const navigate=useNavigate()

  return (
    <div className="px-6 md:px-16 lg:px-24 py-10 max-w-7xl mx-auto">
      <h1 className="pb-6 font-bold text-gray-800 text-2xl md:text-3xl border-b border-gray-200 mb-6">
        My Enrollments
      </h1>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-600">
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4">Completed</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {enrolledcourses.map((course, index) => {
              const currentLecteur = lecteurs[index] || { lecteur: 0, completedlecteur: 1 };
              const progressPercent = (currentLecteur.lecteur * 100) / currentLecteur.completedlecteur;
              const isCompleted = currentLecteur.lecteur / currentLecteur.completedlecteur === 1;

              return (
                <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                  {/* Course Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={course.courseThumbnail}
                        alt={course.courseTitle}
                        className="w-20 h-14 object-cover rounded-md flex-shrink-0 shadow-sm border border-gray-100"
                      />
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-gray-800 text-sm font-semibold mb-2 line-clamp-1">
                          {course.courseTitle}
                        </p>
                        <Line
                          strokeWidth={3}
                          strokeColor="#3B82F6"
                          percent={progressPercent}
                          className="bg-gray-100 rounded-full h-1.5"
                        />
                      </div>
                    </div>
                  </td>

                  {/* Duration */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                    {humanizeDuration(TotaleCourse(course) * 60 * 1000, {
                      units: ["h", "m"],
                    })}
                  </td>

                  {/* Completed Lectures */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                    {`${currentLecteur.lecteur} / ${currentLecteur.completedlecteur}`}
                    <span className="text-gray-400 text-xs ml-1">Lectures</span>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span onClick={()=>{navigate("/students/watch/"+course._id) }}
                      className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${
                        isCompleted
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {isCompleted ? "Completed" : "On Going"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyEnrollments;