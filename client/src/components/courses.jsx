import React, { useState, useEffect } from 'react';
import coursesData from './courseData.json';
const Courses = () => {
  const [courses, setCourses] = useState(coursesData);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => {
    // You can uncomment the API call if needed
    // axios.get('/courses')
    //   .then(response => setCourses(response.data))
    //   .catch(error => console.error('Error fetching courses:', error));
  }, []);
  const onFilterCourses = (event) => {
    const courseID = event.target.value;
    if (courseID) {
      const filteredCourses = courses.filter((course) => course.courseID === courseID);
      setFilteredCourses(filteredCourses);
    } else {
      setFilteredCourses([]);
      setShowDetails(false); // Reset showDetails when no course is selected
    }
  };
  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };
  const handleEnrollCourse = (courseID) => {
    alert(`Enrolling in course: ${courseID}`);
    // You can implement the actual enrollment logic here
  };
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1>Available Courses</h1>
        <p>Browse the available courses below for more details on our current study programmes.</p>
        <p>Select a course from the dropdown menu for further details:</p>
      </div>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <select
          name="course"
          id="course"
          onChange={onFilterCourses}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.courseID} value={course.courseID}>
              {course.courseTitle}
            </option>
          ))}
        </select>
      </div>
      <div style={{ textAlign: 'center' }}>
        {filteredCourses.length > 0 ? (
          <button
            type="button"
            onClick={handleShowDetails}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            {showDetails ? 'Hide Course Details' : 'View Course Details'}
          </button>
        ) : (
          <p>No courses selected</p>
        )}
        {showDetails && filteredCourses.length > 0 && (
          <CourseDetails filteredCourses={filteredCourses} handleEnrollCourse={handleEnrollCourse} />
        )}
        {showDetails && filteredCourses.length === 0 && (
          <p>No courses selected</p>
        )}
      </div>
    </div>
  );
};
const CourseDetails = ({ filteredCourses, handleEnrollCourse }) => {
  return (
    <div style={{ marginTop: '20px', backgroundColor: '#F0F0F0', padding: '20px', borderRadius: '5px' }}>
      <h2>Course Details</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {filteredCourses.map((course) => (
          <li
            key={course.courseID}
            style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}
          >
            <p><strong>Course ID:</strong> {course.courseID}</p>
            <p><strong>Course Title:</strong> {course.courseTitle}</p>
            <p><strong>Description:</strong> {course.courseDescription}</p>
            <p><strong>Price:</strong> {course.coursePrice}</p>
            <p><strong>Category:</strong> {course.courseCategory}</p>
            <p><strong>Instructor ID:</strong> {course.InstructorID}</p>
            <button
              onClick={() => handleEnrollCourse(course.courseID)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#28A745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Enrol
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Courses;