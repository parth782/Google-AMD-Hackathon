import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Header(props) {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/user/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
