import React, { Component } from "react";
import { connect } from "react-redux";
import { addNote } from "../redux/actions/actions";
import {
  TextField,
  Button,
  Grid,
  AppBar,
  Toolbar,
  Typography
} from "@material-ui/core";

class NotesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmission = e => {
    e.preventDefault();

    let { content } = this.state;
    if (content !== "") this.props.addNote(content);
    this.setState({ content: "" });
  };

  render() {
    return (
      <form
        elevation={0}
        style={{
          maxWidth: 800,
          padding: 0,
          margin: "auto",
          backgroundColor: "#fafafa"
        }}
      >
        <AppBar
          color="primary"
          position="static"
          style={{ marginTop: 10, height: 64 }}
        >
          <Toolbar style={{ padding: 5, height: 64 }}>
            <Typography color="inherit">NOTE PAD</Typography>
          </Toolbar>
        </AppBar>

        <Grid container style={{ margin: 16, padding: 16 }}>
          <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
            <TextField
              required
              type="text"
              name="content"
              placeholder="Add Todo here"
              value={this.state.content}
              onChange={this.handleChange}
              onKeyPress={this.onInputKeyPress}
              fullWidth
            />
          </Grid>
          <Grid xs={2} md={1} item>
            <Button
              type="submit"
              fullWidth
              color="secondary"
              variant="outlined"
              onClick={this.handleSubmission}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default connect(
  null,
  {
    addNote: addNote
  }
)(NotesForm);
