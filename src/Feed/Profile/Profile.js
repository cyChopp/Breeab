import { Link } from "react-router-dom";
import React from "react";
import FeedWrapper from "../FeedWrapper";
import StickyTop from "../../StinckyTop/StickyTop";

const Profile = () => {
  return( 
    <FeedWrapper>
      <StickyTop header={"Profile"}/>
  </FeedWrapper>
  )
};

export default Profile;
