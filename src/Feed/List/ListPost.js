import { Avatar, makeStyles } from "@material-ui/core";
import VerifiedUserRoundedIcon from "@material-ui/icons/VerifiedUserRounded";
import TextsmsRoundedIcon from "@material-ui/icons/TextsmsRounded";
import FavoriteIcon from "@material-ui/icons/Favorite";
import RepeatRoundedIcon from "@material-ui/icons/RepeatRounded";
// import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";

import React, { forwardRef, useEffect, useState } from "react";
import "./ListPost.css";
// import EditButton from "../../../DeleteButton/EditButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

const ListPost = (props) => {


  const classes = useStyles();
console.log(props.post,"::::")

  return (
    <div className="feed--post" >
      <div className={classes.root}>
        <div className="post--avatar">
          {/* <Avatar src={props.post.profile} className={classes.large} /> */}
          <Avatar src={props.post.profile} className={classes.large} />
        </div>
      </div>
      <div className="post--body">
        <div className="post--header">
          <div className="post--textHeader">
            <h3 className="user__Infowrapper">
              <span className="post--userName">{props.post.fullname} </span>
              <span className="post-verified">
                {"  "}
                <VerifiedUserRoundedIcon className="post--budge" />
                <span>
                  {"  @"}
                  {props.post.username}
                </span>
              </span>
            </h3>
          </div>

          <span className="post__time">{props.post.time}</span>

          <div className="post--description">
            <p>{props.post.text}</p>
          </div>
        </div>

        <img src={props.post.image} />

        <div className="post--footer">
          <FavoriteIcon fontSize="small" />
          <TextsmsRoundedIcon />
          <RepeatRoundedIcon />
        </div>
      </div>
    </div>
  );
};

export default ListPost;
