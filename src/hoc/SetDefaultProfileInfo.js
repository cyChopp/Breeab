import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  setUserInfoThunk,
  setDefaultProfileInfo,
} from "../redux/profile-reducer";

const mapStateToProps = (state) => ({
  currentUserId: state.auth.currentUserId,
  fullname: state.profile.fullname,
  username: state.profile.username,
  location: state.profile.location,
  status: state.profile.status,
  setDefaultInfo: state.profile.setDefaultInfo,
});

const SetDefaultProfileInfo = (Component) => {
  const NewComponent = (props) => {
    useEffect(() => {
      if (props.currentUserId != "" && props.setDefaultInfo === false) {
        props.setUserInfoThunk(
          props.fullname,
          props.username,
          props.status,
          props.location,
          props.currentUserId
        );
        props.setDefaultProfileInfo(true);
      }
    }, [props.currentUserId]);

    return (
      <>
        <Component {...props} />
      </>
    );
  };

  return connect(mapStateToProps, { setUserInfoThunk, setDefaultProfileInfo })(
    NewComponent
  );
};

export default SetDefaultProfileInfo;
