import { postsAPI } from "../api/restAPI";

const SET_USER_INFO = "SET_USER_INFO";

const initialState = {
  showUserInfo: [],
};

const showUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        showUserInfo: action.info,
      };

    default:
      return state;
  }
};

export default showUserReducer;

export const setShowUserInfo = (info) => ({
  type: SET_USER_INFO,
  info,
});

