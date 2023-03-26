import { SET_HOME_ITEM } from "../actions/actions";

const initialState = {
  homeItem: "profile",
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME_ITEM:
      return {
        ...state,
        homeItem: action.payload.homeItem,
      };
    default:
      return state;
  }
};

export default homeReducer;
