import { Avatar, Button, CircularProgress } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { postsAPI } from "../../api/restAPI";
import { setPostText, setPostThunk } from "../../redux/post-reducer";
import db from "../../firebase";
import { setIsFetching } from "../../redux/home-reducer";
import "./PostContainer.css";
import PostInfoHoc from "../../hoc/PostInfoHoc";
import { compose } from "redux";
import { useHistory } from "react-router-dom";

function PostContainer(props) {
  const [text, setText] = useState(props.postText);
  const [postImage, setPostImage] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const { register, handleSubmit ,control} = useForm();

  const history = useHistory();

  const [time, setTime] = useState(
    moment(Date().toLocaleString()).format("Do hh:mm:ss YYYY")
  );

  // ------------ ADD IMAGE ---------------

  const imageInput = async (e) => {
    setIsFetching(true);

    // uploads the file to storage and gives the url of it to setPostImage
    const file = e.target.files[0];

    const storageRef = db.storage().ref();
    console.log(storageRef, ":storageRef");
    const fileRef = storageRef.child(file.name);
    console.log(fileRef, ":fileRef");

    await fileRef.put(file);

    fileRef.getDownloadURL().then((url) => {
      setPostImage(url);
      console.log("uloaded");
      setIsFetching(false);
    });
  };

  // ------------ ADD POST ---------------
  const addPost = (data) => {
    if (postImage !== "" || postMessage !== "") {
      // e.preventDefault();

      setTime(moment(Date().toLocaleString()).format("Do hh:mm:ss a YYYY"));

      props.setPostThunk(
        props.fullname,
        props.username,
        data.time,
        data.text,
        data.postImage,
        props.currentUserId
      );

      setText("");
      setPostImage("");
    } else {
      alert("Your post should contain text or image!");
    }
  };

  useEffect(() => {
    setText(props.postText);
  }, [props.postText]);

  return (
    <div className="post">
      <form onSubmit={handleSubmit(addPost)()}>
        <div className="post--input">
          <Avatar className="profile" />
          <Controller
            as={<input />}
            name="text"
            control={control}
            defaultValue={text}
            placeholder="Write your post!"
          />
          {/* <input
            ref={register}
            name="text"
            value={text}
            placeholder="Write your post!"
            type="text"
          /> */}
        </div>

        <div className="input-buttons">
          {isFetching && (
            <div className="preloader__Wrapper">
              <CircularProgress color="secondary" size={20} />
            </div>
          )}

          <div className="file__uploadWrapper">
            <span>
              {/* <label  className="custom__FileUpload"> */}
              <label htmlFor="file-upload" className="custom__FileUpload">
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
  postText: state.post.postText,
  currentUserId: state.auth.currentUserId,
  fullname: state.profile.fullname,
  username: state.profile.username,
});

export default compose(
  PostInfoHoc,
  connect(mapStateToProps, { setPostText, setPostThunk })
)(PostContainer);
