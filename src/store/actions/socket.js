import { SET_SOCKET } from "./actions";

export const setSocket = (socket) => {
  return {
    type: SET_SOCKET,
    payload: { socket },
  };
};
