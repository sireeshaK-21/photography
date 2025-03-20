 
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

import { useSession } from '../contexts/SessionContext';



//pip modifications
import Select from 'react-select'


const defaultUser = {
  email: '',
  password: '',
};

//this is page content
const Course = () => {
  const [email, setEmail] = useState(defaultUser.email);
  const [password, setPassword] = useState(defaultUser.password);
  const navigate = useNavigate();

  const { setUser } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/users/login', { email: email, password: password });
      const data = response.data;

    
      // Update the user in the context
      setUser({
        username: data.user.username,
        id: data.user.id,
      });


      localStorage.setItem('authToken', data.token);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  //This is view of page
  return (
    <form onSubmit={handleSubmit}>
      <h2>Courses Available</h2>

      <p>Browse the available courses below for more details on our current study programmes</p>

      <h3>Select course from dropdown menu for further details:</h3>
  
      <div>
    <h1>Course Title 1</h1>
    <h3>Course ID:</h3>
    <h3>Category</h3>
    <h3>Price:</h3>

    <h3>Instructor:</h3>
    <p>Description here</p>
  </div>

     
      <button type="submit"> View Course Details</button>
    </form>
  );
};



const dropdown () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
    setSelectedOption(event.target.value);
    };

return (
<div>
  <label htmlFor="course-dropdown">Select Course: </label>
  <select id="course-dropdown" value={selectedOption} onChange={handleChange}>
    <option value="">--Select--</option>
    <option value="CAM1">Basic Camera Operation</option>
    <option value="CAM2">Expert Advice: Selecting the correct lens</option>
    <option value="CAM3">Camera maintenance and repair</option>
  </select>
  <p>Selected option: {selectedOption}</p>
</div>
)};





export default Course;