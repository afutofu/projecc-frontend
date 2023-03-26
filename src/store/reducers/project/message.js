// CREATE MESSAGE
export const createMessageClient = (state, action) => {
  const { newMessage, channelId, projectId } = action.payload;

  if (!state.selectedProject) {
    return {
      ...state,
      projects: state.projects.map((project) => {
        if (project._id === projectId) {
          project.channels.map((channel) => {
            if (channel._id === channelId) {
              channel.messages.push(newMessage);
            }
            return channel;
          });
        }
        return project;
      }),
      loading: false,
    };
  }

  const sameProject = projectId === state.selectedProject._id;

  let newSelectedProject = {
    ...state.selectedProject,
  };

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === projectId) {
        project.channels.map((channel) => {
          if (channel._id === channelId) {
            channel.messages.push(newMessage);
          }
          return channel;
        });
        if (sameProject) {
          newSelectedProject = project;
        }
      }
      return project;
    }),
    loading: false,
    selectedProject: { ...newSelectedProject },
  };
};

export const createMessageBegin = (state, action) => {
  const { initialNewMessage, channelId, projectId } = action.payload;

  let newSelectedProject = {
    ...state.selectedProject,
  };

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === projectId) {
        project.channels = project.channels.map((channel) => {
          if (channel._id === channelId) {
            channel.messages.push(initialNewMessage);
          }
          return channel;
        });
        newSelectedProject = project;
      }
      return project;
    }),
    loading: true,
    selectedProject: {
      ...newSelectedProject,
    },
  };
};

export const createMessageSuccess = (state, action) => {
  const { newMessage, channelId, projectId, initialId } = action.payload;

  let newSelectedProject = {
    ...state.selectedProject,
  };

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === projectId) {
        project.channels = project.channels.map((channel) => {
          if (channel._id === channelId) {
            //channel.messages.push(newMessage);
            for (let i = channel.messages.length - 1; i > 0; i--) {
              if (channel.messages[i].initialId === initialId) {
                channel.messages[i] = {
                  ...newMessage,
                };
              }
            }
          }
          return channel;
        });
        newSelectedProject = project;
      }
      return project;
    }),
    loading: false,
    selectedProject: {
      ...newSelectedProject,
    },
  };
};

export const createMessageFail = (state, action) => {
  const { channelId, projectId, initialId } = action.payload;

  if (!state.selectedProject) {
    return {
      ...state,
      error: action.payload.err,
      projects: state.projects.map((project) => {
        if (project._id === projectId) {
          project.channels = project.channels.map((channel) => {
            if (channel._id === channelId) {
              channel.messages = channel.messages.filter((message) => {
                if (message.initialId !== action.payload.initialId)
                  return message;
                return null;
              });
            }
            return channel;
          });

          if (project.selectedChannel._id === channelId) {
            project.selectedChannel = project.selectedChannel.messages.filter(
              (message) => {
                if (message.initialId !== initialId) return message;
                return null;
              }
            );
          }
        }
        return project;
      }),
      loading: false,
    };
  }
};

// DELETE MESSAGE
export const deleteMessageClient = (state, action) => {
  const { updatedChannel, channelId, projectId } = action.payload;

  if (!state.selectedProject) {
    return {
      ...state,
      projects: state.projects.map((project) => {
        if (project._id === projectId) {
          project.channels = project.channels.map((channel) => {
            if (channel._id === channelId) {
              return { ...updatedChannel };
            }
            return channel;
          });

          if (project.selectedChannel._id === channelId) {
            project.selectedChannel = { ...updatedChannel };
          }
        }
        return project;
      }),
      loading: false,
    };
  }

  const sameChannel = channelId === state.selectedProject.selectedChannel._id;

  let newSelectedProject = {
    ...state.selectedProject,
  };

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === projectId) {
        project.channels = project.channels.map((channel) => {
          if (channel._id === channelId) {
            return { ...updatedChannel };
          }
          return channel;
        });
        if (sameChannel) {
          project.selectedChannel = { ...updatedChannel };
          newSelectedProject = project;
        }
      }
      return project;
    }),
    loading: false,
    selectedProject: {
      ...newSelectedProject,
    },
  };
};

export const deleteMessageBegin = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

export const deleteMessageSuccess = (state, action) => {
  const { updatedChannel, channelId, projectId } = action.payload;

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === projectId) {
        project.channels = project.channels.map((channel) => {
          if (channel._id === channelId) {
            return { ...updatedChannel };
          }
          return channel;
        });

        if (project.selectedChannel._id === channelId) {
          project.selectedChannel = { ...updatedChannel };
        }
      }
      return project;
    }),
    selectedProject: {
      ...state.selectedProject,
      selectedChannel: {
        ...updatedChannel,
      },
    },
    loading: false,
  };
};

export const deleteMessageFail = (state, action) => {
  return {
    ...state,
    error: action.payload.err,
    loading: false,
  };
};
