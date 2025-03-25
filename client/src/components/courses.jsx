import React, { useState, useEffect } from 'react';

import Course from './Course';

import coursesData from './courseData.json';

const Courses = () => {
  const [courses, setCourses] = useState(coursesData);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showDetails, setShowDetails] = useState(false); // state to control visibility of course details

  useEffect(() => {
    /*
    api.get('/courses')
      .then(response => {
        console.log('response', response);
        setCourses(response.data);
      })
      .catch(error => {
        console.log('error', error);
      });
    */
  }, []);

  const onFilterCourses = (event) => {
    console.log('event', event.target.value);
    const courseID = event.target.value;
    if (courseID) {
      const filteredCourses = courses.filter(course => course.courseID === courseID);
      setFilteredCourses(filteredCourses);
    } else {
      setFilteredCourses([]);
    }
  };

  const handleShowDetails = () => {
    setShowDetails(!showDetails); // toggle visibility of course details
  };

  return (
    <>
    <div class="coursecontainer1">
      <h1>Available Courses</h1>
      <div>
        <h3>Browse the available courses below for more details on our current study programmes</h3>
        <p>Select course from dropdown menu for further details:</p>
        </div>

     <div class="coursecontainer2">   
        <select name="course" id="course" onChange={onFilterCourses}>
          <option value="">Select a course</option>
          {courses.map(course => (
            <option key={course.courseID} value={course.courseID}>
              {course.courseTitle}
            </option>
          ))}
        </select>
      </div>
      </div>

      <div class = "coursecontainer3">
             {filteredCourses.length > 0 ? (
          <button type="button" onClick={handleShowDetails}>
            View Course Details
          </button>
        ) : (
          <p>No courses selected</p>
        )}
      

 
      {showDetails && filteredCourses.length > 0 && (
        <CourseDetails filteredCourses={filteredCourses} />
      )}

      {showDetails && filteredCourses.length === 0 && (
        <p>No courses selected</p>
        
      )}
      </div>
    </>
  );
};

const CourseDetails = ({ filteredCourses }) => {
  return (
    <div>
        <div class = "coursecontainer4">
                <br></br>
      <h2>Course Details</h2>
      <ul>
        {filteredCourses.map((course) => (
          <li key={course.courseID}>
            <h1>{course.courseTitle}</h1>
            <p><b>{course.courseID}</b></p>
            <p>{course.courseDescription}</p>
            <p>{course.coursePrice}</p>
            <p>{course.courseCategory}</p>
            <p>{course.InstructorID}</p>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Courses;



