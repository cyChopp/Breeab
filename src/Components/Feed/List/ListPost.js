import { Avatar, makeStyles } from "@material-ui/core";
import VerifiedUserRoundedIcon from "@material-ui/icons/VerifiedUserRounded";
import TextsmsRoundedIcon from "@material-ui/icons/TextsmsRounded";
import FavoriteIcon from "@material-ui/icons/Favorite";
import RepeatRoundedIcon from "@material-ui/icons/RepeatRounded";

import React from "react";
import "./ListPost.css";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  const seeProfile = () => {
    props.setShowUserInfo(props.post);
    history.push(`user/${props.post.username}`);
  };

  const classes = useStyles();
  return (
    <div className="listPost__feed">
      <div className={classes.root}>
        <div className="ListPost__avatar" onClick={seeProfile}>
          <Avatar src={props.post.profile} className={classes.large} />
        </div>  
      </div>
      <div className="listPost__body">
        <div className="listPost__header">
          <div className="listPost__textHeader">
            <h3 className="user__Infowrapper">
              <span className="listPost__userName">{props.post.fullname} </span>

              <span className="listPost__verified">
                {"  "}
                <VerifiedUserRoundedIcon className="listPost__budge" />
                {!props.mobile && (
                  <span>
                    {"  @"}
                    {props.post.username}
                  </span>
                )}
              </span>
            </h3>
          </div>

          <span className="post__time">{props.post.time}</span>

          <div className="listPost__description">
            <p>{props.post.text}</p>
          </div>
        </div>

        <img src={props.post.image} />

        <div className="listPost__footer">
          <FavoriteIcon fontSize="small" />
          <TextsmsRoundedIcon />
          <RepeatRoundedIcon />
        </div>
      </div>
    </div>
  );
};

export default ListPost;
