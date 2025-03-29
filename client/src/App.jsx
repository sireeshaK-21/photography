import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import  Signup from './components/Signup.jsx';
// import Courses from './components/Courses.jsx';
import { SessionProvider } from './contexts/SessionContext.jsx';
import Gallery from './components/Gallery.jsx';
import Lessons from './components/Lessons.jsx';
import Reviews from './components/Review.jsx';
import Courses from './components/courses.jsx';

const App = () => {

  return (
    <div>
      <SessionProvider>
      <Header />
      <main style={{ textAlign: 'center' , padding: '20px'}}>
      <h1>Welcome to E-Learning Photography!</h1>
      <h4 className='sub-heading'>Master the art of capturing stunning moments through our expert-led courses, interactive lessons, and inspiring projects</h4>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/" element={<Gallery />} />
      </Routes>
      </main>
      </SessionProvider>
    </div>
  );
};


export default App;
