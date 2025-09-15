import React, { useState } from 'react';
import './App.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function App() {
  const [page, setPage] = useState('login'); // 'login' or 'signup'

  // Login state
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({});

  // Signup state
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [signupErrors, setSignupErrors] = useState({});

  // Validate login form
  const validateLogin = () => {
    const errors = {};
    if (!emailRegex.test(loginData.email)) errors.email = "Invalid email";
    if (loginData.password.length < 6) errors.password = "Password must be 6+ chars";
    return errors;
  };

  // Validate signup form
  const validateSignup = () => {
    const errors = {};
    if (!signupData.username.trim()) errors.username = "Username is required";
    if (!emailRegex.test(signupData.email)) errors.email = "Invalid email";
    if (signupData.password.length < 6) errors.password = "Password must be 6+ chars";
    if (signupData.password !== signupData.confirmPassword) errors.confirmPassword = "Passwords don't match";
    return errors;
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    const errors = validateLogin();
    setLoginErrors(errors);
    if (Object.keys(errors).length === 0) {
      alert("Login successful (placeholder)");
      // Add auth logic here
    }
  };

  const submitSignup = (e) => {
    e.preventDefault();
    const errors = validateSignup();
    setSignupErrors(errors);
    if (Object.keys(errors).length === 0) {
      alert("Sign-Up successful (placeholder)");
      setPage('login');
    }
  };

  return (
    <div className="container">
      {page === 'login' && (
        <>
          <div className="left-panel">
            <h1>Welcome Back!</h1>
            <p>Access and manage your task efficiently</p>
          </div>
          <div className="right-panel">
            <form onSubmit={submitLogin} noValidate>
              <h2>Login</h2>

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
                className={loginErrors.email ? "input-error" : ""}
              />
              {loginErrors.email && <div className="error-text">{loginErrors.email}</div>}

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                className={loginErrors.password ? "input-error" : ""}
              />
              {loginErrors.password && <div className="error-text">{loginErrors.password}</div>}

              <button type="submit" className="btn-primary">Login</button>

              <p className="switch-text">
                Don't have an account?{' '}
                <button type="button" className="switch-link" onClick={() => setPage('signup')}>
                  Sign Up
                </button>
              </p>
            </form>
          </div>
        </>
      )}

      {page === 'signup' && (
        <>
          <div className="left-panel signup-panel">
            <h1>Create Account</h1>
            <p>Join us today and simplify your workflow</p>
          </div>
          <div className="right-panel">
            <form onSubmit={submitSignup} noValidate>
              <h2>Sign Up</h2>

              <input
                name="username"
                type="text"
                placeholder="Username"
                value={signupData.username}
                onChange={handleSignupChange}
                className={signupErrors.username ? "input-error" : ""}
              />
              {signupErrors.username && <div className="error-text">{signupErrors.username}</div>}

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={signupData.email}
                onChange={handleSignupChange}
                className={signupErrors.email ? "input-error" : ""}
              />
              {signupErrors.email && <div className="error-text">{signupErrors.email}</div>}

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleSignupChange}
                className={signupErrors.password ? "input-error" : ""}
              />
              {signupErrors.password && <div className="error-text">{signupErrors.password}</div>}

              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
                className={signupErrors.confirmPassword ? "input-error" : ""}
              />
              {signupErrors.confirmPassword && <div className="error-text">{signupErrors.confirmPassword}</div>}

              <button type="submit" className="btn-primary">Sign Up</button>

              <p className="switch-text">
                Already have an account?{' '}
                <button type="button" className="switch-link" onClick={() => setPage('login')}>
                  Login
                </button>
              </p>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
