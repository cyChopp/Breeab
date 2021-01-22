import React, { useEffect, useState } from "react";

import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import SidebarOption from "../SidebarOption/SidebarOption";
import MessageRoundedIcon from "@material-ui/icons/MessageRounded";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListRoundedIcon from "@material-ui/icons/ListRounded";
import AssignmentIndRoundedIcon from "@material-ui/icons/AssignmentIndRounded";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import { NavLink } from "react-router-dom";
import { Avatar, Button, Typography } from "@material-ui/core";
import "./WebSidebar.css";

const WebSidebar = (props) => {
  const [userName  , setUserName] = useState(props.username.length > 7 ? props.username.substring(0, 7) + '...' : props.username)
  useEffect(()=>{
    if(props.username.length > 7){
      setUserName(props.username.substring(0, 7) + '...')

    }else{
      setUserName(props.username)
    }
  },[props.username])
  return (
    <div className="webSidebar">
      <div className='webSidebar__logoWrapper'>
      <Typography component="h1" className="webSidebar__logo">
        Breeab
      </Typography>
      </div>
      {props.isAuth && (
        <NavLink to="/profile">
          <div className="webSidebar__profile">
            <Avatar src={props.image} className="webSidebar__profileImage" />
            <div>{userName}</div>
          </div>
        </NavLink>
      )}
      <NavLink activeStyle={{ color: "#c2164f" }} exact to="/">
        <SidebarOption Icon={HomeRoundedIcon} text="Home" />
      </NavLink>

      <NavLink activeStyle={{ color: "#c2164f" }} to="/profile">
        {" "}
        <SidebarOption Icon={AccountCircleIcon} text="Profile" />
      </NavLink>

      <NavLink activeStyle={{ color: "#c2164f" }} to="/chat">
        <SidebarOption Icon={MessageRoundedIcon} text="Chat" />
      </NavLink>

      <NavLink activeStyle={{ color: "#c2164f" }} to="/list">
        <SidebarOption Icon={ListRoundedIcon} text="List" />
      </NavLink>

      {props.isAuth ? (
        <NavLink to="/profile">
          <SidebarOption Icon={AssignmentIndRoundedIcon} text="SignOut" />
        </NavLink>
      ) : (
        <NavLink to="/signup">
          <SidebarOption Icon={AssignmentIndRoundedIcon} text="SignUp" />
        </NavLink>
      )}

      {props.isAuth ? (
        <NavLink to="/">
          <Button variant="outlined" className="webSidebar__post" fullWidth>
            Post
          </Button>
        </NavLink>
      ) : (
        <Button variant="outlined" className="webSidebar__post" fullWidth>
          Post
        </Button>
      )}
    </div>
  );
};

export default WebSidebar;
