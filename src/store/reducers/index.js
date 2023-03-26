import { combineReducers } from "redux";

import authReducer from "./auth";
import projectReducer from "./project/";
import friendReducer from "./friend";
import directMessageReducer from "./directMessage";
import modalReducer from "./modal";
import homeReducer from "./home";
import socketReducer from "./socket";

const allReducers = combineReducers({
  auth: authReducer,
  project: projectReducer,
  friend: friendReducer,
  directMessage: directMessageReducer,
  modal: modalReducer,
  home: homeReducer,
  socket: socketReducer,
});

export default allReducers;
