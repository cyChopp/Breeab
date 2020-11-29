import { Link } from "react-router-dom";
import React from "react";
import FeedWrapper from "../FeedWrapper";
import StickyTop from "../../StinckyTop/StickyTop";

const List = () => {
  return( 
    <FeedWrapper>
    <StickyTop header={"List"}/>
  </FeedWrapper>
  )
};

export default List;
