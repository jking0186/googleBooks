import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
        Google Books
        </a>
          <NavLink
          to="/search"
          className="nav-link">
            Search
          </NavLink>
          <NavLink
          to="/saved"
          className="nav-link">
            Saved
          </NavLink>
    </nav>
  );
}

export default Nav;
