import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, IconButton, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

import { removeNote } from "../redux/actions/actions";

const useStyles = makeStyles(theme => ({

}));

export const AllNotes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const classes = useStyles();

  return (
    <React.Fragment>
      <ul>
        {notes.map((note, index) => (
          <ListItem>
            <ListItemText>
              {note}
              <ListItemSecondaryAction>
                <IconButton onClick={() => dispatch(removeNote(index))}>
                  <DeleteOutlined />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemText>
          </ListItem>
        ))}
      </ul>
    </React.Fragment>
  );
};
