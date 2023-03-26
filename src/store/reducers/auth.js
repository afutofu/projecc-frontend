import {
  SET_USERNAME,
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_GUEST_SUCCESS,
  LOGIN_GUEST_FAIL,
  LOGOUT,
} from "../actions/actions";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
  error: null,
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state, isLogged: true, username: action.payload.username };
    case LOGIN_BEGIN:
    case FETCH_USER_BEGIN:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case FETCH_USER_SUCCESS:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.data.token);
      return {
        ...state,
        ...action.payload.data,
        isAuthenticated: true,
        error: null,
        isLoading: false,
      };
    case LOGIN_GUEST_SUCCESS:
      return {
        ...state,
        ...action.payload.data,
        isAuthenticated: true,
        error: null,
        isLoading: false,
      };
    case FETCH_USER_FAIL:
    case LOGIN_FAIL:
    case LOGIN_GUEST_FAIL:
    case REGISTER_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        isLoading: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
