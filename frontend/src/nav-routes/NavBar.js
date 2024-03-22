
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../authentication/UserContext";
import "./NavBar.css";

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("NavBar", "currentUser=", currentUser);

  function LoggedInNav() {
    return (
      <ul className="NavBar">
        <li className="NavItem">
          <Link className="nav-link" id="Codex" to="/">
            Codex Hangar
          </Link>
        </li>
        <li className="NavItem dropdown">
          <NavLink className="nav-link" to="/topmovers">
            Finance
          </NavLink>
          <div className="dropdown-content">
            <NavLink to="/searchstocks">Search Stocks</NavLink>
            <NavLink to="/topmovers">Stock News</NavLink>
          </div>
        </li>
        <li className="NavItem">
          <NavLink className="nav-link" to="/jobs">
            Jobs
          </NavLink>
        </li>
        <li className="navItem logout dropdown"> 
          <span className="nav-link" onClick={logout}>Log out {currentUser.first_name || currentUser.username}</span>
          <div className="dropdown-content">
            <NavLink to="/profile">Profile</NavLink>
            <Link to="/" onClick={logout}>Log out</Link> 
          </div>
        </li>
      </ul>
    );
  }
  
  
  

  function LoggedOutNav() {
    return (
      <ul className="NavBar">
        <li className="NavItem">
          <Link className="nav-link" id="Codex" to="/">
            Codex Hangar
          </Link>
        </li>
        <li className="NavItem">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="NavItem">
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="Navigation navbar navbar-expand-md">
      {currentUser ? LoggedInNav() : LoggedOutNav()}
    </nav>
  );
}

export default NavBar;

