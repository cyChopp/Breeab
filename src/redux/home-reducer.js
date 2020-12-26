const SET_IS_FETCHING = "SET_IS_FETCHING";

const initialState = {
  isFetching: false,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.fetching,
      };

    default:
      return state;
  }
};
export default homeReducer;

export const setIsFetching = (fetching) => ({
  type: SET_IS_FETCHING,
  fetching,
});
