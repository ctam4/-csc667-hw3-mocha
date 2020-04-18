import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import { NotesForm } from "./NotesForm.jsx";
import { AllNotes } from "./AllNotes.jsx";

const useStyles = makeStyles(theme => ({

}));

const Notes = () => {
  const dispatch = useDispatch();
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
