// SET SELECTED PROJECT
export const setSelectedProject = (state, action) => {
  const { projectId } = action.payload;

  if (projectId == null) {
    return {
      ...state,
      selectedProject: null,
    };
  }

  return {
    ...state,
    selectedProject: state.projects.filter((project) => {
      return project._id === projectId;
    })[0],
  };
};

// FETCH PROJECTS
export const fetchProjectsBegin = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

export const fetchProjectsSuccess = (state, action) => {
  const { projects } = action.payload;

  const newProjects = projects.map((project) => {
    project.selectedChannel = project.channels[0];
    return project;
  });

  return {
    ...state,
    projects: newProjects,
    loading: false,
  };
};

export const fetchProjectsFail = (state, action) => {
  return {
    ...state,
    error: action.payload.err,
    loading: false,
  };
};

// CREATE PROJECT
export const createProjectClient = (state, action) => {
  const { createdProject } = action.payload;

  let newProject = {
    ...createdProject,
    selectedChannel: createdProject.channels[0],
  };

  return {
    ...state,
    projects: [...state.projects, newProject],
  };
};

export const createProjectBegin = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

export const createProjectSuccess = (state, action) => {
  const { createdProject } = action.payload;

  let newProject = {
    ...createdProject,
    selectedChannel: createdProject.channels[0],
  };

  return {
    ...state,
    projects: [...state.projects, newProject],
    selectedProject: newProject,
    loading: false,
  };
};

export const createProjectFail = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

// RENAME PROJECT
export const renameProjectClient = (state, action) => {
  const { renamedProject, projectId } = action.payload;

  if (!state.selectedProject || state.selectedProject._id !== projectId) {
    return {
      ...state,
      projects: state.projects.map((project) => {
        if (project._id === projectId) {
          project.name = renamedProject.name;
        }
        return project;
      }),
    };
  }

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === renamedProject._id) {
        project.name = renamedProject.name;
      }
      return project;
    }),
    selectedProject: {
      ...state.selectedProject,
      name: renamedProject.name,
    },
  };
};

export const renameProjectBegin = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

export const renameProjectSuccess = (state, action) => {
  const { renamedProject } = action.payload;

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === renamedProject._id) {
        project.name = renamedProject.name;
      }
      return project;
    }),
    selectedProject: {
      ...state.selectedProject,
      name: renamedProject.name,
    },
  };
};

export const renameProjectFail = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

// DELETE PROJECT
export const deleteProjectClient = (state, action) => {
  const { projectId } = action.payload;

  if (!state.selectedProject || state.selectedProject._id !== projectId) {
    return {
      ...state,
      projects: state.projects.filter((project) => project._id !== projectId),
    };
  }

  return {
    ...state,
    projects: state.projects.filter((project) => project._id !== projectId),
    selectedProject: null,
  };
};

export const deleteProjectBegin = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

export const deleteProjectSuccess = (state, action) => {
  const { deletedProject } = action.payload;

  return {
    ...state,
    projects: state.projects.filter(
      (project) => project._id !== deletedProject._id
    ),
    selectedProject: null,
    loading: false,
  };
};

export const deleteProjectFail = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};
