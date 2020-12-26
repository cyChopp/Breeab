import React, { Fragment } from "react";
import { connect } from "react-redux";

import Media from "react-media";

import MobileSidebar from "./MobileSidebar/MobileSidebar";
import WebSidebar from "./WebSidebar/WebSidebar";
import "./SidebarContainer.css";

const SidebarContainer = (props) => {
  return (
    <div className="sidebar">
      <Media
        queries={{
          small: "(max-width: 999px)",
          large: "(min-width: 1000px)",
        }}
      >
        {(matches) => (
          <Fragment>
            {matches.small && (
              <MobileSidebar
                isAuth={props.isAuth}
                image={props.image}
                username={props.username}
              />
            )}
            {matches.large && (
              <WebSidebar
                isAuth={props.isAuth}
                image={props.image}
                username={props.username}
              />
            )}
          </Fragment>
        )}
      </Media>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  image: state.profile.image,
  username: state.profile.username,
});

export default connect(mapStateToProps)(SidebarContainer);
