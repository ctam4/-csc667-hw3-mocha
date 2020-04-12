import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import NotesForm from "./NotesForm.jsx";
import AllNotes from "./AllNotes.jsx";

const useStyles = makeStyles(theme => ({

}));

const Notes = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <NotesForm />
      <hr />
      <AllNotes />
    </Container>
  );
}

export default Notes;
