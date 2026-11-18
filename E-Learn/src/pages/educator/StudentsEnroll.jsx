import React, { useEffect, useState } from "react";
import { dummyDashboardData } from "../../assets/assets";

function StudentsEnroll() {
    const [Students, setStudents] = useState(null);
  
    useEffect(() => {
      setStudents(dummyDashboardData);
    }, []);
  
  return <div className='px-8 py-10 h-full w-full' >

  <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full min-w-[600px] text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-700 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 font-semibold hidden sm:table-cell w-12 text-center">
                #
              </th>
              <th className="px-4 py-3 font-semibold">Student Name</th>
              <th className="px-4 py-3 font-semibold">Course Title</th>
              <th className="px-4 py-3 font-semibold hidden sm:table-cell">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {Students?.enrolledStudentsData?.map((ele, idx) => (
              <tr
                key={idx}
                className="bg-white hover:bg-blue-50/50 transition-colors"
              >
                <td className="px-4 py-3 text-center text-gray-500 hidden sm:table-cell">
                  {idx + 1}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={ele.student.imageUrl}
                      alt={ele.student.name}
                      className="w-9 h-9 rounded-full object-cover border border-gray-200"
                    />
                    <span className="font-medium text-gray-900 truncate">
                      {ele.student.name}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 text-gray-700">{ele.courseTitle}</td>

                <td className="px-4 py-3 text-gray-500 hidden sm:table-cell whitespace-nowrap">
                  {ele.purchaseDate
                    ? new Date(ele.purchaseDate).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  </div>;
}

export default StudentsEnroll;
