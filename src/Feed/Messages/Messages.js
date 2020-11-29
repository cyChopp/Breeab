import { Link } from "react-router-dom";
import React from "react";
import FeedWrapper from "../FeedWrapper";
import StickyTop from "../../StinckyTop/StickyTop";

const Messages = () => {
  return( 
    <FeedWrapper>
    <StickyTop header={"Message"}/>
  </FeedWrapper>
  )
};

export default Messages;
