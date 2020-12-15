import {  postsAPI } from "../api/restAPI";

const SET_POST_TEXT = "SET_POST_TEXT";

const initialState = {
  postText: "",
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POST_TEXT:
      return {
        ...state,
        postText: action.text,
      };

    default:
      return state;
  }
};

export default postReducer;

export const setPostText = (text) => ({
  type: SET_POST_TEXT,
  text,
});

export const setPostThunk = (fullname,username, time, postMessage, postImage,profile, uid) => {
  return async (dispatch) => {

    
    await postsAPI.addPost(fullname,username ,time,postMessage,postImage,profile, uid);
   

  };
};


