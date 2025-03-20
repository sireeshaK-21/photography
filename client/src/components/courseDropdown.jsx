import React, { CSSProperties } from 'react';

import Select from 'react-select';

import {
    CourseID,
    CourseTitle,
    CourseDescription,
    InstructorID,
    CoursePrice,
    CourseCategory, 
   } from '../courseData';

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const groupBadgeStyles: CSSProperties = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const formatGroupLabel = (data: GroupedOption) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

export default () => (
  <Select<ColourOption | FlavourOption, false, GroupedOption>
    defaultValue={colourOptions[1]}
    options={groupedOptions}
    formatGroupLabel={formatGroupLabel}
  />
);


return (
    <div>
      <h2>"Course ID:</h2><p>{data.CourseID}</p>  <h2>"Course ID:</h2><p>{data.CourseID}</p>
      <h1>"Course Title:{data.CourseTitle}</h1>
      <h1>"Description:</h1>
      <p>{data.CourseDescription}</p>
      <h2>Course Price:</h2> <p>{data.CoursePrice}</p>
      <h2>Course Category:</h2> <p>{data.CourseCategory}</p>
    </div>
  );