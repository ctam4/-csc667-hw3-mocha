import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, IconButton, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

import { apiUrl } from "../url";
import { removeNote } from "../redux/actions/actions";

const useStyles = makeStyles(theme => ({

}));

export const AllNotes = () => {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["token"]);
  let notes = [];
  const classes = useStyles();

  useEffect(async () => {
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
      else {
        notes = data.response;
      }
    })
    .catch(alert);
  });

  return (
    <React.Fragment>
      <ul>
        {notes.map((note, index) => (
          <ListItem>
            <ListItemText >
              {note.content}
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
