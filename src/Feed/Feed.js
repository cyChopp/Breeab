import HomeContainer from "./Home/HomeContainer";
import ProfileContainer from "./Profile/ProfileContainer";
import List from "./List/List";
import Messages from "./Messages/Messages";
import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SignUp from "../SignUp/SignUp";
import {
  setUserEmail,
  getUserInfoThunk,
  signOutThunk,
  signUpThunk,
  setIsAuth,
  setPasswordConfirmation,
  setPassword,
} from "../redux/authentication";
import { setUserInfoThunk } from "../redux/profile-reducer";
import { connect } from "react-redux";
import db from "../firebase";
import { compose } from "redux";
import IsAuthHoc from "../hoc/IsAuthHoc";
import SignIn from "../SignIn/SignIn";
import ShowUser from "./ShowUser/ShowUser";

const Feed = (props) => {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <HomeContainer />} />
        <Route path="/profile" render={() => <ProfileContainer />} />
        <Route path="/chat" render={() => <Messages fullname={props.fullname}image={props.image}/>}/>
        <Route path="/list" component={List} />
        <Route path="/user" component={ShowUser}/>

        <Route path="/signin" render={()=>(<SignIn  isAuth={props.isAuth} />)} />

        
        <Route
          path="/signup"
          render={() => (
            <SignUp
              currentUserId={props.currentUserId}
              setUserInfoThunk={props.setUserInfoThunk}
              fullname={props.fullname}
              username={props.username}
              location={props.location}
              status={props.status}
              isAuth={props.isAuth}
              setIsAuth={props.setIsAuth}
              password={props.password}
              passwordConfirmation={props.passwordConfirmation}
              setPasswordConfirmation={props.setPasswordConfirmation}
              setPassword={props.setPassword}
              signOutThunk={props.signOutThunk}
              signUpThunk={props.signUpThunk}
            />
          )}
        />
       

      </Switch>
    </>
  );
};

const mapStateToProps = (state) => ({
  image: state.profile.image,
  fullname: state.profile.fullname,
  username: state.profile.username,
  location: state.profile.location,
  status: state.profile.status,
  userAuthInfo: state.auth.userAuthInfo,
  currentUserId: state.auth.currentUserId,
  isAuth: state.auth.isAuth,
  password: state.auth.password,
  passwordConfirmation: state.auth.passwordConfirmation,
  //showUserProfile:s
});

export default compose(
  IsAuthHoc,
  connect(mapStateToProps, {
    setUserEmail,
    getUserInfoThunk,
    setIsAuth,
    setPasswordConfirmation,
    setPassword,
    signOutThunk,
    signUpThunk,
    setUserInfoThunk,
  })
)(Feed);
