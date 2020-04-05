import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/Login" exact component={Login} />
    <Route path="/SignUp" exact compoonloadedmetadatanent={SignUp} />
  </Switch>
);

export default Routes;
