import { Avatar, Button } from "@material-ui/core";
import React, { useState } from "react";
import db from "./firebase";
import "./PostContainer.css";

function PostContainer() {
  const [postMessage, setPostMessage] = useState("");
  // const [postImage , setPostImage] = useState('');

  const addPost = (e) => {
    e.preventDefault();

    debugger;
    db.collection("posts").add({
      displayName: "Alex Louttchenko",
      userName: "loottch",
      verified: true,
      text: postMessage,
      image: "",
      avatar:
        "https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png",
    });

    setPostMessage("");
  };
  return (
    <div className="post">
      <form>
        <div className="post--input">
          <Avatar className="profile" />
          <textarea
            value={postMessage}
            placeholder="Write your post!"
            type="text"
            onChange={(e) => setPostMessage(e.target.value)}
          />
        </div>
        {/* <input placeholder="Enter image URL" className="imageInput" type="text" /> */}
        <span className="input-buttons">
          <Button  className="post--Upload" >Upload</Button>
          <Button  type="submit" className="post--button" onClick={addPost}>Post</Button>
        </span>
      </form>
    </div>
  );
}

export default PostContainer;
