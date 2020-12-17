import React, { useEffect, useState, useRef } from "react";
import FeedWrapper from "../FeedWrapper";
import StickyTop from "../../StinckyTop/StickyTop";
import { compose } from "redux";
import { PrivateRouteHoc } from "../../hoc/PrivateRouteHoc";

import { connect } from "react-redux";

import "./Messages.css";
import { Button, FormControl, Input, makeStyles, TextField, withStyles } from "@material-ui/core";
import Message from "./Message/Message";

import db from "../../firebase";
import firebase from "firebase";


const TextFieldCustomized = withStyles({
  root: {
   
    "& .MuiInputBase-input": {
      height: "3em",
      fontSize:'18px'
    }
    
  },
})(TextField);

const useStyles = makeStyles({
  button: {
    borderRadius: 0,
    height: "4.8em",
    // padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  textfield: {
    height: 2
  },
});

const Messages = (props) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [fullname, setFullName] = useState(props.fullname);

  const classes = useStyles();


  const dummy = useRef();

  useEffect(() => {
    db.firestore()
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    db.firestore().collection("messages").add({
      message: input,
      name: fullname,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    dummy.current.scrollIntoView({ behavior: "smooth" });

    setInput("");

  };

  return (
    <FeedWrapper className="messages__feedWrapper">
      <StickyTop header={"Message"} />
      <div className="messages__chat">
        {/* <div > */}
        {messages.map(({ id, message }) => (
          <Message
            key={id}
            message={message}
            fullname={fullname}
            dummy={dummy}
          />
        ))}
        <div ref={dummy}> </div>

        {/* </div> */}
      </div>

      <div className="messages__form">
        <form className="messages__formPosition">
          <FormControl fullWidth className="messages__formControl">
            <TextFieldCustomized
              type="text"
              className="messages__input"
              color="secondary"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
            classes={{root:classes.button}}
              className="messages__button"
              variant="contained"
              // disabled={!input}
              color="secondary"
              type="submit"
              onClick={sendMessage}
            >
              Send message
            </Button>
          </FormControl>
        </form>
      </div>
    </FeedWrapper>
  );
};

export default compose(PrivateRouteHoc)(Messages);
