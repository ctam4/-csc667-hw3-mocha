import React from "react";
import "../App.css";
import Routes from "./Routes.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./NavBar.jsx";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes />
    </Router>
  );
};

export default App;
