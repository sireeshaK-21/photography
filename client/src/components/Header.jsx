import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faUserPlus, faCamera, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useSession();

  const handleLogout = () => {
    localStorage.removeItem('authToken');  // Remove token from localStorage
    setUser(null);  // Reset user state in context
    navigate('/login');
  };

  return (
    <header>
      <div className='header-logo-container'>
        <img className='header-logo' src="/logo.png" alt="Logo" />
        <h1>Photography</h1>
      </div>
      <nav className="flex items-center">
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">
            <FontAwesomeIcon icon={faHome} className="mr-1" />
          </Link>
          <Link to="/courses" className="hover:text-gray-300">
            Courses
          </Link>
          {user ? (
            <>
              <Link to="/lessons" className="hover:text-gray-300">
                Lessons
              </Link>
              <Link to="/reviews" className="hover:text-gray-300">
                Reviews
              </Link>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faUserCircle} className="mr-1" />
                  <span>{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="hover:text-red-500 flex items-center"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex space-x-2">
              <Link to="/login" className="hover:text-blue-400">
                <FontAwesomeIcon icon={faSignInAlt} className="mr-1" />
                
              </Link>
            
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
