import React from "react";
import { Link } from "react-router-dom";

const navStyle = {
  display: "flex",
  justifyContent: "space-between",  // This is the required property
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#333",
  color: "white",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  margin: "0 10px",
};

function Navbar() {
  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/about" style={linkStyle}>
          About
        </Link>
        <Link to="/services" style={linkStyle}>
          Services
        </Link>
        <Link to="/contact" style={linkStyle}>
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
