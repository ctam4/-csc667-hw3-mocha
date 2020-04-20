import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import { apiUrl } from "../url";
import { addNote, setIsLoggedIn } from "../redux/actions/actions";

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

export const NotesForm = () => {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["token"]);
  const isUserLoggedIn = useSelector(state => state.isLoggedIn);
  const classes = useStyles();
  const [notesinput, setContent] = useState("");

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
      })
      .catch(alert);
      setContent("");
    }
  };
  if (!isUserLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div className={classes.paper}>
      <form
        elevation={0}
        className={classes.form}
        onSubmit={e => handleSubmission(e)}
      >
        <Grid container spacing={2}>
          <Grid xs={10} md={11} item>
            <TextField
              required
              type="text"
              name="content"
              placeholder="Write here"
              value={notesinput}
              onChange={e => setContent(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid xs={2} md={1} item>
            <Button
              type="submit"
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
  );
};
