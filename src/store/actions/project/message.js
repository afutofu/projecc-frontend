import axios from "axios";
import {
  CREATE_MESSAGE_CLIENT,
  CREATE_MESSAGE_BEGIN,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAIL,
  DELETE_MESSAGE_CLIENT,
  DELETE_MESSAGE_BEGIN,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAIL,
} from "../actions";
import { tokenConfig, createCustomID } from "../../../shared/utils";

// Env variable for API
const { REACT_APP_API_URL } = process.env;

// CREATE MESSAGE
export const createMessageClient = (newMessage, channelId, projectId) => {
  return {
    type: CREATE_MESSAGE_CLIENT,
    payload: { newMessage, channelId, projectId },
  };
};

export const createMessage =
  (message, channelId, projectId) => (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      const initialId = createCustomID();
      const { text, username, userId } = message;

      const initialMessage = {
        initialId,
        text,
        userId,
        username,
      };

      dispatch(createMessageBegin(initialMessage, channelId, projectId));
      axios
        .post(
          `${REACT_APP_API_URL}/api/projects/${projectId}/channels/${channelId}/messages`,
          message,
          tokenConfig(getState)
        )
        .then((res) => {
          dispatch(
            createMessageSuccess(res.data, channelId, projectId, initialId)
          );
          resolve({ data: res.data, channelId, projectId });
        })
        .catch((err) => {
          dispatch(createMessageFail(err, channelId, projectId, initialId));
          reject(err);
        });
    });
  };

const createMessageBegin = (initialNewMessage, channelId, projectId) => {
  return {
    type: CREATE_MESSAGE_BEGIN,
    payload: { initialNewMessage, channelId, projectId },
  };
};

const createMessageSuccess = (newMessage, channelId, projectId, initialId) => {
  return {
    type: CREATE_MESSAGE_SUCCESS,
    payload: { newMessage, channelId, projectId, initialId },
  };
};

const createMessageFail = (err, channelId, projectId, initialId) => {
  return {
    type: CREATE_MESSAGE_FAIL,
    payload: { err, channelId, projectId, initialId },
  };
};

// DELETE MESSAGE
export const deleteMessageClient = (updatedChannel, channelId, projectId) => {
  return {
    type: DELETE_MESSAGE_CLIENT,
    payload: { updatedChannel, channelId, projectId },
  };
};

export const deleteMessage =
  (messageId, channelId, projectId) => (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(deleteMessageBegin());
      axios
        .delete(
          `${REACT_APP_API_URL}/api/projects/${projectId}/channels/${channelId}/messages/${messageId}`,
          tokenConfig(getState)
        )
        .then((res) => {
          dispatch(deleteMessageSuccess(res.data, channelId, projectId));
          resolve({ data: res.data, channelId, projectId });
        })
        .catch((err) => {
          dispatch(deleteMessageFail(err));
          reject(err);
        });
    });
  };

const deleteMessageBegin = () => {
  return {
    type: DELETE_MESSAGE_BEGIN,
  };
};

const deleteMessageSuccess = (updatedChannel, channelId, projectId) => {
  return {
    type: DELETE_MESSAGE_SUCCESS,
    payload: { updatedChannel, channelId, projectId },
  };
};

const deleteMessageFail = (err) => {
  return {
    type: DELETE_MESSAGE_FAIL,
    payload: { err },
  };
};
