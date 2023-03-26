import {
  CHANNEL_MODAL_OPEN,
  CHANNEL_MODAL_CLOSE,
  PROJECT_MODAL_OPEN,
  PROJECT_MODAL_CLOSE,
  FRIEND_MODAL_OPEN,
  FRIEND_MODAL_CLOSE,
  INFO_MODAL_OPEN,
  INFO_MODAL_CLOSE,
} from "./actions";

export const channelModalOpen = (type, data = {}) => {
  return {
    type: CHANNEL_MODAL_OPEN,
    payload: { type, data },
  };
};

export const channelModalClose = () => {
  return {
    type: CHANNEL_MODAL_CLOSE,
  };
};

export const projectModalOpen = (type, data = {}) => {
  return {
    type: PROJECT_MODAL_OPEN,
    payload: { type, data },
  };
};

export const projectModalClose = () => {
  return {
    type: PROJECT_MODAL_CLOSE,
  };
};

export const friendModalOpen = (type, data = {}) => {
  return {
    type: FRIEND_MODAL_OPEN,
    payload: { type, data },
  };
};

export const friendModalClose = () => {
  return {
    type: FRIEND_MODAL_CLOSE,
  };
};

export const infoModalOpen = (type, data = {}) => {
  return {
    type: INFO_MODAL_OPEN,
    payload: { type, data },
  };
};

export const infoModalClose = () => {
  return {
    type: INFO_MODAL_CLOSE,
  };
};
