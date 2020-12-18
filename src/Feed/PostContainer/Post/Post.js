import { Avatar, makeStyles } from "@material-ui/core";
import VerifiedUserRoundedIcon from "@material-ui/icons/VerifiedUserRounded";
import TextsmsRoundedIcon from "@material-ui/icons/TextsmsRounded";
import FavoriteIcon from "@material-ui/icons/Favorite";
import RepeatRoundedIcon from "@material-ui/icons/RepeatRounded";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import React, { forwardRef, useEffect, useState } from "react";
import "./Post.css";
import db from "../../../firebase";
import EditButton from "../../../DeleteButton/EditButton";
import { connect } from "react-redux";

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

const Post = forwardRef((props, ref) => {
  

  const [text, setText] = useState(props.post.text);
  const [uuid, setUuid] = useState(props.currentUserId); // CHANGEEEEEEEEEEEEE

  const classes = useStyles();

  const onDelete = () => {
    db.auth().onAuthStateChanged((u) => {
    if (u) {
    setUuid(u.uid);
    db.firestore().collection("posts").doc(u.uid).collection('userPosts').doc(props.post.id).delete();
    }
    })
  };

  return (
    <div className="feed--post" ref={ref}>
      <div className={classes.root}>
        <div className="post--avatar">
          {/* <Avatar src={props.post.profile} className={classes.large} /> */}
          <Avatar
            src={
              props.post.profile === props.image
                ? props.post.profile
                : props.image
            }
            className={classes.large}
          />
        </div>
      </div>
      {/* src={post.avatar} */}
      <div className="post--body">

        <div className="post--header">
          <div className="post--textHeader">
            <h3 className="user__Infowrapper">
              <span className="post--userName">
                {props.post.fullname === props.fullname
                  ? props.post.fullname
                  : props.fullname}
                {" "}
              </span>
              <span className="post-verified">
                {"  "}
                <VerifiedUserRoundedIcon className="post--budge" />
                <span>
                  {"  @"}
                  {props.post.username === props.username
                    ? props.post.username
                    : props.username}
                </span>
              </span>
            </h3>

            {/* if the post was created by the user, show  edit and delete button */}
            <div className="auxiliary__ButtonsWrapper">
              <span className="edit__PostWrapper">
                {/* onClick={onUpdate} */}
                <EditButton  post={props.post} currentUserId={uuid} />
              </span>
              <span className="delete__PostWrapper">
                <DeleteIcon onClick={onDelete} />
              </span>
            </div>
          </div>

          <span className="post__time">{props.post.time}</span>

          <div className="post--description">
            <p>{props.post.text}</p>
          </div>
        </div>

        <img src={props.post.image} className="post__image"/>

        <div className="post--footer">
          <FavoriteIcon fontSize="small" id="likeButton" />
          <TextsmsRoundedIcon id="comentButton"/>
          <RepeatRoundedIcon id="shareButton"/>
        </div>
      </div>
    </div>
  );
});

const mapStateToProps = (state) => ({
  image: state.profile.image,
  fullname: state.profile.fullname,
  username: state.profile.username,
  currentUserId: state.auth.currentUserId,

});

export default connect(mapStateToProps)(Post);
