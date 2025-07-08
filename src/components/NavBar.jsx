import React from "react";
import { Link } from "react-router-dom";
import "./NavBarStyles.css";

const NavBar = ({ user, onLogout, onAuth0Login }) => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Auth Demo</Link>
      </div>

      <div className="nav-links">
        {user ? (
          <div className="user-section">
            <span className="username">Welcome, {user.username}!</span>
            {user.auth0Id && <span className="auth0-badge">Auth0</span>}
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
            <button onClick={onAuth0Login} className="auth0-nav-btn">
              Login with Auth0
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
