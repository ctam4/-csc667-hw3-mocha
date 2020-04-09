import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Grid } from "@material-ui/core";

import { addNote } from "../redux/actions/actions";

const useStyles = makeStyles(theme => ({

}));

const NotesForm = () => {
  const classes = useStyles();

  const [content, setContent] = useState("");

  const handleSubmission = (e) => {
    e.preventDefault();
    if (content !== "") {
      addNote(content);
    }
    setContent("");
  };

  return (
    <form elevation={0} style={{ maxWidth: 800, padding: 0, margin: "auto", backgroundColor: "#fafafa" }}>
      <Grid container style={{ margin: 16, padding: 16 }}>
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <TextField required type="text" name="content" placeholder="Add Todo here" value={content} onChange={(e) => setContent(e.target.value)} fullWidth />
        </Grid>
        <Grid xs={2} md={1} item>
          <Button type="submit" fullWidth color="secondary" variant="outlined" onClick={handleSubmission}>
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

const mapDispatchToProps = {
  addNote: addNote,
};

export default connect(null, mapDispatchToProps)(NotesForm);
