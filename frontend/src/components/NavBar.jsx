import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} to="/" component={Link}>
            CSC 667 HW3
          </Typography>
          <Button color="inherit" to="/Login" component={Link}>
            Login
          </Button>
          <Button color="inherit" to="/Notes" component={Link}>
            NotePad
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
