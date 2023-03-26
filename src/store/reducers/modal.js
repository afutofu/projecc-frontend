import {
  CHANNEL_MODAL_OPEN,
  CHANNEL_MODAL_CLOSE,
  PROJECT_MODAL_OPEN,
  PROJECT_MODAL_CLOSE,
  FRIEND_MODAL_OPEN,
  FRIEND_MODAL_CLOSE,
  INFO_MODAL_OPEN,
  INFO_MODAL_CLOSE,
} from "../actions/actions";

const initialState = {
  modalData: {},
  channelModalOpen: false,
  channelModalType: null,
  projectModalOpen: false,
  projectModalType: null,
  friendModalOpen: false,
  friendModalType: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANNEL_MODAL_OPEN:
      return {
        ...state,
        channelModalOpen: true,
        channelModalType: action.payload.type,
        modalData: action.payload.data,
      };
    case CHANNEL_MODAL_CLOSE:
      return {
        ...state,
        channelModalOpen: false,
        channelModalType: null,
        modalData: {},
      };
    case PROJECT_MODAL_OPEN:
      return {
        ...state,
        projectModalOpen: true,
        projectModalType: action.payload.type,
        modalData: action.payload.data,
      };
    case PROJECT_MODAL_CLOSE:
      return {
        ...state,
        projectModalOpen: false,
        projectModalType: null,
        modalData: {},
      };
    case FRIEND_MODAL_OPEN:
      return {
        ...state,
        friendModalOpen: true,
        friendModalType: action.payload.type,
        modalData: action.payload.data,
      };
    case FRIEND_MODAL_CLOSE:
      return {
        ...state,
        friendModalOpen: false,
        friendModalType: null,
        modalData: {},
      };
    case INFO_MODAL_OPEN:
      return {
        ...state,
        infoModalOpen: true,
        infoModalType: action.payload.type,
        modalData: action.payload.data,
      };
    case INFO_MODAL_CLOSE:
      return {
        ...state,
        infoModalOpen: false,
        infoModalType: null,
        modalData: {},
      };
    default:
      return state;
  }
};

export default modalReducer;
