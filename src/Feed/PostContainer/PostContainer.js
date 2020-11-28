import { Avatar, Button, CircularProgress } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import db from "../../firebase";
import { setIsFetching } from "../../redux/home-reducer";
import "./PostContainer.css";

function PostContainer(props) {
  const [postMessage, setPostMessage] = useState("");
  const [postImage, setPostImage] = useState("");
  // const [allowPost,setAllowPost] = useState(false);

  const [time, setTime] = useState(
    moment(Date().toLocaleString()).format("h:mm:ss a,Do YYYY")
  );

  const imageInput = async (e) => {
    props.setIsFetching(true);

    // uploads the file to storage and gives the url of it to setPostImage
    const file = e.target.files[0];

    const storageRef = db.storage().ref();

    const fileRef = storageRef.child(file.name);

    await fileRef.put(file);

    fileRef.getDownloadURL().then((url) => {
      setPostImage(url);
      console.log("uloaded");
      props.setIsFetching(false);
    });
  };

  // const imageInput = async (e) => {

  //     // uploads the file to storage and gives the url of it to setPostImage
  //     const file = e.target.files[0];

  //     console.log('file: ',file);
  //     const storageRef = db.storage().ref();
  //     console.log('storage Ref : ',storageRef);

  //     const fileRef = storageRef.child(file.name);

  //     console.log('fileRef : ',fileRef);

  //     await fileRef.put(file);

  //     setPostImage(await fileRef.getDownloadURL());
  //   }

  const addPost = (e) => {
    if (postImage !== "" || postMessage !== "") {
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

    } else {
      e.preventDefault();
      alert("Your post should contain text or image!");
    }
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
          {props.isFetching && (
            <div className="preloader__Wrapper">
              <CircularProgress color="secondary" size={20} />
            </div>
          )}

          <div className="file__uploadWrapper">
            <span>
              <label for="file-upload" class="custom__FileUpload">
                Upload file
              </label>
            </span>
            <input id="file-upload" type="file" onChange={imageInput} />
          </div>

          <div className="post--buttonWrapper">
            <Button type="submit" className="post--button">
              Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
const mapStateToProps = (state) => ({
  isFetching: state.home.isFetching,
});

export default connect(mapStateToProps, { setIsFetching })(PostContainer);
