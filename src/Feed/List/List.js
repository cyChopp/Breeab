import React, { useEffect, useState } from "react";
import FeedWrapper from "../FeedWrapper";
import StickyTop from "../../StinckyTop/StickyTop";
import { compose } from "redux";
import { PrivateRouteHoc } from "../../hoc/PrivateRouteHoc";
import { setPostsListThunk } from "../../redux/list-reducer";
import { connect } from "react-redux";
import ListInfoHoc from "../../hoc/ListInfoHoc";
import ListPost from "./ListPost";

const List = (props) => {
  const [postsList, setPostsList] = useState(props.postsList);

  useEffect(() => {
    setPostsList(props.postsList);
  }, [props.postsList]);

  return (
    <>
      <FeedWrapper>
        <StickyTop header={"List"} />

        {postsList.map((post) => (
          <ListPost key={post.id} post={post} />
        ))}
      </FeedWrapper>
    </>
  );
};
const mapStateToProps = (state) => ({
  currentUserId: state.auth.currentUserId,
  postsList: state.list.postsList,
});
export default compose(
  ListInfoHoc,
  PrivateRouteHoc,
  connect(mapStateToProps, { setPostsListThunk })
)(List);
