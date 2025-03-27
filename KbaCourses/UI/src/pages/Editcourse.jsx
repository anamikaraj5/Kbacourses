import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditCoursePage = () => {
  const { coursename } = useParams();
  const navigate = useNavigate();

  const [courseId, setCourseId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(5000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log("Fetching course:", coursename);
        const res = await fetch(`/api/getcourse?coursename=${encodeURIComponent(coursename)}`);
        console.log("Response status:", res.status);
        
        if (!res.ok) {
          throw new Error("Failed to fetch course");
        }
  
        const data = await res.json();
        console.log("Fetched Data:", data);
  
        if (!data || !data.coursename) {
          throw new Error("Course not found");
        }
  
        setCourseId(data.courseid);
        setDescription(data.description || "");
        setPrice(data.price || 5000);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourse();
  }, [coursename]);
  

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const updatedCourse = {
        CourseName: coursename,
        CourseId: courseId,
        Description: description,
        Price: price,
      };

      const res = await fetch("/api/updatecourse", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedCourse),
      });
      const data = await res.text(); 
      if (!res.ok) {
        throw new Error(data || "Failed to update course");
      }

      toast.success("Course updated successfully!");
      navigate("/courses");
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message);
    }
  };

  if (loading) {
    return <div className="p-4">Loading course data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <section className="bg-white mb-20">
      <div className="container m-auto max-w-2xl py-2">
        <div className="bg-purple-100 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-purple-800 text-center font-semibold mb-6">
              Update Course
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Course ID
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3 mb-2"
                required
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <textarea
                className="border rounded w-full py-2 px-3"
                rows="4"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Price
              </label>
              <input
                type="number"
                className="border rounded w-full py-2 px-3"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <button
                className="bg-purple-500 hover:bg-purple-600 my-10 text-white font-bold py-2 px-4 rounded-full w-full"
                type="submit"
              >
                Update Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditCoursePage;