import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserThunk } from "../redux/profile-reducer";

const mapStateToProps = (state) => ({
  currentUserId: state.auth.currentUserId,
  isProfileInfoSet: state.profile.isProfileInfoSet,
  isProfileFetching: state.profile.isProfileFetching,
});

const ProfileInfoHoc = (Component) => {
  const NewComponent = (props) => {
    useEffect(() => {
      props.getUserThunk(props.currentUserId);
    }, [props.currentUserId]);

    return (
      <>
        {!props.isProfileFetching ? (
          <Component {...props} />
        ) : (
          <div className="preloader__Wrapper">
            <CircularProgress color="secondary" size={20} />
          </div>
        )}
      </>
    );
  };

  return connect(mapStateToProps, { getUserThunk })(NewComponent);
};

export default ProfileInfoHoc;
