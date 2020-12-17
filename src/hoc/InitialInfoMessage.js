import React, { useEffect } from "react";
import { connect } from "react-redux";
import db from "../firebase";
import {getCurrentUserPictureThunk} from "../redux/chat-reducer"

const mapStateToProps =(state)=>({
    currentUserId:state.auth.currentUserId
})


const InitialInfoMessage = (Component) => {


  const NewComponent = (props) => {

    useEffect(() => {
      props.getCurrentUserPictureThunk(props.currentUserId)
    }, []);

    return <Component {...props} />;
  };

  return connect(mapStateToProps,{getCurrentUserPictureThunk})(NewComponent);
};

export default InitialInfoMessage;
