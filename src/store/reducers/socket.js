import { SET_SOCKET } from "../actions/actions";

const initialState = {
  socket: null,
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return { ...state, socket: action.payload.socket };
    default:
      return state;
  }
};

export default socketReducer;
