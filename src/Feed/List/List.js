import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import FeedWrapper from "../FeedWrapper";
import StickyTop from "../../StinckyTop/StickyTop";
import { compose } from "redux";
import { PrivateRouteHoc } from "../../hoc/PrivateRouteHoc";
import db from "../../firebase";
import { postGet } from "../../api/restAPI";

const List = () => {

  const [posts, setPosts] = useState([]);

  // db.firestore()
  //       .collection("posts")
  //       .doc()
  //       .onSnapshot((snapshot) => {
  //         setPosts(snapshot.docs.map((doc)=>({...doc.data()})))
  //       });


  useEffect(() => {

    postGet()
    
  }, []);


  return( 
    <div>
    <FeedWrapper>
    <StickyTop header={"List"}/>
  </FeedWrapper>
  {posts[0]}{"posts"}

  </div>
  )
};

export default compose(PrivateRouteHoc)(List);
