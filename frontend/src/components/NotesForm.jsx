import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Grid } from "@material-ui/core";

import { apiUrl } from "../url";
import { addNote } from "../redux/actions/actions";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    padding: 0,
    margin: "auto",
  },
}));

export const NotesForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [content, setContent] = useState("");

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (content !== "") {
      dispatch(addNote(content));
      setContent("");
    }
  };

  return (
    <div className={classes.paper}>
      <form elevation={0} className={classes.form} onSubmit={(e) => handleSubmission(e)}>
        <Grid container spacing={2}>
          <Grid xs={10} md={11} item>
            <TextField required type="text" name="content" placeholder="Write here" value={content} onChange={(e) => setContent(e.target.value)} fullWidth />
          </Grid>
          <Grid xs={2} md={1} item>
            <Button type="submit" fullWidth color="secondary" variant="outlined">Add</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
