import React from 'react'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'

import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Addcourse from './pages/Addcourse'
import Coursepage from './pages/Coursepage'
import Viewcourse from './pages/Viewcourse'
import Contact from './pages/Contact'
import EditCoursePage from './pages/Editcourse'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element= {<Navigate to = "/signup"/>}/>   //ele-which react element to be loaded
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/addcourse' element={<Addcourse/>}/>
        <Route path='/getallcourses' element={<Coursepage/>}/>
        <Route path="/courses/:coursename" element={<Viewcourse />} />
        <Route path="/editcourse/:coursename" element={<EditCoursePage />} />
        <Route path='/courses' element={<Coursepage/>}/>
        <Route path='/contact' element={<Contact/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
