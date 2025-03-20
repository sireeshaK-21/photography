import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSession } from '../contexts/SessionContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faUserPlus, faCamera } from '@fortawesome/free-solid-svg-icons';

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
      <div className='header-logo-container'>
      <img className='header-logo' 
          src="/logo.png" 
        />
      <h1>Photography</h1>
      </div>
     
      
      <nav>
      <div className='header-nav-links'>
      <Link to="/"><FontAwesomeIcon icon={faHome} /></Link>
      {token ? (
        <>
          <button onClick={handleLogout}><FontAwesomeIcon icon={faSignInAlt} /></button>
        </>
      ) : (
        <>
          <Link to="/login">
              <FontAwesomeIcon icon={faUserPlus} /> 
            </Link>
          <Link to="/signup">Courses</Link>
        </>
      )}
      </div>
      </nav>
    </header>
    
  );
  <p>Welcome</p>
};

export default Header;
