import React, { useEffect, useState, useRef } from "react";
import FeedWrapper from "../FeedWrapper";
import StickyTop from "../../StinckyTop/StickyTop";
import { compose } from "redux";
import { PrivateRouteHoc } from "../../hoc/PrivateRouteHoc";

import { connect } from "react-redux";

import "./Messages.css";
import {
  Button,
  FormControl,
  Input,
  makeStyles,
  TextField,
  withStyles,
} from "@material-ui/core";
import Message from "./Message/Message";

import db from "../../firebase";
import firebase from "firebase";
import ProfileInfoHoc from "../../hoc/ProfileInfoHoc";
import { useForm } from "react-hook-form";

const TextFieldCustomized = withStyles({
  root: {
    "& .MuiInputBase-input": {
      height: "3em",
      fontSize: "18px",
    },
  },
})(TextField);

const useStyles = makeStyles({
  button: {
    borderRadius: 0,
    height: "4.8em",
    // padding: '0 30px',
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  textfield: {
    height: 2,
  },
});

const Messages = (props) => {
  const [messages, setMessages] = useState([]);

  const { register, handleSubmit } = useForm();

  const classes = useStyles();

  const dummy = useRef();

  useEffect(() => {
    db.firestore()
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            message: doc.data(),
            image: doc.data().image,
          }))
        );
      });
  }, []);

  const sendMessage = (data, e) => {
    e.preventDefault();
    if (data.input !== "") {
      db.firestore().collection("messages").add({
        message: data.input,
        image: props.image,
        name: props.fullname,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
    e.target.reset();
  };

  return (
    <FeedWrapper
      className="messages__feedWrapper feedMobile"
      mobile={props.mobile}
    >
      <StickyTop header={"Chat"}  mobile={props.mobile}/>
      <div className="messages__wrapper">
        <div className={props.mobile ? "messages__chatMobile" : "messages__chat"}>
          {messages.map(({ id, message, image }) => (
            <Message
              key={id}
              message={message}
              fullname={props.fullname}
              image={image}
              dummy={dummy}
            />
          ))}
          <div ref={dummy}> </div>
        </div>
        <div
          className={props.mobile ? "messages__formMobile" : "messages__form"}
        >
          <form
            onSubmit={handleSubmit(sendMessage)}
            className="messages__formPosition"
          >
            <FormControl fullWidth className="messages__formControl">
              <TextFieldCustomized
                inputRef={register}
                name="input"
                type="text"
                className="messages__input"
                color="secondary"
                autoFocus
                defaultValue=""
              />
              <Button
                classes={{ root: classes.button }}
                className="messages__button"
                variant="contained"
                color="secondary"
                type="submit"
              >
                Send message
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
    </FeedWrapper>
  );
};

export default compose(PrivateRouteHoc, ProfileInfoHoc)(Messages);
