import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
export default function SideEdu() {
  return (
    <div className='h-[100%] shrink-0  border-r-gray-400 border-r-[1px] flex justify-center  max-md:hidden '>
<ul className='flex flex-col gap-3 py-3 side ' >
<NavLink to="dashboard" className=' px-10 md:px-15 py-2 w-full hover:bg-blue-50 flex items-center gap-2 ' >
<img src={assets.home_icon} className='w-4' />
<p className= 'text-gray-900 font-medium text-sm    ' > Dashboard </p>
</NavLink>

<NavLink to="new-course" className='px-10 md:px-15 py-2 w-full hover:bg-blue-50 flex items-center gap-2 ' >
<img src={assets.add_icon} className='w-4' />
<p className= 'text-gray-900 font-medium text-sm    ' > Add Course </p>
</NavLink>

<NavLink to="my-courses" className=' px-10 md:px-15 py-2 w-full hover:bg-blue-50 flex items-center gap-2  ' >
<img src={assets.my_course_icon} className='w-4' />
<p className= 'text-gray-900 font-medium text-sm    ' > My Courses </p>
</NavLink>

<NavLink to="students-enroll" className='px-10 md:px-15 py-2 w-full hover:bg-blue-50 flex items-center gap-2 ' >
<img src={assets.user_icon} className='w-4' />
<p className= 'text-gray-900 font-medium text-sm    ' > Student Enrolled  </p>
</NavLink>
</ul>




    </div>
  )
}
