import React, { useEffect, useState } from "react";
import FeedWrapper from "../FeedWrapper";
import StickyTop from "../../StinckyTop/StickyTop";
import { compose } from "redux";
import { PrivateRouteHoc } from "../../hoc/PrivateRouteHoc";
import { setPostsListThunk } from "../../redux/list-reducer";
import { connect } from "react-redux";
import ListInfoHoc from "../../hoc/ListInfoHoc";
import ListPost from "./ListPost";
import {setShowUserInfo} from '../../redux/showUser-reducer';

const List = (props) => {
  const [postsList, setPostsList] = useState(props.postsList);

  useEffect(() => {
    setPostsList(props.postsList);
  }, [props.postsList]);

  return (
    <>
      <FeedWrapper>
        <StickyTop header={"List"} mobile={props.mobile}/>

        {postsList.map((post) => (
          <ListPost key={post.id} post={post} setShowUserInfo={props.setShowUserInfo} mobile={props.mobile}/>
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
  PrivateRouteHoc,
  ListInfoHoc,
  connect(mapStateToProps, { setPostsListThunk,setShowUserInfo})
)(List);
