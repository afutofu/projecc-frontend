import axios from "axios";
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
} from "./actions";
import { storeFriends, fetchDirectMessages } from "./index";
import { tokenConfig } from "../../shared/utils";

// Env variable for API
const { REACT_APP_API_URL } = process.env;

export const setUsername = (username) => {
  return {
    type: SET_USERNAME,
    payload: { username },
  };
};

// Check token & fetch user
export const fetchUser = () => (dispatch, getState) => {
  return new Promise(function (resolve, reject) {
    dispatch(fetchUserBegin());
    axios
      .get(`${REACT_APP_API_URL}/api/auth/user`, tokenConfig(getState))
      .then((res) => {
        const { token, user, friends } = res.data;
        dispatch(fetchUserSuccess({ token, user }));
        dispatch(storeFriends(friends));
        dispatch(fetchDirectMessages(user._id));
        resolve(res.data);
      })
      .catch((err) => {
        if (err && err.response) {
          dispatch(fetchUserFail(err.response.data.msg));
          reject(err.response.data.msg);
        } else {
          console.log(err);
          reject(err);
        }
      });
  });
};

const fetchUserBegin = () => {
  return {
    type: FETCH_USER_BEGIN,
  };
};

const fetchUserSuccess = (data) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: { data },
  };
};

const fetchUserFail = (msg) => {
  return {
    type: FETCH_USER_FAIL,
    payload: { id: "FETCH_USER_ERROR", msg: msg },
  };
};

// Register new user
export const register = (name, email, password) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    // Client-side validation
    // Check if all fields are entered
    if (!name || !email || !password) {
      dispatch(registerFail("Please enter all fields"));
      return Promise.resolve();
    }

    // Email validation
    // Regex test returns true if email format is correct
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
    if (!re.test(email)) {
      dispatch(registerFail("Incorrect email format"));
      return Promise.resolve();
    }

    // Password validation
    // Password length should be 6 or more characters
    if (password.length < 6) {
      dispatch(registerFail("Password should be 6 or more characters"));
      return Promise.resolve();
    }

    // Headers
    const config = {
      "Content-Type": "application/json",
    };

    // Request body
    const body = { name, email, password };

    axios
      .post(`${REACT_APP_API_URL}/api/users`, body, config)
      .then((res) => {
        const { token, user, friends } = res.data;
        dispatch(registerSuccess({ token, user }));
        dispatch(storeFriends(friends));
        dispatch(fetchDirectMessages(user._id));
        resolve(user);
      })
      .catch((err) => {
        dispatch(registerFail(err.response.data.msg));
      });
  });
};

export const registerSuccess = (data) => {
  return {
    type: REGISTER_SUCCESS,
    payload: { data },
  };
};

export const registerFail = (msg) => {
  return {
    type: REGISTER_FAIL,
    payload: { id: "REGISTER_ERROR", msg },
  };
};

// Login user
export const login = (email, password) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    dispatch(loginBegin());

    // Client-side validation

    // Check if all fields are entered
    if (!email || !password) {
      dispatch(loginFail("Please enter all fields"));
      return Promise.resolve();
    }

    // Headers
    const config = {
      "Content-Type": "application/json",
    };

    // Request body
    const body = { email, password };

    axios
      .post(`${REACT_APP_API_URL}/api/auth`, body, config)
      .then((res) => {
        const { token, user, friends } = res.data;
        dispatch(loginSuccess({ token, user }));
        dispatch(storeFriends(friends));
        dispatch(fetchDirectMessages(user._id));
        resolve(user);
      })
      .catch((err) => {
        dispatch(loginFail(err.response.data.msg));
      });
  });
};

const loginBegin = () => {
  return {
    type: LOGIN_BEGIN,
  };
};

const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { data },
  };
};

const loginFail = (msg) => {
  return {
    type: LOGIN_FAIL,
    payload: { id: "LOGIN_ERROR", msg },
  };
};

// Login as guest
export const loginGuest = () => (dispatch) => {
  return new Promise(function (resolve, reject) {
    // Headers
    const config = {
      "Content-Type": "application/json",
    };

    axios
      .post(`${REACT_APP_API_URL}/api/users/guest`, config)
      .then((res) => {
        const { user, friends } = res.data;
        dispatch(loginGuestSuccess({ user }));
        dispatch(storeFriends(friends));
        resolve(user);
      })
      .catch((err) => {
        dispatch(loginGuestFail(err.response.data.msg));
      });
  });
};

const loginGuestSuccess = (data) => {
  return {
    type: LOGIN_GUEST_SUCCESS,
    payload: { data },
  };
};

const loginGuestFail = (msg) => {
  return {
    type: LOGIN_GUEST_FAIL,
    payload: { id: "LOGIN_ERROR", msg },
  };
};

// Logout user
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
