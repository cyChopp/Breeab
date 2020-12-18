import {
  Grid,
  TextField,
} from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import React, { useEffect, useState } from "react";
import {  useForm } from "react-hook-form";
import {  NavLink, useHistory } from "react-router-dom";
import FeedWrapper from "../Feed/FeedWrapper";
import db from "../firebase";
import StickyTop from "../StinckyTop/StickyTop";
import "./SignIn.css";
import { authAPI, signUp, userAPI } from "../api/restAPI";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#c2164f",
    },
  },
});

const SignIn = (props) => {
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);
  const [passwordConfirm, setPasswordConfirm] = useState(props.passwordConfirm);
  const [auth, setAuth] = useState(props.isAuth);

  const { register, handleSubmit, control } = useForm();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const history = useHistory();

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
  };

  const clearErrors = () => {
    // setEmailError("");
    // setPasswordError("");
  };

  const handleSignIn = (data) => {
    clearErrors();

    db.auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .catch((errors) => {
        switch (errors.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(errors.message);
            break;
          case "auth/wrong-password":
            setPasswordError(errors.message);
            break;

          default:
            return console.log("other case error");
        }
      });
    clearInputs();
  };


  const logOut = () => {
    props.signOutThunk();

    console.log("logged out");
  };

  useEffect(() => {
    setEmail(props.email);
    setPassword(props.password);
    setPasswordConfirm(props.passwordConfirmation);
    setAuth(props.isAuth);
  }, [props.email, props.password, props.passwordConfirmation, props.isAuth]);
  // user Exists?

  return (
    <FeedWrapper>
      <StickyTop header={"Sign Up"} />

      <div className="container__wrapper ">
        <div className="container">
          <ThemeProvider theme={theme}>
            <h1>Logged In: {auth ? "Yes" : "No"}</h1>
            <form onSubmit={handleSubmit(handleSignIn)}>
              {/* onSubmit={handleSubmit(
              hasAccount ? handleSignIn : handleSignUp
             )} */}
              <TextField
                inputRef={register}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                defaultValue={email}
              />
              <TextField
                inputRef={register}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                defaultValue={password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
              <Grid container className="signUp__helpLinks">
                <Grid item xs>
                  {/* <Link href="#" variant="body2"> */}
                  Forgot password?
                  {/* </Link> */}
                </Grid>
                <Grid item >
                  <NavLink to="/signup">
                    Don't have an account? <span className="signup__signInLink">  Sign Up</span>
                  </NavLink>

                </Grid>
              </Grid>
            </form>
          </ThemeProvider>
        </div>
      </div>
      <Button onClick={logOut}>Log out</Button>
    </FeedWrapper>
  );
};

export default SignIn;
