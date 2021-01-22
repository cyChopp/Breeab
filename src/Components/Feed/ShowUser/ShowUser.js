import React from "react";
import FeedWrapper from "../FeedWrapper";
import StickyTop from "../../../Components/StinckyTop/StickyTop";

import {
  Avatar,
  Box,
  Container,
  createMuiTheme,
  makeStyles,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import { connect } from "react-redux";
import { signOutThunk, setIsAuth } from "../../../redux/authentication";
import {
  setUserInfoThunk,
  withSignOutThunk,
} from "../../../redux/profile-reducer";
import { setIsFetching } from "../../../redux/home-reducer";

import { compose } from "redux";
import { PrivateRouteHoc } from "../../../hoc/PrivateRouteHoc";
import ProfileInfoHoc from "../../../hoc/ProfileInfoHoc";

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

const ShowUser = (props) => {
  const classes = useStyles();
console.log(props)
  const theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#c2164f",
      },
    },
  });

  return (
    <FeedWrapper>
      <StickyTop header={"User"} />

      <div className={false ? "profile__Enabled" : "profile__Disabled"}>
        <div className="profile__UploadWrapper">
          <div className="profile__Wrapper">
            <div className="profile__Picture">
              <div className={classes.root}>
                <Avatar
                  src={props.showUserInfo.profile}
                  className={classes.large}
                />
              </div>
            </div>
          </div>
        </div>

        <ThemeProvider theme={theme}>
          <div className="container">
            <Container className="form__Wrapper" maxWidth="xm">
              <TextField
                defaultValue={props.showUserInfo.status}
                fullWidth
                disabled
                variant="outlined"
                label="Status"
                type="textarea"
                margin="normal"
                display="inline"
              />
              <TextField
                defaultValue={props.showUserInfo.username}
                fullWidth
                disabled
                variant="outlined"
                label="Username"
                margin="normal"
                display="inline"
              />
              <TextField
                defaultValue= {props.showUserInfo.fullname}
                fullWidth
                disabled
                variant="outlined"
                label="Full name"
                margin="normal"
                display="inline"
              />

            </Container>
          </div>
        </ThemeProvider>
      </div>
    </FeedWrapper>
  );
};

const mapStateToProps = (state) => ({
  showUserInfo: state.showUser.showUserInfo,
});

export default connect(mapStateToProps)(ShowUser);
