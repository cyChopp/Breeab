import { Link } from "react-router-dom";
import React from "react";
import FeedWrapper from "../FeedWrapper";
import StickyTop from "../../StinckyTop/StickyTop";
import { compose } from "redux";
import { PrivateRouteHoc } from "../../hoc/PrivateRouteHoc";

const Messages = () => {
  return( 
    <FeedWrapper>
    <StickyTop header={"Message"}/>
  </FeedWrapper>
  )
};

export default compose(PrivateRouteHoc)(Messages);
