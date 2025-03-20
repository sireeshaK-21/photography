import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import  Signup from './components/Signup.jsx';
import { SessionProvider } from './contexts/SessionContext.jsx';
import Gallery from './components/Gallery.jsx';
import Course from './components/Course.jsx';


const App = () => {

  return (
    <div>
      <SessionProvider>
      <Header />
      <main style={{ textAlign: 'center' , padding: '20px'}}>
      <h1>Welcome to E Learning Platform</h1>
      <h2>Learn and Grow</h2>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Gallery />} />
        <Route path="/course" element={<Course />} />
      </Routes>
      </main>
      </SessionProvider>
    </div>
  );
};


export default App;
