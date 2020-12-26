import db from "../firebase";

const SET_CURRENT_USER_PICTURE = "SET_CURRENT_USER_PICTURE";

const initialState = {
  currentUserPicture: "",
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER_PICTURE:
      return {
        ...state,
        currentUserPicture: action.picture,
      };

    default:
      return state;
  }
};
export default chatReducer;

export const setCurrentUserPicture = (picture) => ({
  type: SET_CURRENT_USER_PICTURE,
  picture,
});

export const getCurrentUserPictureThunk = (uid) => {
  return async (dispatch) => {
    const image = await db.firestore().collection("users").doc(uid).get();

    dispatch(setCurrentUserPicture(image.data().image));
  };
};
