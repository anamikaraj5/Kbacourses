import React, { useState } from 'react'
import Nav from '../components/Nav'

const Addcourse = () => {

  const[cname,setCname] = useState('')
    const[cid,setCid] = useState('')
    const[description,setDescription] = useState('')
    const[price,setPrice] = useState('')
    const[CourseImage,setCourseimg] = useState('null')

    const [error,setError] = useState('')

    const handleadd = async(e)=>
        {
            e.preventDefault()
            try
            {

              const formdata = new FormData()
              formdata.append("Coursename",cname)
              formdata.append("Courseid",cid)
              formdata.append("Description",description)
              formdata.append("Price",price)
              if(CourseImage)
              {
                formdata.append("CourseImage",CourseImage)
              }


                const response = await fetch('/api/addcourse',{
                    method:'POST',
                    credentials:'include',
                    body:formdata 
                })
    
                const data = await response.json()

                console.log("Response status:", response.status);
                console.log("Response data:", data);

                if (!response.ok) {
                    throw new Error(data.message || 'Adding of course failed');
                }

                

    
                alert("Course added successfully")

                setCname('')
                setCid("")
                setDescription("")
                setPrice("")
                setCourseimg(null)
            }
    
            catch(err)
            {
                setError(err.message || 'Course added failed')
            }
        }
  return (

    <>
    
    <Nav/>
    
    <section className="bg-white mb-20 mt-[30px]">
        <div className="container m-auto max-w-2xl py-2">
      <div className="bg-purple-200 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
      {error && <p className='text-red-500 mb-4'>{error}</p>}
        <form onSubmit={handleadd}>
          <h2 className="text-3xl text-purple-800 text-center font-semibold mb-6">
            Add Course
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Course Name
            </label>
            <input
              type="text"
              value={cname}
              className="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. Certified Blockchain Associate"
              onChange={(e) => setCname(e.target.value)}
              required
              
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Course Id
            </label>
            <input
              type="text"
              className="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. 1"
              value={cid}
              onChange={(e) => setCid(e.target.value)}
              required
              
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <textarea
              className="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Small description on the course"
            
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
            >
              Price
            </label>
            <select
              className="border rounded w-full py-2 px-3"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              
            >
              <option value="Rs.5000">Rs.5000</option>
              <option value="Rs.3500">Rs.3500</option>
              <option value="Rs.15000">Rs.15000</option>
            </select>
          </div>

          <div>

            <label className='block text-gray-700 font-bold mb-2'>
              Course Image
            </label>
            <input
                type='file'
                accept='image/*'
                onChange={(e)=>{
                  if(e.target.files && e.target.files[0])
                  {
                    setCourseimg(e.target.files[0])
                  }
                }} />
          </div>

          
            <button
              className="bg-purple-500 hover:bg-purple-600 my-10  text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Course
            </button>
          
        </form>
      </div>
    </div>
  </section>
    </>
    

    
)
}

export default Addcourse