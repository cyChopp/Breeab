import React from "react";
import './Sidebar.css';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';import SidebarOption from "./SidebarOption/SidebarOption";
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import MessageRoundedIcon from '@material-ui/icons/MessageRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListRoundedIcon from '@material-ui/icons/ListRounded';

import { Button, Typography } from "@material-ui/core";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* <h2 className="sidebar--logo">Breeab</h2> */}
      <Typography component='h1' className="sidebar--logo">Breeab</Typography>
        <SidebarOption active Icon={HomeRoundedIcon} text="Home" />
        <SidebarOption Icon={AccountCircleIcon} text="Profile" />
        <SidebarOption Icon={MessageRoundedIcon} text="Messages" />
        <SidebarOption Icon={NotificationsRoundedIcon} text="Notifications" />
        <SidebarOption Icon={ListRoundedIcon} text="List" />

        <Button variant="outlined" className="sidebar--post" fullWidth>Post</Button>
    </div>
  );
};

export default Sidebar;
