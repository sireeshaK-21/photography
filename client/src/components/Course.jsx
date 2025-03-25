 
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

  
      <div>
    <h1>Course Title </h1>
    <h3>Course ID:</h3>
    <h3>Category</h3>
    <h3>Price:</h3>

    <h3>Instructor:</h3>
    <p>Description here</p>
  </div>

     
      <button type="submit"> Add a New Course</button>
    </form>
  );
};

export default Course;