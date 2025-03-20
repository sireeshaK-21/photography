import React, { useState } from "react";
import "./Login.css";
const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
    console.log("Container Class:", document.querySelector(".auth-container"));
  };
  return (
    <div className={`auth-container ${isSignUp ? "sign-up-mode" : ""}`}>
      {/* Sign In Form */}
      <div className="form-container sign-in-container">
        <form>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign In</button>
        </form>
      </div>
      {/* Sign Up Form */}
      <div className="form-container sign-up-container">
        <form>
          <h1>Sign Up</h1>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      {/* Overlay Section */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>Already have an account? Sign in here.</p>
            <button className="ghost" onClick={toggleForm}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Don’t have an account? Sign up here.</p>
            <button className="ghost" onClick={toggleForm}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;