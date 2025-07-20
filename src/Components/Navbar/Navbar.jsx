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
     
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
         <li><a href="#header">Add Goal</a></li>
          <li><a href="#header">Deposit</a></li>
        <li><a href="#goalsection">Goals</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
