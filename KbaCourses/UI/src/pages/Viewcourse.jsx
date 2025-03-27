import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useprofile from "../hooks/Userprofile";
import banner from "../assets/images/banner-kba.png";

const Viewcourse = () => {
  const { coursename } = useParams();
  const navigate = useNavigate();
  const { profile} = useprofile();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/getcourse?coursename=${encodeURIComponent(coursename)}`);
        if (!res.ok) 
          throw new Error("Failed to fetch course data");

        const data = await res.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error.message);
        setCourse({ coursename: "Not Found", description: "No description available", price: 0 });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [coursename]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the course: ${coursename}?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/deletecourse?coursename=${encodeURIComponent(coursename)}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete course");

      alert("Course deleted successfully!");
      navigate("/courses")
    } catch (error) {
      console.error("Error deleting course:", error.message);
      alert("Failed to delete the course. Please try again.");
    }
  };

  if (isLoading) return <div className="text-center p-4">Loading Course Details...</div>;

  return (
    <div className="bg-white text-gray-900 mb-10 pb-10">
      <div className="max-w-4xl mx-auto p-5">
        <Link to="/courses" className="flex items-center my-5 font-medium">Back to Courses</Link>

        <div className="bg-purple-100 shadow-lg rounded-lg overflow-hidden">
          <img src={course.image || banner} alt="Course Thumbnail" className="w-full h-64 object-cover" />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-purple-800">{course.coursename}</h1>
            <p className="text-2xl text-red-500 font-semibold">{course.price}</p>
            <button className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600">Add to Cart</button>

            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-purple-800">Description</h2>
              <p>{course.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-purple-800 mb-2">Prerequisites</h2>
              <ul className="list-disc list-inside">
                <li>Basic understanding of blockchain technology</li>
                <li>Familiarity with programming languages</li>
                <li>Internet access</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-purple-800 mb-2">Features</h2>
              <ul className="list-disc list-inside">
                <li>40 hours of content</li>
                <li>Certificate of completion</li>
                <li>Access to community forums</li>
                <li>Downloadable resources</li>
                <li>24/7 support</li>
              </ul>
            </div>
          </div>
        </div>

        {profile?.UserRole === "admin" && (
          <div className="flex justify-end gap-4 mt-4">
            <Link to={`/editcourse/${coursename}`} className="bg-blue-500 text-white px-4 py-2 rounded">Edit Course</Link>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete Course</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewcourse;
