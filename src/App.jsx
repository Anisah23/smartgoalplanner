import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Header from "./Components/Header/Header";
import Dashboard from "./Components/Dashboard/Dashboard";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <Navbar/>
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
