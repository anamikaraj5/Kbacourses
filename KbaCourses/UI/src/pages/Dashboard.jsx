import React,{useState,useEffect} from 'react'
import { data, useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const [profile,setProfile] = useState(null)
  const [error,setError] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchProfile = async()=>
    {
      try{
        const response = await fetch('/api/profile',{   
            method:'GET',
            credentials:'include',
        })
        if(!response.ok)
        {
          throw new Error("Unautorized access")
        }
        const data = await response.json()
        setProfile(data)
      }
      catch(error)
      {
        setError(error.message|| 'error fetching profile')
        navigate('/login')
      }
    }

    fetchProfile()
  },[navigate])


  return (
    <div className='mt-[50px] ml-[100px]'>

      <h2 className='text-4xl font-bold text-red-900 mb-4'>Dashboard</h2>
      {error && <p className='text-2xl'>{error}</p>}

      {profile ? (
        <div>
          <p className='text-2xl font-bold '>Welcome , {profile.Email}</p>
          <p className='text-2xl font-bold '>User Role :{profile.UserRole}</p>
          
        </div>
      ):(
        <p>Loading Profile....</p>
      )}
    </div>
  )
}

export default Dashboard