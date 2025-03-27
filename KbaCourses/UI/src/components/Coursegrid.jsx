import React,{useState,useEffect} from 'react' 
import Coursecard from './Coursecard'
import { Link } from 'react-router-dom'
import Nav from './Nav'

const Coursegrid = ({isHome=false}) => {

  const[courses,setcourses] = useState([])
  const[loading,setloading] = useState(true)
  const courselist = isHome?courses.slice(0,3):courses

  useEffect(()=>{           
       const fetchCourses = async()=>
        {
          try{
            const res=await fetch("/api/getallcourses")
            const data = await res.json()
            setcourses(data)
          }
          catch(error)
          {
            console.log(error)
          }
          finally
          {
            setloading(false)
          }
        }    
        fetchCourses()  
  },[])  

  return (

    <>

    {isHome?'':<Nav/>}

        <h1 className='flex flex-col items-center font-bold text-2xl md:text-4xl text-purple-800 mt-[5px]'>{isHome?'Top courses':'All Courses'}</h1>
      
        {loading?(
          <h1>Loading</h1>
        ):
        <div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10'>
        {courselist.map((course) =>( 
            <Coursecard key={courses.courseid}
            course={course}/>
        ))
        }
        </div>
        </div>
        }
        

    </>
  )
}

export default Coursegrid