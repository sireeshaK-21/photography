import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import  Signup from './components/Signup.jsx';
import Courses from './components/Courses.jsx';
import { SessionProvider } from './contexts/SessionContext.jsx';
import Gallery from './components/Gallery.jsx';



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
<<<<<<< HEAD
        <Route path="/courses" element={<Courses />} />
=======
        <Route path="/" element={<Gallery />} />
>>>>>>> be649959c7a4edcdb2f00e878bd45f55557d189e
      </Routes>
      </main>
      </SessionProvider>
    </div>
  );
};


export default App;
