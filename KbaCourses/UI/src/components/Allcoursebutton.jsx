import React from 'react'
import { Link } from 'react-router-dom'

const AllCoursesButton = () => {
  return (
<div className='flex justify-center mb-40'>
    <Link to={'/getallcourses'} className='w-80 h-10 rounded-full bg-purple-500 text-white font-medium  text-center pt-[10px] hover:bg-purple-600' >View all Courses</Link>
</div>
  )
}

export default AllCoursesButton