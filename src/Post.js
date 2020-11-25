import { Avatar } from "@material-ui/core";
import VerifiedUserRoundedIcon from "@material-ui/icons/VerifiedUserRounded";
import TextsmsRoundedIcon from "@material-ui/icons/TextsmsRounded";
import FavoriteIcon from "@material-ui/icons/Favorite";
import RepeatRoundedIcon from "@material-ui/icons/RepeatRounded";
import React , {forwardRef} from "react";
import "./Post.css";

const Post = forwardRef(({ 
    displayName,
    userName,
    verified,
    text, 
    image, 
    avatar 
    },ref) => {
  return (
    <div className="feed--post" ref={ref}>
      <div className="post--avatar">
        <Avatar src={avatar}/>
      </div>

      <div className="post--body">
        <div className="post--header">
          <div className="post--textHeader">
            <h3>
              <span className="post--userName">{displayName}{"  "}</span>
              <span className="post-verified">
               {verified && <VerifiedUserRoundedIcon className="post--budge" />}
                <span>{"  "} @{userName}</span>
              </span>
            </h3>
          </div>

          <div className="post--description">
            <p>
              {text}
            </p>
          </div>
        </div>

        <img src={image} />

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
