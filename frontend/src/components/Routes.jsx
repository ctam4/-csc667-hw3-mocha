import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home.jsx";
import LogIn from "./LogIn.jsx";
import SignUp from "./SignUp.jsx";
import Notes from "./Notes.jsx";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/LogIn" exact component={LogIn} />
    <Route path="/SignUp" exact component={SignUp} />
    <Route path="/Notes" exact component={Notes} />
  </Switch>
);

export default Routes;
