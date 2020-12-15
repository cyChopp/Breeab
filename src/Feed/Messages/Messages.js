import React, {useRef, useState } from "react";
import moment from "moment";

import FeedWrapper from "../FeedWrapper";
import StickyTop from "../../StinckyTop/StickyTop";
import { compose } from "redux";
import { PrivateRouteHoc } from "../../hoc/PrivateRouteHoc";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { connect } from "react-redux";


import "./Messages.css";

import db from "../../firebase";



const auth = db.auth();
const firestore = db.firestore();



const Messages = (props) => {
  const [user] = useAuthState(auth);
  return (
    <FeedWrapper>
      <StickyTop header={"Message"} />
      <section>
        <Chatroom />
      </section>
    </FeedWrapper>
  );
};

function Chatroom(props) {

  const dummy = useRef();

  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(50);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");
  const [time, setTime] = useState(
    moment(Date().toLocaleString()).format("Do hh:mm:ss YYYY")
  );

  const sendMessage =async (e)=>{

      e.preventDefault();

      const {uid} = auth.currentUser;

      await messagesRef.add({
        text:formValue,
        createdAt:time,
        uid,
        photoURL:"https://firebasestorage.googleapis.com/v0/b/breeab-3218f.appspot.com/o/bb1662b7c5f22a0f905fd59e718ca05e.jpg?alt=media&token=5aef1327-c124-4c99-a49c-5e34c94c6875"
      })
      setFormValue("");
      dummy.current.scrollIntoView({ behavior: 'smooth' });

  }

  return (
    <>
      <div>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
          <div ref={dummy}></div>
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">Sent</button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={"https://firebasestorage.googleapis.com/v0/b/breeab-3218f.appspot.com/o/bb1662b7c5f22a0f905fd59e718ca05e.jpg?alt=media&token=5aef1327-c124-4c99-a49c-5e34c94c6875"} />
      {text}
    </div>
  );
}

export default compose(PrivateRouteHoc)(Messages);
