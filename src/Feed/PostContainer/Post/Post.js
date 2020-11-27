import { Avatar } from "@material-ui/core";
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

const Post = forwardRef(({ post }, ref) => {
  const [text, setText] = useState(post.text);

  const onDelete = () => {
    db.firestore().collection("posts").doc(post.id).delete();
  };

  return (
    <div className="feed--post" ref={ref}>
      <div className="post--avatar">
        <Avatar src={post.avatar} />
      </div>
      <div className="post--body">
        <div className="post--header">
          <div className="post--textHeader">
            <h3 className="user__Infowrapper">
              <span className="post--userName">
                {post.displayName}
                {"  "}
              </span>
              <span className="post-verified">
                {post.verified && (
                  <VerifiedUserRoundedIcon className="post--budge" />
                )}
                <span>
                  {"  "} @{post.userName}
                </span>
              </span>
            </h3>
            <div className="auxiliary__ButtonsWrapper">
            <span className="edit__PostWrapper">
              {/* onClick={onUpdate} */}
              <EditButton postText={post.text} post={post} />
            </span>
            <span className="delete__PostWrapper">
              <DeleteIcon onClick={onDelete} />
            </span>
            </div>
          </div>
          <span className="post__time">{post.time}</span>


          <div className="post--description">
            <p>{post.text}</p>
            {/* <input value={text} onChange={e=>{setText(e.target.value)}}/> */}
          </div>
        </div>

        <img src={post.image} />

        <div className="post--footer">
          <FavoriteIcon fontSize="small" />
          <TextsmsRoundedIcon />
          <RepeatRoundedIcon />
        </div>
      </div>
    </div>
  );
});

export default Post;
