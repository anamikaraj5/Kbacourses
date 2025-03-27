import React from 'react'
import logo from '../assets/images/kbalogo.png'
import { Link, useNavigate } from 'react-router-dom'
import useprofile from '../hooks/Userprofile'

const Nav = () => {
  const { profile} = useprofile();
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
        const response = await fetch("/api/logout", {
            method: "GET",
            credentials: "include",
        })

        if (response.ok) {
            alert("Logged out successfully!")
            navigate("/login") 
        } 
        else {
            console.error("Logout failed")
        }
    } 
    
    catch (error) {
        console.error("Error during logout:", error)
    }
}

  return (
    <div className='bg-purple-200 text-purple-950 grid grid-cols-1 md:grid-cols-2 p-3 shadow-md'>
        <div className='flex items-center'>

            <img className='m-1p-2 size-12' src={logo} alt="logo" />
            
        </div>
        <div className='flex justify-center md:justify-end items-center mt-2 md:mt-0 space-x-5 md:space-x-10'>
            <Link to={'/home'} className='ml-20'>Home</Link>
            <Link to={'/courses'} className='ml-20'>Courses</Link>
            <Link to={'/contact'} className='ml-20'>Contact Us</Link>
            <button onClick={handleLogout} className="ml-20">Logout</button>

            
        {profile && profile.UserRole === 'admin' && (
          <Link to={'/addcourse'} className='ml-20'>Add Course</Link>
        )}
            
        </div>
    </div>
  )
}

export default Nav