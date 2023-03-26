import axios from "axios";
import {
  SET_FRIEND_STATUS_DISPLAY,
  STORE_FRIENDS,
  SEND_FRIEND_REQUEST_CLIENT,
  SEND_FRIEND_REQUEST_BEGIN,
  SEND_FRIEND_REQUEST_SUCCESS,
  SEND_FRIEND_REQUEST_FAIL,
  DELETE_FRIEND_REQUEST_CLIENT,
  DELETE_FRIEND_REQUEST_BEGIN,
  DELETE_FRIEND_REQUEST_SUCCESS,
  DELETE_FRIEND_REQUEST_FAIL,
  ADD_FRIEND_CLIENT,
  ADD_FRIEND_BEGIN,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_FAIL,
  DELETE_FRIEND_CLIENT,
  DELETE_FRIEND_BEGIN,
  DELETE_FRIEND_SUCCESS,
  DELETE_FRIEND_FAIL,
} from "./actions";
import { tokenConfig } from "../../shared/utils";

// Env variable for API
const { REACT_APP_API_URL } = process.env;

export const setFriendStatusDisplay = (friendStatusDisplay) => {
  return {
    type: SET_FRIEND_STATUS_DISPLAY,
    payload: { friendStatusDisplay },
  };
};

export const storeFriends = (friends) => {
  return {
    type: STORE_FRIENDS,
    payload: { friends },
  };
};

// SEND FRIEND REQUEST
export const sendFriendRequestClient = (newRequest) => {
  return {
    type: SEND_FRIEND_REQUEST_CLIENT,
    payload: { newRequest },
  };
};

export const sendFriendRequest = (userId, friendId) => (dispatch, getState) => {
  return new Promise(function (resolve, reject) {
    dispatch(sendFriendRequestBegin());
    axios
      .post(
        `${REACT_APP_API_URL}/api/users/${userId}/friends/${friendId}/requests`,
        {},
        tokenConfig(getState)
      )
      .then((res) => {
        const { senderRequest, receiverRequest } = res.data;
        dispatch(sendFriendRequestSuccess(senderRequest));
        resolve(receiverRequest);
      })
      .catch((error) => {
        dispatch(sendFriendRequestFail(error.response.data.msg));
        reject(error.response.data.msg);
      });
  });
};

const sendFriendRequestBegin = () => {
  return {
    type: SEND_FRIEND_REQUEST_BEGIN,
  };
};

const sendFriendRequestSuccess = (newRequest) => {
  return {
    type: SEND_FRIEND_REQUEST_SUCCESS,
    payload: { newRequest },
  };
};

const sendFriendRequestFail = (error) => {
  return {
    type: SEND_FRIEND_REQUEST_FAIL,
    payload: { error },
  };
};

// DELETE FRIEND REQUEST
export const deleteFriendRequestClient = (friendId) => {
  return {
    type: DELETE_FRIEND_REQUEST_CLIENT,
    payload: { friendId },
  };
};

export const deleteFriendRequest =
  (userId, friendId) => (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(deleteFriendRequestBegin());
      axios
        .delete(
          `${REACT_APP_API_URL}/api/users/${userId}/friends/${friendId}/requests`,
          tokenConfig(getState)
        )
        .then((res) => {
          dispatch(deleteFriendRequestSuccess(friendId));
          resolve(userId);
        })
        .catch((error) => {
          dispatch(deleteFriendRequestFail(error.response.data.msg));
          reject(error.response.data.msg);
        });
    });
  };

const deleteFriendRequestBegin = () => {
  return {
    type: DELETE_FRIEND_REQUEST_BEGIN,
  };
};

const deleteFriendRequestSuccess = (friendId) => {
  return {
    type: DELETE_FRIEND_REQUEST_SUCCESS,
    payload: { friendId },
  };
};

const deleteFriendRequestFail = (error) => {
  return {
    type: DELETE_FRIEND_REQUEST_FAIL,
    payload: { error },
  };
};

// ADD FRIEND

export const addFriendClient = (friend) => {
  return {
    type: ADD_FRIEND_CLIENT,
    payload: { friend },
  };
};

export const addFriend = (userId, friendId) => (dispatch, getState) => {
  return new Promise(function (resolve, reject) {
    dispatch(addFriendBegin());
    axios
      .post(
        `${REACT_APP_API_URL}/api/users/${userId}/friends`,
        {
          friendId,
        },
        tokenConfig(getState)
      )
      .then((res) => {
        const { friendRequestReceiver, friendRequestSender } = res.data;
        dispatch(addFriendSuccess(friendRequestReceiver));
        resolve(friendRequestSender);
      })
      .catch((error) => {
        console.log(error);
        dispatch(addFriendFail(error.response.data.msg));
        reject(error.response.data.msg);
      });
  });
};

const addFriendBegin = () => {
  return {
    type: ADD_FRIEND_BEGIN,
  };
};

const addFriendSuccess = (friend) => {
  return {
    type: ADD_FRIEND_SUCCESS,
    payload: { friend },
  };
};

const addFriendFail = (error) => {
  return {
    type: ADD_FRIEND_FAIL,
    payload: { error },
  };
};

// DELETE FRIEND
export const deleteFriendClient = (friend) => {
  return {
    type: DELETE_FRIEND_CLIENT,
    payload: { friendId: friend._id },
  };
};

export const deleteFriend = (userId, friendId) => (dispatch, getState) => {
  return new Promise(function (resolve, reject) {
    dispatch(deleteFriendBegin());
    axios
      .delete(
        `${REACT_APP_API_URL}/api/users/${userId}/friends/${friendId}`,
        tokenConfig(getState)
      )
      .then((res) => {
        const { user, friend } = res.data;
        dispatch(deleteFriendSuccess(friend));
        resolve(user);
      })
      .catch((error) => {
        console.log(error);
        dispatch(deleteFriendFail(error.response.data.msg));
        reject(error.response.data.msg);
      });
  });
};

const deleteFriendBegin = () => {
  return {
    type: DELETE_FRIEND_BEGIN,
  };
};

const deleteFriendSuccess = (friend) => {
  return {
    type: DELETE_FRIEND_SUCCESS,
    payload: { friendId: friend._id },
  };
};

const deleteFriendFail = (error) => {
  return {
    type: DELETE_FRIEND_FAIL,
    payload: { error },
  };
};
