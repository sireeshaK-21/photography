import { useState, useEffect } from "react";
import axios from "axios";
const Review = ({ userId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  useEffect(() => {
    fetchCourses();
  }, []);
  useEffect(() => {
    if (selectedCourseId) {
      fetchReviews();
    }
  }, [selectedCourseId]);
  const fetchReviews = async () => {
    if (!selectedCourseId) return;
    try {
      const response = await axios.get(`/api/reviews/course/${selectedCourseId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  const fetchCourses = async () => {
    try {
      const response = await axios.get("/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourseId) {
      alert("Please select a course");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/reviews", {
        course_id: selectedCourseId,
        student_id: userId,
        rating,
        comment,
      });
      setRating(5);
      setComment("");
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
    setLoading(false);
  };
  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Course Reviews</h2>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Choose a Course:</label>
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          <option value="">Select a Course</option>
          {Array.isArray(courses) && courses.length > 0 ? (
            courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))
          ) : (
            <option value="">No courses available</option>
          )}
        </select>
      </div>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            style={{ width: "100px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", minHeight: "100px" }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px 15px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((review) => (
            <li
              key={review.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <strong style={{ display: "block", marginBottom: "5px" }}>
                {review.User?.name || "Anonymous"}
              </strong>
              {review.comment} (:star: {review.rating})
            </li>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </ul>
    </div>
  );
};
export default Review

















