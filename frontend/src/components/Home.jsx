import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 900,
    margin: "auto",
    backgroundColor: "#fff8e1",
  },
  media: {
    maxWidth: 700,
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(8),
    margin: "auto",
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <h1 align="center">Welcome Home</h1>
      <CardMedia
        className={classes.media}
        image="https://archive.org/download/under-construction/under-construction.jpg"
        title="home_page_logo"
      />
    </Card>
  );
}

export default Home;
