import { SET_HOME_ITEM } from "./actions";

export const setHomeItem = (homeItem) => {
  return {
    type: SET_HOME_ITEM,
    payload: { homeItem },
  };
};
