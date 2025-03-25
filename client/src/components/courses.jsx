import React, { useState, useEffect } from 'react';

import Course from './Course';

import coursesData from './courseData.json';

const Courses = () => {

        const [courses, setCourses] = useState(coursesData);
        const [filteredCourses, setFilteredCourses] = useState([]);

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
        }

        
  return (
        <>
        
        <h1>Available Courses </h1>

        <div>

        <h3>Browse the available courses below for more details on our current study programmes</h3>

        <p>Select course from dropdown menu for further details:</p>

        <select name="course" id="course" onChange={onFilterCourses}>
          <option value="">Select a course</option>
          {courses.map(course => (
            <option key={course.courseID} value={course.courseID}>{course.courseTitle}</option>
          ))}
        </select>

        </div>

        <br></br>

        
        {filteredCourses.map(course => (
          <Course key={course.courseID} course={course} />
        ))}  

          
      <button type="submit"> View Course Details</button>   

    </>
  )
}

export default Courses