import {
  // PROJECT
  SET_SELECTED_PROJECT,
  FETCH_PROJECTS_BEGIN,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAIL,
  CREATE_PROJECT_CLIENT,
  CREATE_PROJECT_BEGIN,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAIL,
  RENAME_PROJECT_CLIENT,
  RENAME_PROJECT_BEGIN,
  RENAME_PROJECT_SUCCESS,
  RENAME_PROJECT_FAIL,
  DELETE_PROJECT_CLIENT,
  DELETE_PROJECT_BEGIN,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,

  // CHANNEL
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

  // MESSAGE
  CREATE_MESSAGE_CLIENT,
  CREATE_MESSAGE_BEGIN,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAIL,
  DELETE_MESSAGE_CLIENT,
  DELETE_MESSAGE_BEGIN,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAIL,
} from "../../actions/actions";

import {
  setSelectedProject,
  fetchProjectsBegin,
  fetchProjectsSuccess,
  fetchProjectsFail,
  createProjectClient,
  createProjectBegin,
  createProjectSuccess,
  createProjectFail,
  renameProjectClient,
  renameProjectBegin,
  renameProjectSuccess,
  renameProjectFail,
  deleteProjectClient,
  deleteProjectBegin,
  deleteProjectSuccess,
  deleteProjectFail,
} from "./project";

import {
  setSelectedChannel,
  createChannelClient,
  createChannelBegin,
  createChannelSuccess,
  createChannelFail,
  renameChannelClient,
  renameChannelBegin,
  renameChannelSuccess,
  renameChannelFail,
  deleteChannelClient,
  deleteChannelBegin,
  deleteChannelSuccess,
  deleteChannelFail,
} from "./channel";

import {
  createMessageClient,
  createMessageBegin,
  createMessageSuccess,
  createMessageFail,
  deleteMessageClient,
  deleteMessageBegin,
  deleteMessageSuccess,
  deleteMessageFail,
} from "./message";

let initialState = {
  loading: false,
  error: false,
  projects: [],
  selectedProject: null,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    // PROJECT

    case SET_SELECTED_PROJECT:
      return setSelectedProject(state, action);

    // Fetch
    case FETCH_PROJECTS_BEGIN:
      return fetchProjectsBegin(state, action);
    case FETCH_PROJECTS_SUCCESS:
      return fetchProjectsSuccess(state, action);
    case FETCH_PROJECTS_FAIL:
      return fetchProjectsFail(state, action);

    // Create
    case CREATE_PROJECT_CLIENT:
      return createProjectClient(state, action);
    case CREATE_PROJECT_BEGIN:
      return createProjectBegin(state, action);
    case CREATE_PROJECT_SUCCESS:
      return createProjectSuccess(state, action);
    case CREATE_PROJECT_FAIL:
      return createProjectFail(state, action);

    // Rename
    case RENAME_PROJECT_CLIENT:
      return renameProjectClient(state, action);
    case RENAME_PROJECT_BEGIN:
      return renameProjectBegin(state, action);
    case RENAME_PROJECT_SUCCESS:
      return renameProjectSuccess(state, action);
    case RENAME_PROJECT_FAIL:
      return renameProjectFail(state, action);

    // Delete
    case DELETE_PROJECT_CLIENT:
      return deleteProjectClient(state, action);
    case DELETE_PROJECT_BEGIN:
      return deleteProjectBegin(state, action);
    case DELETE_PROJECT_SUCCESS:
      return deleteProjectSuccess(state, action);
    case DELETE_PROJECT_FAIL:
      return deleteProjectFail(state, action);

    // CHANNEL
    case SET_SELECTED_CHANNEL:
      return setSelectedChannel(state, action);
    case CREATE_CHANNEL_CLIENT:
      return createChannelClient(state, action);
    case CREATE_CHANNEL_BEGIN:
      return createChannelBegin(state, action);
    case CREATE_CHANNEL_SUCCESS:
      return createChannelSuccess(state, action);
    case CREATE_CHANNEL_FAIL:
      return createChannelFail(state, action);
    case RENAME_CHANNEL_CLIENT:
      return renameChannelClient(state, action);
    case RENAME_CHANNEL_BEGIN:
      return renameChannelBegin(state, action);
    case RENAME_CHANNEL_SUCCESS:
      return renameChannelSuccess(state, action);
    case RENAME_CHANNEL_FAIL:
      return renameChannelFail(state, action);
    case DELETE_CHANNEL_CLIENT:
      return deleteChannelClient(state, action);
    case DELETE_CHANNEL_BEGIN:
      return deleteChannelBegin(state, action);
    case DELETE_CHANNEL_SUCCESS:
      return deleteChannelSuccess(state, action);
    case DELETE_CHANNEL_FAIL:
      return deleteChannelFail(state, action);

    // MESSAGE
    case CREATE_MESSAGE_CLIENT:
      return createMessageClient(state, action);
    case CREATE_MESSAGE_BEGIN:
      return createMessageBegin(state, action);
    case CREATE_MESSAGE_SUCCESS:
      return createMessageSuccess(state, action);
    case CREATE_MESSAGE_FAIL:
      return createMessageFail(state, action);
    case DELETE_MESSAGE_CLIENT:
      return deleteMessageClient(state, action);
    case DELETE_MESSAGE_BEGIN:
      return deleteMessageBegin(state, action);
    case DELETE_MESSAGE_SUCCESS:
      return deleteMessageSuccess(state, action);
    case DELETE_MESSAGE_FAIL:
      return deleteMessageFail(state, action);

    default:
      return state;
  }
};

export default projectReducer;
