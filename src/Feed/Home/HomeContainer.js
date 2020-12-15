import React, { useEffect, useState } from "react";
import "./HomeContainer.css";
import Post from "../PostContainer/Post/Post";
import PostContainer from "../PostContainer/PostContainer";
import { Link } from "react-router-dom";
import StickyTop from "../../StinckyTop/StickyTop";
import FeedWrapper from "../FeedWrapper";
import db from "../../firebase";
import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { PrivateRouteHoc } from "../../hoc/PrivateRouteHoc";

const HomeContainer = (props) => {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState("");

  useEffect(() => {
    db.firestore()
      .collection("posts")
      .doc(props.currentUserId)
      .collection("userPosts")
      .orderBy("time", "desc")
      .onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
  }, []);

  return (
    <>
      {true && (
        <FeedWrapper>
          <StickyTop header={"Home"} />

          <PostContainer />

          {posts.map((post) => (
            <Post
              post={post}
            />
          ))}
        </FeedWrapper>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  fullname: state.profile.fullname,
  username: state.profile.username,
  userAuthInfo: state.auth.userAuthInfo,
  currentUserId: state.auth.currentUserId,
});

export default compose(
  PrivateRouteHoc,
  connect(mapStateToProps)
)(HomeContainer);
