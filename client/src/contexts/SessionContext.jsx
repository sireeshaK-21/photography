import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Fetch the current user info using the /me endpoint
      axios.get('/api/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.log("Error fetching user data", error);
        localStorage.removeItem('authToken');
      });
    }
  }, []);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);