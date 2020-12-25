import React, { Fragment } from "react";
import "./SidebarContainer.css";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import SidebarOption from "./SidebarOption/SidebarOption";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import MessageRoundedIcon from "@material-ui/icons/MessageRounded";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListRoundedIcon from "@material-ui/icons/ListRounded";
import AssignmentIndRoundedIcon from "@material-ui/icons/AssignmentIndRounded";
import RecentActorsIcon from '@material-ui/icons/RecentActors';

import Media from 'react-media';


import {
  makeStyles,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import MobileSidebar from "./MobileSidebar/MobileSidebar";
import WebSidebar from "./WebSidebar/WebSidebar";

const useClasses = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  size: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const SidebarContainer = (props) => {
  const styles = useClasses();

  return (
    <div className="sidebar">
      <Media queries={{
        small: "(max-width: 999px)",
        large: "(min-width: 1000px)"
      }}>
        {matches => (
          <Fragment>
            {matches.small && <MobileSidebar isAuth={props.isAuth} image={props.image} username={props.username} />}
            {matches.large && <WebSidebar isAuth={props.isAuth} image={props.image} username={props.username} />}
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
