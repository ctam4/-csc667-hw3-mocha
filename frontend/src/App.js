import React from "react";
import "./App.css";
import Routes from "./Components/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar.js";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes />
    </Router>
  );
};
export default App;
