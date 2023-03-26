import axios from "axios";
import {
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
} from "../actions";

// Env variable for API
const { REACT_APP_API_URL } = process.env;

// SELECT PROJECT
export const setSelectedProject = (projectId) => {
  return {
    type: SET_SELECTED_PROJECT,
    payload: { projectId },
  };
};

// FETCH PROJECT
export const fetchProjects = () => (dispatch) => {
  return new Promise(function (resolve, reject) {
    dispatch(fetchProjectsBegin());
    axios
      .get(`${REACT_APP_API_URL}/api/projects`)
      .then((res) => {
        dispatch(fetchProjectsSuccess(res.data));
        resolve(res.data);
      })
      .catch((err) => {
        dispatch(fetchProjectsFail(err));
        reject(err);
      });
  });
};

const fetchProjectsBegin = () => {
  return {
    type: FETCH_PROJECTS_BEGIN,
  };
};

const fetchProjectsSuccess = (projects) => {
  return {
    type: FETCH_PROJECTS_SUCCESS,
    payload: { projects },
  };
};

const fetchProjectsFail = (err) => {
  return {
    type: FETCH_PROJECTS_FAIL,
    payload: { err },
  };
};

// CREATE PROJECT
export const createProjectClient = (createdProject) => {
  return {
    type: CREATE_PROJECT_CLIENT,
    payload: { createdProject },
  };
};

export const createProject =
  ({ name, creatorName }) =>
  (dispatch) => {
    return new Promise(function (resolve, reject) {
      dispatch(createProjectBegin());
      axios
        .post(`${REACT_APP_API_URL}/api/projects`, { name, creatorName })
        .then((res) => {
          dispatch(createProjectSuccess(res.data));
          resolve({ data: res.data });
        })
        .catch((err) => {
          dispatch(createProjectFail(err));
          reject(err);
        });
    });
  };

const createProjectBegin = () => {
  return {
    type: CREATE_PROJECT_BEGIN,
  };
};

const createProjectSuccess = (createdProject) => {
  return {
    type: CREATE_PROJECT_SUCCESS,
    payload: { createdProject },
  };
};

const createProjectFail = (err) => {
  return {
    type: CREATE_PROJECT_FAIL,
    payload: { err },
  };
};

// RENAME PROJECT
export const renameProjectClient = (renamedProject, projectId) => {
  return {
    type: RENAME_PROJECT_CLIENT,
    payload: { renamedProject, projectId },
  };
};

export const renameProject =
  ({ newName, projectId }) =>
  (dispatch) => {
    return new Promise(function (resolve, reject) {
      dispatch(renameProjectBegin());
      axios
        .patch(`${REACT_APP_API_URL}/api/projects/${projectId}`, {
          name: newName,
        })
        .then((res) => {
          dispatch(renameProjectSuccess(res.data));
          resolve({ data: res.data, projectId });
        })
        .catch((err) => {
          dispatch(renameProjectFail(err));
          reject(err);
        });
    });
  };

const renameProjectBegin = () => {
  return {
    type: RENAME_PROJECT_BEGIN,
  };
};

const renameProjectSuccess = (renamedProject) => {
  return {
    type: RENAME_PROJECT_SUCCESS,
    payload: { renamedProject },
  };
};

const renameProjectFail = (err) => {
  return {
    type: RENAME_PROJECT_FAIL,
    payload: { err },
  };
};

// DELETE PROJECT
export const deleteProjectClient = (projectId) => {
  return {
    type: DELETE_PROJECT_CLIENT,
    payload: { projectId },
  };
};

export const deleteProject = (projectId) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    dispatch(deleteProjectBegin());
    axios
      .delete(`${REACT_APP_API_URL}/api/projects/${projectId}`)
      .then((res) => {
        dispatch(deleteProjectSuccess(res.data));
        resolve({ data: res.data, projectId });
      })
      .catch((err) => {
        dispatch(deleteProjectFail(err));
        reject(err);
      });
  });
};

const deleteProjectBegin = () => {
  return {
    type: DELETE_PROJECT_BEGIN,
  };
};

const deleteProjectSuccess = (deletedProject) => {
  return {
    type: DELETE_PROJECT_SUCCESS,
    payload: { deletedProject },
  };
};

const deleteProjectFail = (err) => {
  return {
    type: DELETE_PROJECT_FAIL,
    payload: { err },
  };
};
