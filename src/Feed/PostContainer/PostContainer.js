import { Avatar, Button } from "@material-ui/core";
import moment from "moment";
import React, { useState } from "react";
import db from "../../firebase";
import "./PostContainer.css";

function PostContainer() {
  const [postMessage, setPostMessage] = useState("");
  const [postImage, setPostImage] = useState("");

  const [time, setTime] = useState(
    moment(Date().toLocaleString()).format("h:mm:ss a,Do YYYY")
  );

  const imageInput = async (e) => {
    // uploads the file to storage and gives the url of it to setPostImage
    const file = e.target.files[0];
    const storageRef = db.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setPostImage(await fileRef.getDownloadURL());
  };

  const addPost = (e) => {
    e.preventDefault();
    setTime(moment(Date().toLocaleString()).format("h:mm:ss a,  Do YYYY"));

    db.firestore().collection("posts").add({
      displayName: "Alex Louttchenko",
      userName: "loottch",
      time: time,
      verified: true,
      text: postMessage,
      image: postImage,
      avatar: "https://i.redd.it/8mtr9ctkz9rx.jpg",
    });

    setPostMessage("");
    setPostImage("");
  };
  return (
    <div className="post">
      <form onSubmit={addPost}>
        <div className="post--input">
          <Avatar className="profile" />
          <textarea
            value={postMessage}
            placeholder="Write your post!"
            type="text"
            onChange={(e) => setPostMessage(e.target.value)}
          />
        </div>
        <div className="input-buttons">
          <span className="file__uploadWrapper">
            <label for="file-upload" class="custom-file-upload">
              Upload file
            </label>
          </span>
          <input id="file-upload" type="file" onChange={imageInput} />
          <Button type="submit" className="post--button">
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostContainer;
