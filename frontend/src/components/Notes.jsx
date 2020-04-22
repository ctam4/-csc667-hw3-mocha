import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Grid, ListItem, ListItemText, TextField } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import { apiUrl } from "../url";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    padding: 0,
    margin: "auto"
  }
}));

const Notes = () => {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["token"]);
  const [notes, setNotes] = useState([]);
  const [notesinput, setContent] = useState(undefined);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const classes = useStyles();

  useEffect(() => {
    if (notesinput === undefined) {
      load();
      setContent("");
    }
  });

  const load = async () => {
    await fetch(apiUrl + '/notes/get', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: cookies.token,
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
      setNotes(data.response);
    })
    .catch(alert);
  };

  const handleSubmission = async e => {
    e.preventDefault();

    if (notesinput !== "") {
      //dispatch(addNote(notesinput));
      await fetch(apiUrl + '/notes/create', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: cookies.token,
          notesinput: notesinput,
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
        setContent(undefined);
      })
      .catch(alert);
    }
  };

  if (!isLoggedIn) {
    return (
      <Redirect to="/" />
    );
  }
  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <form
          elevation={0}
          className={classes.form}
          onSubmit={handleSubmission}
        >
          <Grid container spacing={2}>
            <Grid xs={10} md={11} item>
              <TextField
                required
                type="text"
                id="notesinput"
                placeholder="Write here"
                value={notesinput}
                onChange={e => setContent(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid xs={2} md={1} item>
              <Button
                type="submit"
                id="submit"
                fullWidth
                color="secondary"
                variant="outlined"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <hr />
      <ul id="notes">
        {notes.map((note) => (
        <ListItem>
          <ListItemText>{note}</ListItemText>
        </ListItem>
        ))}
      </ul>
    </Container>
  );
}

export default Notes;
