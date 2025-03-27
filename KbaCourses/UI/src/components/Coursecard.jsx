import React,{useState} from 'react'
import rpimage from '../assets/images/rp.png'
import { Link } from 'react-router-dom'

const Coursecard = ({course}) => {

  const[showfulldescription,setshowfulldescription] = useState(false)

  const description = showfulldescription?course.description:course.description.substring(0,80)
  return (
    <div className=' bg-purple-200  rounded-md shadow-2xl flex flex-col items-center justify-center mx-5 my-5 py-10'>
            <h2 className=' font-bold text-lg text-purple-900 '>{course.coursename}</h2>
            <img src={rpimage} alt="course thumbnail" class='w-80 h-40 ' />

            <p className='text-black group-hover:text-white my-2 mx-5'>{description}</p>

            <button className='flex flex-col w-full px-5 text-purple-400 hover:text-purple-600 py-2' onClick={()=>setshowfulldescription(!showfulldescription)}>{showfulldescription?'Less':'More'}</button>
            <Link to={`/courses/${course.coursename}`} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 self-start mx-5">Learn More</Link>

    </div>
  )
}

export default Coursecard