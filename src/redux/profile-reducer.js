import { userAPI } from "../api/restAPI";
import { getUserInfoThunk } from "./authentication";

const SET_USER_STATUS = "SET_USER_STATUS";
const SET_FULL_NAME = "SET_FULL_NAME";
const SET_USER_NAME = "SET_USER_NAME";
const SET_USER_LOCATION = "SET_USER_LOCATION";
const SET_USER_DATE = "SET_USER_DATE";
const SET_IS_PROFILE_FETCHING = "SET_IS_PROFILE_FETCHING";
const SET_IMAGE = "SET_IMAGE";

const initialState = {
  status: "",
  fullname: "Anonymous",
  username: "none",
  location: "",
  date: "04/04/2020",
  image:"",
  isProfileFetching: true,

};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case SET_FULL_NAME:
      return {
        ...state,
        fullname: action.fullname,
      };
    case SET_USER_NAME:
      return {
        ...state,
        username: action.username,
      };
    case SET_USER_LOCATION:
      return {
        ...state,
        location: action.location,
      };
    case SET_USER_DATE:
      return {
        ...state,
        date: action.date,
      };
    case SET_IS_PROFILE_FETCHING:
      return {
        ...state,
        isProfileFetching: action.info,
      };
    case SET_IMAGE:
      return {
        ...state,
        image: action.image,
      };

    default:
      return state;
  }
};
export default profileReducer;

export const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  status,
});
export const setFullName = (fullname) => ({
  type: SET_FULL_NAME,
  fullname,
});
export const setUserName = (username) => ({
  type: SET_USER_NAME,
  username,
});
export const setUserLocation = (location) => ({
  type: SET_USER_LOCATION,
  location,
});
export const setUserDate = (date) => ({
  type: SET_USER_DATE,
  date,
});
export const setIsProfileFetching = (info) => ({
  type: SET_IS_PROFILE_FETCHING,
  info,
});
export const setImage = (image) => ({
  type: SET_IMAGE,
  image,
});

export const setUserInfoThunk = (fullname, username, status, location,image, uid) => {
  return async (dispatch) => {
    await userAPI.setProfileInfo(fullname, username, status, location,image, uid);
    dispatch(setUserStatus(status));
    dispatch(setFullName(fullname));
    dispatch(setUserName(username));
    dispatch(setUserLocation(location));
    dispatch(setImage(image));
  };
};

export const getUserThunk = (uid) => {
  return async (dispatch) => {
    const userInfo = await userAPI.getUserInfo(uid);
    dispatch(setUserName(userInfo.data().username));
    dispatch(setFullName(userInfo.data().fullname));
    dispatch(setUserStatus(userInfo.data().status));
    dispatch(setUserLocation(userInfo.data().location));
    dispatch(setImage(userInfo.data().image))
    dispatch(setIsProfileFetching(false));
  };
};
