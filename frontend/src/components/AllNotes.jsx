import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, IconButton, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

import { removeNote } from "../redux/actions/actions";

const useStyles = makeStyles(theme => ({

}));

const AllNotes = ({ notes = [] }) => {
  const classes = useStyles();

  return (
    <ul>
      {notes.map((note, index) => (
        <ListItem style={{ maxWidth: 700, margin: "auto", padding: 3 }}>
          <ListItemText style={{ margin: "auto", maxWidth: 800 }} primary={this.text}>
            {note.content}
            <ListItemSecondaryAction>
              <IconButton onClick={() => removeNote(index)}>
                <DeleteOutlined />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItemText>
        </ListItem>
      ))}
    </ul>
  );
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
  };
};

const mapDispatchToProps = {
  removeNote: removeNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllNotes);
