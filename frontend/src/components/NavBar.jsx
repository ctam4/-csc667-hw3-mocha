import React from "react";
import { AppBar, Toolbar, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Paper
      elevation={0}
      style={{ padding: 0, margin: 0, backgroundColor: "#721f4c" }}
    >
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#721f4c", height: 74 }}>
          <Link style={{ textDecoration: "none" }} to="/">
            <h1 style={{ WebkitTextFillColor: "#eccd66" }}>CSC 667 HW3</h1>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/Login">
            <h2
              style={{ paddingLeft: 980, WebkitTextFillColor: "#eccd66" }}
              className="Login"
            >
              Login
            </h2>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/SignUp">
            <h2 style={{ paddingLeft: 100, WebkitTextFillColor: "#eccd66" }}>
              SignUp
            </h2>
          </Link>
        </Toolbar>
      </AppBar>
    </Paper>
  );
};

export default NavBar;
