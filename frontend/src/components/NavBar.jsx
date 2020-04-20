import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";

import { setIsLoggedIn } from "../redux/actions/actions.js";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

const NavBar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const logout = () => {
    if (isLoggedIn) {
      dispatch(setIsLoggedIn(false))
      return <Redirect to="/" />
    }
    else {
      alert("You are not logged in.")
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            to="/"
            component={Link}
          >
            CSC 667 HW3
          </Typography>
          <Button color="inherit" to="/Login" component={Link}>
            Login
          </Button>
          <Button color="inherit" to="/Notes" component={Link}>
            NotePad
          </Button>
          <Button color="inherit" to="/" component={Link} onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
