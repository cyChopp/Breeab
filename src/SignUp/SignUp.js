import {
  Grid,
  TextField,
} from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import React, { useEffect, useRef, useState } from "react";
import {  useForm } from "react-hook-form";
import {  NavLink, useHistory } from "react-router-dom";
import FeedWrapper from "../Feed/FeedWrapper";
import StickyTop from "../StinckyTop/StickyTop";
import "./SignUp.css";
import { userAPI } from "../api/restAPI";
import db from "../firebase";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#c2164f",
    },
  },
});

const SignUp = (props) => {


  const [auth, setAuth] = useState(props.isAuth);

  const { register, handleSubmit, errors, watch } = useForm();

  const password = useRef({});

  password.current = watch("password", "");

  const history = useHistory();


  const handleSignUp = (data) => {
    console.log(data,'info data')
     props.signUpThunk(data,history);



  };

  useEffect(() => {
    setAuth(props.isAuth);
    if(props.isAuth){
     history.push('/profile')
    }

  }, [props.isAuth]);
  // user Exists?

  return (
    <FeedWrapper>
      <StickyTop header={"Sign Up"} />

      <div className="container__wrapper ">
        <div className="container">
          <ThemeProvider theme={theme}>
            <h1>Logged In: {auth ? "Yes" : "No"}</h1>
            <form onSubmit={handleSubmit(handleSignUp)}>
              <TextField
                inputRef={register({
                  required: "You must specify email.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              {errors.email && <p>{errors.email.message}</p>}

              <TextField
                inputRef={register({
                  required: "You must specify a password.",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters",
                  },
                })}
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
              />
              {errors.password && <p>{errors.password.message}</p>}

              <TextField
                inputRef={register({
                  validate: (value) =>
                    value === password.current || "The passwords do not match.",
                })}
                variant="outlined"
                margin="normal"
                fullWidth
                name="password_repeat"
                label="Password Confirmation"
                type="password"
              />
              {errors.password_repeat && (
                <div className="singUp__passwordValidation">
                  <p>{errors.password_repeat.message}</p>
                </div>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
              <Grid container className="signUp__helpLinks">
                <Grid item xs>
                  Forgot password?
                </Grid>
                <Grid item>
                  <NavLink to="/signin">
                    Already have an account?
                    <span className="signup__signInLink"> Sign in</span>
                  </NavLink>
                </Grid>
              </Grid>
            </form>
          </ThemeProvider>
        </div>
      </div>
    </FeedWrapper>
  );
};

export default SignUp;
