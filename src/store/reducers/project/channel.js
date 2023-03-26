// SET SELECTED CHANNEL
export const setSelectedChannel = (state, action) => {
  const projectId = action.payload.projectId;
  const newSelectedChannelId = action.payload.channelId;

  let newSelectedProject = {
    ...state.selectedProject,
  };

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === projectId) {
        project.channels.forEach((channel) => {
          if (channel._id === newSelectedChannelId) {
            project.selectedChannel = channel;
          }
        });
        newSelectedProject = {
          ...project,
        };
      }
      return project;
    }),
    selectedProject: newSelectedProject,
  };
};

// CREATE CHANNEL
export const createChannelClient = (state, action) => {
  const { newChannel, projectId } = action.payload;

  // If client not in same project as new channel
  if (!state.selectedProject || state.selectedProject._id !== projectId) {
    return {
      ...state,
      projects: state.projects.map((project) => {
        if (project._id === projectId) {
          project.channels.push(newChannel);
        }
        return project;
      }),
    };
  }

  // If client in same project as new channel
  let newChannels = [...state.selectedProject.channels];

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === projectId) {
        newChannels.push(newChannel);
        return {
          ...project,
          channels: newChannels,
        };
      }
      return project;
    }),
    selectedProject: {
      ...state.selectedProject,
      channels: newChannels,
    },
  };
};

export const createChannelBegin = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

export const createChannelSuccess = (state, action) => {
  const createdChannel = action.payload.channel;
  const projectId = action.payload.projectId;

  if (state.selectedProject._id === projectId) {
    let newChannels = [...state.selectedProject.channels];
    return {
      ...state,
      projects: state.projects.map((project) => {
        if (project._id === projectId) {
          project.channels.push(createdChannel);
          newChannels = project.channels;
          project.selectedChannel = createdChannel;
          return {
            ...project,
            channels: newChannels,
            selectedChannel: createdChannel,
          };
        }
        return project;
      }),
      selectedProject: {
        ...state.selectedProject,
        channels: newChannels,
        selectedChannel: createdChannel,
      },
      loading: false,
    };
  }

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === projectId) {
        project.channels.push(createdChannel);
        project.selectedChannel = createdChannel;
      }
      return project;
    }),
    loading: false,
  };
};

export const createChannelFail = (state, action) => {
  return {
    ...state,
    error: action.payload.err,
    loading: false,
  };
};

// RENAME CHANNEL
export const renameChannelClient = (state, action) => {
  const { renamedChannel, channelId, projectId } = action.payload;

  // If client not in same project as deleted channel
  if (!state.selectedProject || state.selectedProject._id !== projectId) {
    return {
      ...state,
      projects: state.projects.map((project) => {
        if (project._id === projectId) {
          project.channels = project.channels.map((channel) => {
            if (channel._id === channelId) {
              return renamedChannel;
            }
            return channel;
          });
          return project;
        }
        return project;
      }),
    };
  }

  // If client in same project as renamed channel
  let newChannels = [];
  let newSelectedChannel = null;

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === projectId) {
        newChannels = project.channels.map((channel) => {
          if (channel._id === channelId) {
            return renamedChannel;
          }
          return channel;
        });
        if (project.selectedChannel._id === channelId) {
          // If client selected channel is same as renamed channel, new selected channel will be the renamed channel
          newSelectedChannel = renamedChannel;
        } else {
          // If client selected channel is not the same as renamed channel, new selected channel will be the same as old selected channel
          newSelectedChannel = project.selectedChannel;
        }

        project.channels = newChannels;
        project.selectedChannel = newSelectedChannel;
      }
      return project;
    }),
    selectedProject: {
      ...state.selectedProject,
      channels: newChannels,
      selectedChannel: newSelectedChannel,
    },
  };
};

export const renameChannelBegin = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

export const renameChannelSuccess = (state, action) => {
  const { renamedChannel, channelId, projectId } = action.payload;

  let newChannels = [];
  let newSelectedChannel = null;

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === projectId) {
        newChannels = project.channels.map((channel) => {
          if (channel._id === channelId) {
            return renamedChannel;
          }
          return channel;
        });
        if (project.selectedChannel._id === channelId) {
          // If client selected channel is same as renamed channel, new selected channel will be the renamed channel
          newSelectedChannel = renamedChannel;
        } else {
          // If client selected channel is not the same as renamed channel, new selected channel will be the same as old selected channel
          newSelectedChannel = project.selectedChannel;
        }

        project.channels = newChannels;
        project.selectedChannel = newSelectedChannel;
      }
      return project;
    }),
    selectedProject: {
      ...state.selectedProject,
      channels: newChannels,
      selectedChannel: newSelectedChannel,
    },
  };
};

export const renameChannelFail = (state, action) => {
  return {
    ...state,
    error: action.payload.err,
    loading: false,
  };
};

// DELETE CHANNEL
export const deleteChannelClient = (state, action) => {
  const { channelId, projectId } = action.payload;

  // If client not in same project as deleted channel
  if (!state.selectedProject || state.selectedProject._id !== projectId) {
    return {
      ...state,
      projects: state.projects.map((project) => {
        if (project._id === projectId) {
          project.channels = project.channels.filter(
            (channel) => channel._id !== channelId
          );
        }
        return project;
      }),
    };
  }

  // If client in same project as deleted channel
  let newChannels = [];
  let newSelectedChannel = null;

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === projectId) {
        newChannels = project.channels.filter(
          (channel) => channel._id !== channelId
        );
        if (
          project.selectedChannel._id === channelId &&
          newChannels.length > 0
        ) {
          // If client selected channel is same as deleted channel, new selected channel will be the first channel in the project
          newSelectedChannel = newChannels[0];
        } else if (project.selectedChannel._id === channelId) {
          // If client selected channel is same as deleted channel but there is no channels in the project, new selected channel will be null
          newSelectedChannel = null;
        } else {
          // If client selected channel is not the same as deleted channel, new selected channel will be the same as old selected channel
          newSelectedChannel = project.selectedChannel;
        }

        project.channels = newChannels;
        project.selectedChannel = newSelectedChannel;
      }
      return project;
    }),
    selectedProject: {
      ...state.selectedProject,
      channels: newChannels,
      selectedChannel: newSelectedChannel,
    },
  };
};

export const deleteChannelBegin = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

export const deleteChannelSuccess = (state, action) => {
  const updatedProject = action.payload.updatedProject;

  let newProject = {
    ...updatedProject,
    selectedChannel:
      state.selectedProject.channels.length > 0
        ? state.selectedProject.channels[0]
        : null,
  };

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === updatedProject._id) {
        // Replace the current project with the updated project without the deleted channel
        project = {
          ...newProject,
        };
      }
      return project;
    }),
    selectedProject: {
      ...newProject,
    },
    loading: false,
  };
};

export const deleteChannelFail = (state, action) => {
  return {
    ...state,
    error: action.payload.err,
    loading: false,
  };
};
