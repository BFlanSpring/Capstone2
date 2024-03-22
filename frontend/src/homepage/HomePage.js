import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css"

function HomePage() {
    return (
        <div className="Homepage">
          <div className="container">
            <h1 className="Title">Codex Hangar</h1>
            <p className="lead">Accelerating Wealth with Code and Capital.</p>
            <div>
              <Link to="/signup">
                <button className="signup-button">Signup</button>
              </Link>
              <Link to="/login">
                <button className="login-button">Login</button>
              </Link>
            </div>
          </div>
        </div>
    );
}

export default HomePage;