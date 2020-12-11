import { authAPI, userAPI } from "../api/restAPI";
import moment from "moment";

const SET_CURRENT_USER_ID = "SET_CURRENT_USER_ID";
const SET_IS_AUTH = "SET_IS_AUTH";
const SET_EMAIL = "SET_EMAIL";
const SET_PASSWORD = "SET_PASSWORD";
const SET_PASSWORD_CONFIRMATION = "SET_PASSWORD_CONFIRMATION";

const initialState = {
  email: "",
  currentUserId: "",
  isAuth: false,
  password: "",
  passwordConfirmation: "",
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER_ID:
      return {
        ...state,
        currentUserId: action.uid,
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.email,
      };
    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.isAuth,
      };
    case SET_PASSWORD:
      return {
        ...state,
        password: action.password,
      };
    case SET_PASSWORD_CONFIRMATION:
      return {
        ...state,
        passwordConfirmation: action.confirm,
      };

    default:
      return state;
  }
};
export default authentication;

export const setUserEmail = (email) => ({
  type: SET_EMAIL,
  email,
});

export const setCurrentUserId = (uid) => ({
  type: SET_CURRENT_USER_ID,
  uid,
});
export const setIsAuth = (isAuth) => ({
  type: SET_IS_AUTH,
  isAuth,
});
export const setPassword = (password) => ({
  type: SET_PASSWORD,
  password,
});
export const setPasswordConfirmation = (confirm) => ({
  type: SET_PASSWORD_CONFIRMATION,
  confirm,
});

////              THUNKS             ////

// export const getUserAuthInfoThunk = (user)=>{
//     return  async (dispatch) =>{

//  await userAPI.getUserInfo(user.uid);

//     dispatch(setIsAuth(true))
//     dispatch(setUserEmail(userAPI.email))
//     dispatch(setCurrentUserId(user.uid))
//     }
// }
// export const addUserAuthInfoThunk = (email,uid) => {
//     return async (dispatch) => {
//       await userAPI.setProfileInfo(email,uid);
//     };
//   };

export const signUpThunk = (data) => {
  return async (dispatch) => {
    await authAPI.signUp(data);
    dispatch(setIsAuth(true));
    dispatch(setUserEmail(data.email));
    dispatch(setPasswordConfirmation(data.password));
    dispatch(setPassword(data.passwordConfirm));
  };
};
export const signOutThunk = () => {
  return async (dispatch) => {
    await authAPI.signOut();

    dispatch(setIsAuth(false));
    dispatch(setUserEmail(""));
    dispatch(setCurrentUserId(""));
    dispatch(setPassword(""));
    dispatch(setPasswordConfirmation(""));
  };
};

export const getUserInfoThunk = (uid) => {
  return async (dispatch) => {
    const currentUserInfo = await authAPI.getUserAuthInfo(uid);

    dispatch(setCurrentUserId(currentUserInfo.data().userId));
    dispatch(setUserEmail(currentUserInfo.data().email));
    dispatch(setIsAuth(true));

  };
};
