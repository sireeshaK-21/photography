import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import  Signup from './components/Signup.jsx';
import Courses from './components/Courses.jsx';
import { SessionProvider } from './contexts/SessionContext.jsx';
import Course from './components/Course.jsx';


const App = () => {

  return (
    <div>
      <SessionProvider>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Gallery />} />
      </Routes>
      </SessionProvider>
    </div>
  );
};


export default App;
