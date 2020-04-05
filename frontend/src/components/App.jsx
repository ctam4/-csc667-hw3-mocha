import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import NavBar from "./NavBar.jsx";
import Routes from "./Routes.jsx";

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <NavBar />
      <Routes />
    </Router>
  );
};

export default App;
