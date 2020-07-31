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
          to="/search">
          <button className="btn">
            Search
          </button>
          </NavLink>
          <NavLink
          to="/saved">
          <button className="btn">
            Saved
          </button>
          </NavLink>
    </nav>
  );
}

export default Nav;
