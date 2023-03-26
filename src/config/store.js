// import { createStore, applyMiddleware } from "redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import allReducers from "../store/reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducers,
  // persistedState,
  composeEnhancers(applyMiddleware(thunk))
  // applyMiddleware(thunk)
);

// store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
