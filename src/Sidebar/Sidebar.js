import React from "react";
import "./Sidebar.css";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import SidebarOption from "./SidebarOption/SidebarOption";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import MessageRoundedIcon from "@material-ui/icons/MessageRounded";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListRoundedIcon from "@material-ui/icons/ListRounded";

import { Button, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* <h2 className="sidebar--logo">Breeab</h2> */}
      <Typography component="h1" className="sidebar--logo">
        Breeab
      </Typography>

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

      <NavLink to="/signup">
        <SidebarOption Icon={ListRoundedIcon} text="SignUp" />
      </NavLink>

      <Button variant="outlined" className="sidebar--post" fullWidth>
        Post
      </Button>
    </div>
  );
};

export default Sidebar;
