import db from '../firebase';


const SET_POSTS_LIST = "SET_POSTS_LIST";

const initialState = {
    postsList:[]
  };
  

const listReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_POSTS_LIST:
          return {
            ...state,
            postsList: action.list,
          };
    
        default:
          return state;
      }
}

export default listReducer;

export const setList = (list) => ({
    type: SET_POSTS_LIST,
    list,
  });
  

export const setPostsListThunk = () => {
    return async (dispatch) => {
  
      await  db
      .firestore()
      .collection("postsList")
      .orderBy("time", "desc")
      .onSnapshot((snapshot) => {
        dispatch(setList(snapshot.docs.map((doc) => ({ ...doc.data() ,id:doc.id}))));
        // setList(snapshot.docs.map((doc) => ({ ...doc.data(), uid: doc.uid })));
      });
      
    };
  };