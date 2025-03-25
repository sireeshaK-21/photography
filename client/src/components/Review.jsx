import { useState, useEffect } from "react";
import axios from "axios";

const Review = ({ courseId, userId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/reviews/course/${courseId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/reviews", { course_id: courseId, student_id: userId, rating, comment });
      setRating(5);
      setComment("");
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
    setLoading(false);
  };

  return (
    <div className="review-container">
      <h2>Course Reviews</h2>

      <form onSubmit={handleSubmit}>
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>

        <label>Comment:</label>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />

        <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Review"}</button>
      </form>

      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <strong>{review.User?.name || "Anonymous"}</strong>: {review.comment} (⭐ {review.rating})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Review;
