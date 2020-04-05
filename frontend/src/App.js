import React from "react";
import "./App.css";
import Routes from "./Components/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./Components/NavBar";
const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes />
    </Router>
  );
};
export default App;
