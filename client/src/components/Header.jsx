import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSession } from '../contexts/SessionContext';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const { user } = useSession();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };


  const wordCase = (word) => {  
    if (word === undefined) {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <header>
      <h1>Photography</h1>
      <nav>
      <Link to="/">Home</Link>
      {token ? (
        <>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/course">Courses</Link>
          <Link to="/signup">Courses</Link>
        </>
      )}
      </nav>
    </header>
    
  );
  <p>Welcome</p>
};

export default Header;
