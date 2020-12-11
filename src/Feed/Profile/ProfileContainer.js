import { Redirect, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import FeedWrapper from "../FeedWrapper";
import StickyTop from "../../StinckyTop/StickyTop";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";

import "./ProfileContainer.css";
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  createMuiTheme,
  IconButton,
  makeStyles,
  TextField,
  ThemeProvider,
  Tooltip,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import { setUserEmail, setCurrentUserId } from "../../redux/authentication";
import {
  setUserName,
  setFullName,
  setUserInfoThunk,
} from "../../redux/profile-reducer";
import { setIsFetching } from "../../redux/home-reducer";

import db from "../../firebase";
import { KeyboardReturn } from "@material-ui/icons";
import { userAPI } from "../../api/restAPI";
import { compose } from "redux";
import { PrivateRouteHoc } from "../../hoc/PrivateRouteHoc";
import ProfileInfoHoc from "../../hoc/ProfileInfoHoc";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
}));

const ProfileContainer = (props) => {
  const [postImage, setPostImage] = useState(props.image);
  const [status, setStatus] = useState(props.status);
  const [fullname, setFullName] = useState(props.fullname);
  const [location, setLocation] = useState(props.location);
  const [username, setUsername] = useState(props.username);

  const [isFetching, setIsFetching] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  let history = useHistory();

  const handleDate = (date) => {
    alert(date);
  };

  const theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#c2164f",
      },
    },
  });

  const imageInput = async (e) => {
    setIsFetching(true);

    // uploads the file to storage and gives the url of it to setPostImage
    const file = e.target.files[0];

    const storageRef = db.storage().ref();

    const fileRef = storageRef.child(file.name);

    await fileRef.put(file);

    fileRef.getDownloadURL().then((url) => {
      setPostImage(url);
      console.log("uloaded");
      setIsFetching(false);
    });
  };

  const handleEditProfile = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  // const handleLogOut = async () => {
  //   console.log("Logged out!");

  //   props.setCurrentUserId("");
  //   props.setFullName("");
  //   props.setUserName("");
  //   props.setUserEmail("");

  //   await userAPI.signOut();

  //   history.push("/signup");
  // };

  //--------- SAVE INFO ---------
  const onSubmit = (data) => {
    console.log(postImage,"IMAGE:::::")
    props.setUserInfoThunk(
      data.fullname,
      data.username,
      data.status,
      data.location,
      postImage,
      props.currentUserId
    );
    setIsDisabled(!isDisabled);
  };

  const handleEdit = () => {
    setIsDisabled(!isDisabled);
  };

  //---------  HOOKS ---------
  useEffect(() => {
    setFullName(props.fullName);
    setStatus(props.status);
    setLocation(props.location);
    setUsername(props.username);
    setPostImage(props.image)

  }, [
    props.fullname,
    props.status,
    props.location,
    props.date,
    props.username,
    props.image
  ]);

  const { register, handleSubmit, errors, control } = useForm();

  const classes = useStyles();

  return (
   
    <FeedWrapper>
      <StickyTop header={"Profile"} />
      {/* <Tooltip title="Logout" placement="top">
        <IconButton onClick={handleLogOut}>
          <KeyboardReturn color="secondary" />
        </IconButton>
      </Tooltip> */}
    <div className={!isDisabled ? "profile__Enabled" : "profile__Disabled"}>
      <div className="profile__UploadWrapper">
      <div className="profile__Wrapper">
        <div className="profile__Picture">
          <div className={classes.root}>
            <Avatar src={postImage} className={classes.large} />
          </div>
        </div>

        <div className="upload__ProfileButtons">
          <div >
            <input
              id="imageInput"
              type="file"
              hidden="hidden"
              onChange={imageInput}
            />
            <IconButton onClick={handleEditProfile} disabled={isDisabled}>
              <EditIcon color="secondary" />
            </IconButton>
          </div>
          <div >
          {isFetching && (
            <div >
              <CircularProgress color="secondary" size={20} />
            </div>
          )}
          </div>
        </div>
        </div>
      </div>

      <ThemeProvider theme={theme}>
        {true ? (
          <div className="container">
            <Container className="form__Wrapper" maxWidth="xs">
              <form onSubmit={handleSubmit(onSubmit)} className="dialog__Input">
                <TextField
                  inputRef={register}
                  defaultValue={username}
                  required
                  autoFocus
                  fullWidth
                  disabled={isDisabled}
                  variant="outlined"
                  margin="normal"
                  id="username"
                  label="Username"
                  name="username"
                />
                <TextField
                  inputRef={register}
                  defaultValue={fullname}
                  required
                  fullWidth
                  disabled={isDisabled}
                  variant="outlined"
                  margin="normal"
                  id="fullname"
                  label="Full name"
                  name="fullname"
                />
                <TextField
                  inputRef={register}
                  defaultValue={status}
                  autoFocus
                  fullWidth
                  disabled={isDisabled}
                  variant="outlined"
                  margin="normal"
                  id="status"
                  label="Status"
                  name="status"
                />
                <TextField
                  inputRef={register}
                  defaultValue={location}
                  fullWidth
                  disabled={isDisabled}
                  variant="outlined"
                  margin="normal"
                  name="location"
                  label="Location"
                  id="location"
                />
                {/* <TextField
                  inputRef={register}
                  defaultValue={date}
                  fullWidth
                  disabled={isDisabled}
                  variant="outlined"
                  margin="normal"
                  name="age"
                  label="Date of birth."
                  id="age"
                /> */}
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container>
                    <KeyboardDatePicker
                        inputRef={register}
                        defaultValue={date}
                        label="Date of birth"
                        name="date"
                        fullWidth
                        disabled={isDisabled}
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-dialog"
                        InputProps={{ className: "dialog__Input" }}
                       /> 
                  </Grid>
                </MuiPickersUtilsProvider> */}
                <Button variant="outlined" color="primary" type="submit">
                  Save
                </Button>
                <Button onClick={handleEdit} variant="outlined" color="primary">
                  Edit
                </Button>
              </form>
            </Container>
          </div>
        ) : (
          <CircularProgress color="secondary" size={20} />
        )}
      </ThemeProvider>
      </div>

    </FeedWrapper>
  );
};

const mapStateToProps = (state) => ({
  status: state.profile.status,
  username: state.profile.username,
  fullname: state.profile.fullname,
  location: state.profile.location,
  date: state.profile.date,
  image:state.profile.image,
  currentUserId: state.auth.currentUserId,
});

export default compose(
  PrivateRouteHoc,
  ProfileInfoHoc,
  connect(mapStateToProps, {
    setIsFetching,

    setUserInfoThunk,
  })
)(ProfileContainer);
