import {
  FETCH_DIRECT_MESSAGES_SUCCESS,
  FETCH_DIRECT_MESSAGES_FAIL,
  CREATE_DIRECT_MESSAGE_GROUP_SUCCESS,
  CREATE_DIRECT_MESSAGE_GROUP_FAIL,
  DELETE_DIRECT_MESSAGE_GROUP_SUCCESS,
  DELETE_DIRECT_MESSAGE_GROUP_FAIL,
  CREATE_DIRECT_MESSAGE_CLIENT,
  CREATE_DIRECT_MESSAGE_BEGIN,
  CREATE_DIRECT_MESSAGE_SUCCESS,
  CREATE_DIRECT_MESSAGE_FAIL,
  DELETE_DIRECT_MESSAGE_CLIENT,
  DELETE_DIRECT_MESSAGE_SUCCESS,
  DELETE_DIRECT_MESSAGE_FAIL,
  CREATE_DIRECT_MESSAGE_GROUP_CLIENT,
  DELETE_DIRECT_MESSAGE_GROUP_CLIENT,
} from "../actions/actions";

const initialState = {
  directMessages: [],
  error: null,
};

const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DIRECT_MESSAGES_SUCCESS:
      return {
        ...state,
        directMessages: [...action.payload.directMessages],
      };
    case CREATE_DIRECT_MESSAGE_GROUP_CLIENT:
    case CREATE_DIRECT_MESSAGE_GROUP_SUCCESS:
      return {
        ...state,
        directMessages: [action.payload.directMessage, ...state.directMessages],
      };
    case DELETE_DIRECT_MESSAGE_GROUP_CLIENT:
    case DELETE_DIRECT_MESSAGE_GROUP_SUCCESS:
      return {
        ...state,
        directMessages: state.directMessages.filter((directMessage) => {
          if (directMessage._id !== action.payload.directMessage._id)
            return directMessage;
          return null;
        }),
      };
    case CREATE_DIRECT_MESSAGE_BEGIN:
      return {
        ...state,
        directMessages: state.directMessages.map((directMessage) => {
          if (directMessage._id === action.payload.directMessageId) {
            directMessage.messages = [
              ...directMessage.messages,
              action.payload.initialNewMessage,
            ];
          }
          return directMessage;
        }),
      };
    case CREATE_DIRECT_MESSAGE_CLIENT:
      return {
        ...state,
        directMessages: state.directMessages.map((directMessage) => {
          if (directMessage._id === action.payload.directMessageId) {
            directMessage.messages = [
              ...directMessage.messages,
              action.payload.newMessage,
            ];
          }
          return directMessage;
        }),
      };
    case CREATE_DIRECT_MESSAGE_SUCCESS:
      return {
        ...state,
        directMessages: state.directMessages.map((directMessage) => {
          if (directMessage._id === action.payload.directMessageId) {
            for (let i = directMessage.messages.length - 1; i > 0; i--) {
              if (
                directMessage.messages[i].initialId === action.payload.initialId
              ) {
                directMessage.messages[i] = {
                  ...action.payload.newMessage,
                };
              }
            }
          }
          return directMessage;
        }),
      };
    case DELETE_DIRECT_MESSAGE_CLIENT:
    case DELETE_DIRECT_MESSAGE_SUCCESS:
      return {
        ...state,
        directMessages: state.directMessages.map((directMessage) => {
          if (directMessage._id === action.payload.directMessageId) {
            directMessage.messages = directMessage.messages.filter(
              (message) => {
                if (message._id !== action.payload.messageId) return message;
                return null;
              }
            );
          }
          return directMessage;
        }),
      };
    case FETCH_DIRECT_MESSAGES_FAIL:
    case CREATE_DIRECT_MESSAGE_GROUP_FAIL:
    case DELETE_DIRECT_MESSAGE_GROUP_FAIL:
    case CREATE_DIRECT_MESSAGE_FAIL:
      return {
        ...state,
        error: action.payload.error,
        directMessages: state.directMessages.map((directMessage) => {
          if (directMessage._id === action.payload.directMessageId) {
            directMessage.messages = directMessage.messages.filter(
              (message) => {
                if (message.initialId !== action.payload.initialId)
                  return message;
                return null;
              }
            );
          }
          return directMessage;
        }),
      };
    case DELETE_DIRECT_MESSAGE_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default friendReducer;
