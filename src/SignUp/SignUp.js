import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FeedWrapper from "../Feed/FeedWrapper";
import db from "../firebase";
import StickyTop from "../StinckyTop/StickyTop";
import "./SignUp.css";

const SignUp = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [pending,setPending] = useState(true)

  const clearInputs = ()=>{
    setEmail('');
    setPassword('');
  }

  const clearErrors = ()=>{
    setEmailError('');
    setPasswordError('');
  }

  const { register, handleSubmit, errors, control } = useForm();


  const handleSignIn = (data) => {
   
    debugger;
    clearErrors();
    console.log(data);
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
              return console.log('other case error')
        }
      });
      setEmail(data.email);
      setPassword(data.password)
  };
  const handleSignUp = (data) => {
    debugger;

    clearErrors()
    console.log(data);
    db.auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .catch((errors) => {
        switch (errors.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(errors.message);
            break;
          case "auth/weak-password":
            setPasswordError(errors.message);
            break;

            default:
              return console.log('other case error')
        
        }
      });

    setEmail(data.email);
    setPassword(data.password)
  };

  const handleLogOut = () => {
    db.auth().signOut();
  };

// user Exists?
  const authListener = ()=>{
    db.auth().onAuthStateChanged(user=>{
      if(user){
        clearInputs();
        setUser(user)
        setPending(false)
      }else{
        setUser('')
      }
    })
  }


  useEffect(()=>{
    authListener()
    console.log(user)
  },[])

  // if(pending){
  //   return <>Loading...</>
  // }


  return (
    <FeedWrapper>
      <StickyTop header={"Sign Up"} />
      
      <div className="container__wrapper ">
      {pending ? (<>Loading...</>) :
        <div className="container">
        {user ? (<div onClick={handleLogOut}>Log Out</div>) :(
          <form onSubmit={handleSubmit(hasAccount ? (handleSignIn) : (handleSignUp) )}>
            <Controller
              name="email"
              ref={register}
              render={(props) => (
                <TextField
                  color="secondary"
                  required
                  {...props}
                  label="email"
                  InputLabelProps={{ shrink: true }}
                />
              )}
              control={control}
              defaultValue=""
            />
            <p>{emailError}</p>
            <Controller
              name="password"
              ref={register}
              render={(props) => (
                <TextField
                  color="secondary"
                  {...props}
                  required
                  label="password"
                  InputLabelProps={{ shrink: true }}
                />
              )}
              control={control}
              defaultValue=""
            />
            <p>{passwordError}</p>
            <Controller
              name="passwordConfirmation"
              ref={register}
              render={(props) => (
                <TextField
                  color="secondary"
                  {...props}
                  label="Confirm password"
                  InputLabelProps={{ shrink: true }}
                />
              )}
              control={control}
              defaultValue=""
            />
            <Controller
              name="username"
              ref={register}
              render={(props) => (
                <TextField
                  color="secondary"
                  required
                  {...props}
                  label="username"
                  InputLabelProps={{ shrink: true }}
                />
              )}
              control={control}
              defaultValue=""
            />
                  {hasAccount ?(
                      <>
                        <Button type="submit" color="secondary">Sign In</Button>
                        <p>Don't have an account? <span onClick={()=>setHasAccount(!hasAccount)}>Sign Up</span></p>
                      </>
                  ):(
                    <>
                        <Button type="submit" color="secondary">Sign Up</Button>
                        <p>Have already an account? <span onClick={()=>setHasAccount(!hasAccount)}>Sign in</span> </p>
                      </>
                  )}
            {/* <Button type="submit" color="secondary">
              {hasAccount ? 'Sign In' : 'Sign Up' }
            </Button> */}
          </form>
        )}
        </div>
      }
      </div>
      
    </FeedWrapper>
  );
};

export default SignUp;
