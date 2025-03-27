import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Coursegrid from '../components/Coursegrid'
import AllCoursesButton from '../components/Allcoursebutton'

function Home() {

  return (
    <div>
      <Nav/>
      <Hero/>
      <Coursegrid isHome={true} />
      <AllCoursesButton/>
    </div>
  )
}

export default Home