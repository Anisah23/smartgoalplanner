import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">SmartGoal</div>
      <button className="menu-toggle" onClick={handleToggle}>
        ☰
      </button>
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#goal-form">Add Goal</a></li>
        <li><a href="#overview">Overview</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
