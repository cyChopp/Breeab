import {
  Avatar,
  Button,
  CircularProgress,
  createMuiTheme,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
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
import ProfileInfoHoc from "../../hoc/ProfileInfoHoc";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#c2164f",
    },
  },
});

function PostContainer(props) {
  const [postImage, setPostImage] = useState("");
  const [profileImage, setProfileImage] = useState(props.image);
  const [isFetching, setIsFetching] = useState(false);
  const [posting ,setPosting] = useState(false)

  const { register, handleSubmit ,reset} = useForm();

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
  const addPost = (data, e) => {
    e.preventDefault();

    if(postImage === ""){
      console.log("image null")
    }
    
    if(data.postText === ""){
      console.log("post null")
    }


    if (postImage === "" && data.postText === "") {
       alert("Your post should contain text or image!");

      
    } else {
      setPostText(data.postText);
      setPostImage(postImage);
      // e.preventDefault();
      console.log(data, "post data");
      console.log(
        props.fullname,
        ":",
        props.username,
        ":",
        time,
        ":",
        data.postText,
        ":",
        postImage,
        ":",
        props.currentUserId,
        "post data"
      );
      setTime(moment(Date().toLocaleString()).format("Do hh:mm:ss a YYYY"));

      props.setPostThunk(
        props.fullname,
        props.username,
        time,
        data.postText,
        postImage,
        profileImage,
        props.currentUserId
      );
        e.target.reset()
        setPostImage("")

    }
  };

  useEffect(() => {
  }, []);

  return (
    <div className="post">
      <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit(addPost)}>
          <div className="post__input">
            <div className="profile">
              <Avatar src={profileImage} />
            </div>
            <div className="post__TextContainer">
              <TextField
                inputRef={register}
                defaultValue=""
                fullWidth
                variant="outlined"
                margin="normal"
                id="postText"
                label="Post"
                name="postText"
              />
            </div>
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
              <input id="file-upload" type="file" onChange={imageInput} disabled={isFetching && true} />
            </div>

            <div className="post--buttonWrapper">
              <Button type="submit" className="post--button" disabled={isFetching && true}>
                Post
              </Button>
            </div>
          </div>


        </form>
      </ThemeProvider>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUserId: state.auth.currentUserId,
  fullname: state.profile.fullname,
  username: state.profile.username,
  image: state.profile.image,
});

export default compose(
  PostInfoHoc,
  ProfileInfoHoc,
  connect(mapStateToProps, { setPostText, setPostThunk })
)(PostContainer);
