import React, { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";

function Dashboard() {
  const [Dash, setDash] = useState(null);

  useEffect(() => {
    setDash(dummyDashboardData);
  }, []);

  return (
    <div className="px-8 py-10 h-full w-full">
      {/* boxes */}
      <div className="md:grid-cols-3 grid py-3 grid-cols-1 gap-4">
        <div className="py-2 px-6 flex items-center gap-4 h-[90px] overflow-hidden border-blue-400 rounded md:h-[120px] border-[1px]">
          <img src={assets.patients_icon} className="w-15 max-md:w-10" />
          <div className="flex flex-col gap-1.5">
            <h1 className="text-lg font-medium text-gray-900">
              {Dash?.enrolledStudentsData?.length}
            </h1>
            <p className="text-gray-500 font-medium text-sm">Total Enrolments</p>
          </div>
        </div>

        <div className="py-2 px-6 flex items-center gap-4 h-[90px] overflow-hidden border-blue-400 rounded md:h-[120px] border-[1px]">
          <img src={assets.appointments_icon} className="w-15 max-md:w-10" />
          <div className="flex flex-col gap-1.5">
            <h1 className="text-lg font-medium text-gray-900">
              {Dash?.totalCourses}
            </h1>
            <p className="text-gray-500 font-medium text-sm">Total Courses</p>
          </div>
        </div>

        <div className="py-2 px-6 flex items-center gap-4 h-[90px] overflow-hidden border-blue-400 rounded md:h-[120px] border-[1px]">
          <img src={assets.earning_icon} className="w-15 max-md:w-10" />
          <div className="flex flex-col gap-1.5">
            <h1 className="text-lg font-medium text-gray-900">
              ${Dash?.totalEarnings}
            </h1>
            <p className="text-gray-500 font-medium text-sm">Total Earnings</p>
          </div>
        </div>
      </div>

      <h1 className="text-gray-900 font-medium text-xl py-7">
        Latest Enrolments
      </h1>

      {/* table */}
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
            {Dash?.enrolledStudentsData?.map((ele, idx) => (
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
    </div>
  );
}

export default Dashboard;