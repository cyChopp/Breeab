import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import db from "../firebase";
import { getUserInfoThunk } from "../redux/authentication";
import { setIsProfileFetching, getUserThunk } from "../redux/profile-reducer";

const IsAuthHoc = (Component, props) => {
  const NewComponent = (props) => {
    useEffect(() => {
      db.auth().onAuthStateChanged((u) => {
        if (u) {
          props.getUserInfoThunk(u.uid); //auth
          props.getUserThunk(u.uid); //profile info
          props.setIsProfileFetching(true);
        }
      });
    }, []);

    return <Component {...props} />;
  };

  const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
  });

  return connect(mapStateToProps, {
    getUserInfoThunk,
    setIsProfileFetching,
    getUserThunk,
  })(NewComponent);
};

export default IsAuthHoc;
