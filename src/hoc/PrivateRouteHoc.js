import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export const PrivateRouteHoc = (Component) => {
  const NewComponent = (props) => {
    return (
      <>{props.isAuth ? <Component {...props} /> : <Redirect to="/signup" />}</>
    );
  };

  return connect(mapStateToProps)(NewComponent);
};
