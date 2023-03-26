import axios from "axios";
import {
  SET_SELECTED_CHANNEL,
  CREATE_CHANNEL_CLIENT,
  CREATE_CHANNEL_BEGIN,
  CREATE_CHANNEL_SUCCESS,
  CREATE_CHANNEL_FAIL,
  RENAME_CHANNEL_CLIENT,
  RENAME_CHANNEL_BEGIN,
  RENAME_CHANNEL_SUCCESS,
  RENAME_CHANNEL_FAIL,
  DELETE_CHANNEL_CLIENT,
  DELETE_CHANNEL_BEGIN,
  DELETE_CHANNEL_SUCCESS,
  DELETE_CHANNEL_FAIL,
} from "../actions";

// Env variable for API
const { REACT_APP_API_URL } = process.env;

// SET SELECTED CHANNEL
export const setSelectedChannel = (channelId, projectId) => {
  return {
    type: SET_SELECTED_CHANNEL,
    payload: { channelId, projectId },
  };
};

// CREATE CHANNEL
export const createChannelClient = (newChannel, projectId) => {
  return {
    type: CREATE_CHANNEL_CLIENT,
    payload: { newChannel, projectId },
  };
};

export const createChannel = (channelName, projectId) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    dispatch(createChannelBegin());
    axios
      .post(`${REACT_APP_API_URL}/api/projects/${projectId}/channels`, {
        channelName,
      })
      .then((res) => {
        dispatch(createChannelSuccess(res.data, projectId));
        resolve({ data: res.data, projectId });
      })
      .catch((err) => {
        dispatch(createChannelFail(err));
        reject(err);
      });
  });
};

const createChannelBegin = () => {
  return {
    type: CREATE_CHANNEL_BEGIN,
  };
};

const createChannelSuccess = (channel, projectId) => {
  return {
    type: CREATE_CHANNEL_SUCCESS,
    payload: { channel, projectId },
  };
};

const createChannelFail = (err) => {
  return {
    type: CREATE_CHANNEL_FAIL,
    payload: { err },
  };
};

// RENAME CHANNEL
export const renameChannelClient = (renamedChannel, channelId, projectId) => {
  return {
    type: RENAME_CHANNEL_CLIENT,
    payload: { renamedChannel, channelId, projectId },
  };
};

export const renameChannel =
  (newChannelName, channelId, projectId) => (dispatch) => {
    return new Promise(function (resolve, reject) {
      dispatch(renameChannelBegin());
      axios
        .patch(
          `${REACT_APP_API_URL}/api/projects/${projectId}/channels/${channelId}`,
          {
            newChannelName,
          }
        )
        .then((res) => {
          dispatch(renameChannelSuccess(res.data, channelId, projectId));
          resolve({ data: res.data, channelId, projectId });
        })
        .catch((err) => {
          dispatch(renameChannelFail(err));
          reject(err);
        });
    });
  };

const renameChannelBegin = () => {
  return {
    type: RENAME_CHANNEL_BEGIN,
  };
};

const renameChannelSuccess = (renamedChannel, channelId, projectId) => {
  return {
    type: RENAME_CHANNEL_SUCCESS,
    payload: { renamedChannel, channelId, projectId },
  };
};

const renameChannelFail = (err) => {
  return {
    type: RENAME_CHANNEL_FAIL,
    payload: { err },
  };
};

// DELETE CHANNEL
export const deleteChannelClient = (channelId, projectId) => {
  return {
    type: DELETE_CHANNEL_CLIENT,
    payload: { channelId, projectId },
  };
};

export const deleteChannel = (channelId, projectId) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    dispatch(deleteChannelBegin());
    axios
      .delete(
        `${REACT_APP_API_URL}/api/projects/${projectId}/channels/${channelId}`
      )
      .then((res) => {
        dispatch(deleteChannelSuccess(res.data));
        resolve({ channelId, projectId });
      })
      .catch((err) => {
        dispatch(deleteChannelFail(err));
        reject(err);
      });
  });
};

const deleteChannelBegin = () => {
  return {
    type: DELETE_CHANNEL_BEGIN,
  };
};

const deleteChannelSuccess = (updatedProject) => {
  return {
    type: DELETE_CHANNEL_SUCCESS,
    payload: { updatedProject },
  };
};

const deleteChannelFail = (err) => {
  return {
    type: DELETE_CHANNEL_FAIL,
    payload: { err },
  };
};
