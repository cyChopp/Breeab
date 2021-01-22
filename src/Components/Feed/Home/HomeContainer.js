import React, { useEffect, useState } from "react";
import "./HomeContainer.css";
import Post from "../PostContainer/Post/Post";
import PostContainer from "../PostContainer/PostContainer";
import StickyTop from "../../../Components/StinckyTop/StickyTop";
import FeedWrapper from "../FeedWrapper";
import db from "../../../firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { PrivateRouteHoc } from "../../../hoc/PrivateRouteHoc";

const HomeContainer = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.firestore()
      .collection("posts")
      .doc(props.currentUserId)
      .collection("userPosts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
  }, []);

  return (
    <>
      {true && (
        <FeedWrapper mobile={props.mobile}>
          <StickyTop header={"Home"} mobile={props.mobile} />

          <PostContainer mobile={props.mobile} />

          {posts.map((post) => (
            <Post key={post.id} post={post} mobile={props.mobile} />
          ))}
        </FeedWrapper>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUserId: state.auth.currentUserId,
});

export default compose(
  PrivateRouteHoc,
  connect(mapStateToProps)
)(HomeContainer);
