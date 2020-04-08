import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import Notes from "./Notes.jsx";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/Login" exact component={Login} />
    <Route path="/SignUp" exact component={SignUp} />
    <Route path="/Notes" exact component={Notes} />
  </Switch>
);

export default Routes;
