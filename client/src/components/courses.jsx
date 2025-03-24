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
        <div>Courses</div>

        <select name="course" id="course" onChange={onFilterCourses}>
          <option value="">Select a course</option>
          {courses.map(course => (
            <option key={course.courseID} value={course.courseID}>{course.courseTitle}</option>
          ))}
        </select>

        <h1>Filtered Courses</h1>
        {filteredCourses.map(course => (
          <Course key={course.courseID} course={course} />
        ))}     

    </>
  )
}

export default Courses