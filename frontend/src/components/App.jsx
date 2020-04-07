import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import NavBar from "./NavBar.jsx";
import Routes from "./Routes.jsx";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes />
    </Router>
  );
};

export default App;
