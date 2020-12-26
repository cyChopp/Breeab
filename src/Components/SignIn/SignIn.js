import { Grid, TextField } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import FeedWrapper from "../Feed/FeedWrapper";
import StickyTop from "../StinckyTop/StickyTop";
import "./SignIn.css";
import db from "../../firebase";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#c2164f",
    },
  },
});

const SignIn = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const history = useHistory();

  const handleSignIn = (data) => {
    return db
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        history.replace("/profile");
      }).catch((errors) => {
        switch (errors.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            alert(errors.message);
            break;
          case "auth/wrong-password":
            alert(errors.message);
            break;

          default:
            return alert("other case error");
        }
      });
  };

  useEffect(() => {
    if (props.isAuth) {
      history.push("/profile");
    }
  }, [props.isAuth]);

  return (
    <FeedWrapper>
      <StickyTop header={"Sign in"} />

      <div className="container__wrapper ">
        <div className="container">
          <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit(handleSignIn)}>
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
                })}
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
              />
              {errors.password && <p>{errors.password.message}</p>}
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
                  Forgot password?
                </Grid>
                <Grid item>
                  <NavLink to="/signup">
                    Don't have an account?{" "}
                    <span className="signup__signInLink"> Sign Up</span>
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

export default SignIn;
