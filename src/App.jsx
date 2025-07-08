import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import "./AppStyles.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { API_URL } from "./shared";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { auth0Config } from "./auth0-config";

const AppContent = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    isAuthenticated,
    user: auth0User,
    loginWithRedirect,
    logout: auth0Logout,
  } = useAuth0();

  // Check authentication status on app load
  useEffect(() => {
    checkAuth();
  }, []);

  // Handle Auth0 authentication
  useEffect(() => {
    if (isAuthenticated && auth0User) {
      handleAuth0Login();
    }
  }, [isAuthenticated, auth0User]);

  const handleAuth0Login = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/auth0`,
        {
          auth0Id: auth0User.sub,
          email: auth0User.email,
          username: auth0User.nickname || auth0User.email?.split("@")[0],
        },
        {
          withCredentials: true,
        }
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Auth0 login error:", error);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        withCredentials: true,
      });
      setUser(response.data.user);
    } catch {
      console.log("Not authenticated");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Logout from our backend
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);

      // Logout from Auth0
      auth0Logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleAuth0LoginClick = () => {
    loginWithRedirect();
  };

  if (loading) {
    return <div className="app">Loading...</div>;
  }

  return (
    <div>
      <NavBar
        user={user}
        onLogout={handleLogout}
        onAuth0Login={handleAuth0LoginClick}
        isAuth0Authenticated={isAuthenticated}
      />
      <div className="app">
        <h1>Hello React!</h1>
        <img className="react-logo" src="/react-logo.svg" alt="React Logo" />

        <Routes>
          <Route
            path="/login"
            element={
              <Login setUser={setUser} onAuth0Login={handleAuth0LoginClick} />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup setUser={setUser} onAuth0Login={handleAuth0LoginClick} />
            }
          />
          <Route
            path="/"
            element={
              <div>
                {user ? (
                  <div>
                    <h2>Welcome, {user.username}!</h2>
                    <p>You are logged in.</p>
                    {user.auth0Id && <p>Authenticated via Auth0</p>}
                  </div>
                ) : (
                  <div>
                    <h2>Welcome!</h2>
                    <p>
                      Please <Link to="/login">login</Link> or{" "}
                      <Link to="/signup">signup</Link> to continue.
                    </p>
                    <button
                      onClick={handleAuth0LoginClick}
                      className="auth0-login-btn"
                    >
                      Login with Auth0
                    </button>
                  </div>
                )}
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Auth0Provider {...auth0Config}>
      <Router>
        <AppContent />
      </Router>
    </Auth0Provider>
  );
};

// We're using React Router to handle the navigation between pages.
// It's important that the Router is at the top level of our app,
// and that we wrap our entire app in it. With this in place, we can
// declare Routes, Links, and use useful hooks like useNavigate.
const root = createRoot(document.getElementById("root"));
root.render(<App />);
