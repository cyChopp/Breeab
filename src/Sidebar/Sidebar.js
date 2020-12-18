import React from "react";
import "./Sidebar.css";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import SidebarOption from "./SidebarOption/SidebarOption";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import MessageRoundedIcon from "@material-ui/icons/MessageRounded";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListRoundedIcon from "@material-ui/icons/ListRounded";
import AssignmentIndRoundedIcon from "@material-ui/icons/AssignmentIndRounded";

import { Avatar, Button, Icon, makeStyles, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

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




const Sidebar = (props) => {

  const styles = useClasses();

  return (
    <div className="sidebar">
      {/* <h2 className="sidebar--logo">Breeab</h2> */}
      <Typography component="h1" className="sidebar--logo">
        Breeab
      </Typography>
    {props.isAuth && 
      <NavLink to="/profile" >
        <div className="sidebar__profile">
        <Avatar src={props.image} className="sidebar__profileImage" />
        {props.username}
        </div>
      </NavLink>
    }
      <NavLink to="/">
        <SidebarOption active Icon={HomeRoundedIcon} text="Home" />
      </NavLink>

      <NavLink to="/profile">
        {" "}
        <SidebarOption Icon={AccountCircleIcon} text="Profile" />
      </NavLink>

      <NavLink to="/messages">
        <SidebarOption Icon={MessageRoundedIcon} text="Messages" />
      </NavLink>

      <NavLink to="/notifications">
        <SidebarOption Icon={NotificationsRoundedIcon} text="Notifications" />
      </NavLink>

      <NavLink to="/list">
        <SidebarOption Icon={ListRoundedIcon} text="List" />
      </NavLink>

      {props.isAuth ? (
        <NavLink to="/profile">
          <SidebarOption Icon={AssignmentIndRoundedIcon} text="Sign out" />
        </NavLink>
      ) : (
        <NavLink to="/signup">
          <SidebarOption Icon={AssignmentIndRoundedIcon} text="SignUp" />
        </NavLink>
      )}

      <Button variant="outlined" className="sidebar--post" fullWidth>
        Post
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  image:state.profile.image,
  username:state.profile.username
});

export default connect(mapStateToProps)(Sidebar);
