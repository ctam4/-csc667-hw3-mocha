import React, { Component } from "react";
import { connect } from "react-redux";
import { removeNote } from "../redux/actions/actions";
import {
  ListItem,
  IconButton,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

class AllNotes extends Component {
  
  removeNote = index => {
    this.props.removeNote(index);
  };

  render() {
    
    const notesItems = this.props.notes.map((note, index) => (
      <ListItem style={{ maxWidth: 700, margin: "auto", padding: 3 }}>
        <ListItemText
          style={{ margin: "auto", maxWidth: 800 }}
          primary={this.text}
        >
          {note.content}
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Delete Todo"
              onClick={() => this.removeNote(index)}
            >
              <DeleteOutlined />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItemText>
      </ListItem>
    ));

    return (
      <React.Fragment>
        <ul >{notesItems}</ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes
  };
};

const mapDispatchToProprs = {
  removeNote: removeNote
};

export default connect(
  mapStateToProps,
  mapDispatchToProprs
)(AllNotes);
