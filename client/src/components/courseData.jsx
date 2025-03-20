    import React from 'react';

    function DataDisplay() {
      // Storing data in an object
      const data = {
        CourseID: "CAM1",
        CourseTitle: "This is a title",
        CourseDescription: "This is a description",
        InstructorID: "456",
        CoursePrice: "£50",
        CourseCategory: "CAM", "ART",
        CreatedAt: "01/01/25"
      };
    
      return (
        <div>
          <h2>"Course ID:</h2><p>{data.CourseID}</p>
          <h1>"Course Title:{data.CourseTitle}</h1>
          <h1>"Description:{data.CourseDescription}</h1>
          <p>{data.description}</p>
          <p>Number: {data.number}</p>
        </div>
      );
    }
    
    export default DataDisplay;
] 

