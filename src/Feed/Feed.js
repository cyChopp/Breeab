import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import List from "./List/List";
import Messages from "./Messages/Messages";
import React from "react";
import { Route,Switch } from "react-router-dom";
import SignUp from "../SignUp/SignUp";

const Feed = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/messages" component={Messages}/>
        <Route path="/list" component={List}/>
        <Route path="/signup" component={SignUp}/>
      </Switch>
    </>
  );
};

export default Feed;
