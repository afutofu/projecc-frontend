import axios from "axios";

// Env variable for API
const { REACT_APP_API_URL } = process.env;

// Setup config/headers and token
export const tokenConfig = (getState, params) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Params
  if (params) {
    config = {
      ...config,
      params: {
        ...params,
      },
    };
  }

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

// Fetch user data
export const fetchUserData = (userId) => (dispatch, getState) => {
  return new Promise(function (resolve, reject) {
    axios
      .get(`${REACT_APP_API_URL}/api/users/${userId}`, tokenConfig(getState))
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) return reject(err.response.data.msg);
        return reject();
      });
  });
};

export const createCustomID = () => {
  // Create custom unique ID based on time
  let id = "";
  const date = new Date();

  id += date.getFullYear();
  id += date.getMonth();
  id += date.getDay();
  id += date.getHours();
  id += date.getMinutes();
  id += date.getSeconds();
  id += date.getMilliseconds();

  return id;
};
