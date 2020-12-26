import React from "react";

import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import SidebarOption from "../SidebarOption/SidebarOption";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import MessageRoundedIcon from "@material-ui/icons/MessageRounded";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListRoundedIcon from "@material-ui/icons/ListRounded";
import AssignmentIndRoundedIcon from "@material-ui/icons/AssignmentIndRounded";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import { NavLink } from "react-router-dom";
import { Avatar, Button, Fab, makeStyles, Typography } from "@material-ui/core";
import { AddIcCallOutlined } from "@material-ui/icons";
import "./MobileSidebar.css";

import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const MobileSidebar = (props) => {
  const classes = useStyles();

  return (
    <div className="mobileSidebar">
      {props.isAuth && (
        <div>
          <NavLink to="/profile">
            <div className="mobileSidebar__profile">
              <Avatar src={props.image} className={classes.margin} />
            </div>
          </NavLink>
        </div>
      )}
      <div>
        <NavLink activeStyle={{ color: "#c2164f" }} exact to="/">
          <div className={`mobileSidebar__nav`}>
            <HomeRoundedIcon style={{ fontSize: 35 }} />
          </div>
        </NavLink>
      </div>
      <div>
        <NavLink activeStyle={{ color: "#c2164f" }} to="/profile">
          {" "}
          <div className="mobileSidebar__nav">
            <AccountCircleIcon style={{ fontSize: 30 }} />
          </div>
        </NavLink>
      </div>
      <div>
        <NavLink activeStyle={{ color: "#c2164f" }} to="/chat">
          <div className="mobileSidebar__nav">
            <MessageRoundedIcon style={{ fontSize: 30 }} />
          </div>
        </NavLink>
      </div>
      <div>
        <NavLink activeStyle={{ color: "#c2164f" }} to="/list">
          <div className="mobileSidebar__nav">
            <ListRoundedIcon style={{ fontSize: 45 }} />
          </div>
        </NavLink>
      </div>
      {props.isAuth ? (
        <div>
          <NavLink to="/profile">
            <div className="mobileSidebar__nav">
              <AssignmentIndRoundedIcon style={{ fontSize: 30 }} />
            </div>
          </NavLink>
        </div>
      ) : (
        <div>
          <NavLink to="/signup">
            <div className="mobileSidebar__nav">
              <AssignmentIndRoundedIcon style={{ fontSize: 30 }} />
            </div>
          </NavLink>
        </div>
      )}

      {props.isAuth ? (
        <div>
          <NavLink to="/">
            <div className="mobileSidebar__nav">
              <Fab
                size="small"
                color="secondary"
                aria-label="add"
                className={classes.margin}
              >
                <AddIcon />
              </Fab>
            </div>
          </NavLink>
        </div>
      ) : (
        <div className="mobileSidebar__nav">
          <Fab size="small" color="secondary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      )}
    </div>
  );
};

export default MobileSidebar;
