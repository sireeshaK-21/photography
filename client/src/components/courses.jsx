import React, { useEffect, useState } from "react";
import api from "../api"; // Import configured Axios instance

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    instructor_id: "", // This should be dynamically set (logged-in user ID)
    price: "",
    category: "",
  });

  // 📌 Fetch courses when component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get("/api/courses"); // Using `api` instead of axios.get()
      setCourses(response.data);
    } catch (error) {
      setError("Failed to load courses.");
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  // 📌 Handle form input changes
  const handleChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  // 📌 Handle form submission (Add Course)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken"); // Ensure user is authenticated
      const response = await api.post("/api/courses", newCourse, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses([...courses, response.data]); // Update state
      setNewCourse({ title: "", description: "", instructor_id: "", price: "", category: "" }); // Reset form
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "20px auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "20px", color: "#333", textAlign: "center" }}>Available Courses</h2>

      {loading && <p>Loading courses...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 📌 Courses Table */}
      {courses.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
          <thead>
            <tr style={{ backgroundColor: "#007BFF", color: "white", textAlign: "left" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Title</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Description</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Category</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{course.title}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{course.description}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{course.category}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>${course.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No courses available</p>
      )}

      {/* 📌 Add Course Form */}
      <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
        <h2 style={{ textAlign: "center" }}>Add New Course</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input type="text" name="title" placeholder="Title" value={newCourse.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={newCourse.description} onChange={handleChange} required />
          <input type="number" name="instructor_id" placeholder="Instructor ID" value={newCourse.instructor_id} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" value={newCourse.price} onChange={handleChange} required />
          <input type="text" name="category" placeholder="Category" value={newCourse.category} onChange={handleChange} required />
          <button type="submit" style={{ backgroundColor: "#28a745", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default Course;
