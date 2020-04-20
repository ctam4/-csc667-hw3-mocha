import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button, TextField, Link, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Redirect } from "react-router-dom";

import { apiUrl } from "../url";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const [nextPage, setNextPage] = useState(false);

  const handleSubmission = async (e) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      await fetch(apiUrl + '/auth/create', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password: password,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('error ' + res.status);
          }
          return res.json();
        })
        .then((data) => {
          if (data.status === 'ERROR') {
            throw new Error(data.response);
          }
          else {
            alert('Sign-up successful.');
            //loggin state will be recorded in the singin page
            setNextPage(true);
          }
        })
        .catch(alert);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Sign-up</Typography>
        <form className={classes.form} onSubmit={(e) => handleSubmission(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth id="email" label="Email Address" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setUserEmail(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setUserPassword(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary" id="signup">Sign Up</Button>
            </Grid>
            <Grid item xs={12} justify="center">
              <Link to="/LogIn" href="/LogIn" variant="body2">Already have an account? Sign in now</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {nextPage && <Redirect to="./LogIn" />}
    </Container>
  );
};

export default SignUp;
