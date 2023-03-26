import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import ProjectBar from "./ProjectBar";
import MainContent from "./MainContent";
import ProjectModal from "./ProjectModal";
import ChannelModal from "./ChannelModal";
import FriendModal from "./FriendModal";

import {
  fetchProjects,
  setSocket,
  sendFriendRequestClient,
  deleteFriendRequestClient,
  addFriendClient,
  deleteFriendClient,
  createDirectMessageGroupClient,
  deleteDirectMessageGroupClient,
  createDirectMessageClient,
  deleteDirectMessageClient,
  createMessageClient,
  deleteMessageClient,
  createChannelClient,
  renameChannelClient,
  deleteChannelClient,
  createProjectClient,
  renameProjectClient,
  deleteProjectClient,
  fetchUser,
} from "../store/actions";

const MainComp = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #1b1b1b;
  color: white;
  display: flex;
  overflow: hidden;
`;

let socket;
const Project = (props) => {
  const ENDPOINT = "http://localhost:5000";
  const [redirect, setRedirect] = useState(false);

  const {
    isAuthenticated,
    fetchUser,
    user,
    fetchProjects,
    setSocket,
    sendFriendRequestClient,
    deleteFriendRequestClient,
    addFriendClient,
    deleteFriendClient,
    createDirectMessageGroupClient,
    deleteDirectMessageGroupClient,
    createDirectMessageClient,
    deleteDirectMessageClient,
    createMessageClient,
    deleteMessageClient,
    createChannelClient,
    renameChannelClient,
    deleteChannelClient,
    createProjectClient,
    renameProjectClient,
    deleteProjectClient,
  } = props;

  useEffect(() => {
    if (isAuthenticated === false) {
      fetchUser().catch(() => {
        setRedirect(true);
      });
    } else {
      socket = io(ENDPOINT, {
        transports: ["websocket", "polling", "flashsocket"],
      });
      setSocket(socket);

      // FRIEND EVENT LISTENERS
      socket.on("friendRequest", ({ type, newRequest, friendId, clientId }) => {
        if (clientId === user._id) {
          // console.log("Friend request from server");
          switch (type) {
            case "CREATE":
              // Store friend request
              sendFriendRequestClient(newRequest);
              break;
            case "DELETE":
              // Delete friend request
              deleteFriendRequestClient(friendId);
              break;
            default:
              return null;
          }
        }
      });

      socket.on("friend", ({ type, friend, clientId }) => {
        if (clientId === user._id) {
          // console.log("Friend from server");
          switch (type) {
            case "CREATE":
              // Store friend
              addFriendClient(friend);
              break;
            case "DELETE":
              // Delete friend
              deleteFriendClient(friend);
              break;
            default:
              return null;
          }
        }
      });

      // DIRECT MESSAGE CLIENT EVENT LISTENERS
      // Listening for direct message groups from server
      socket.on("directMessageGroup", ({ type, directMessage, clientId }) => {
        if (clientId === user._id) {
          // console.log("Direct message group from server");
          switch (type) {
            case "CREATE":
              // Send direct message to redux store
              createDirectMessageGroupClient(directMessage);
              break;
            case "DELETE":
              // Delete direct message in redux store
              deleteDirectMessageGroupClient(directMessage);
              break;
            default:
              return null;
          }
        }
      });

      // Listening for direct messages from server
      socket.on(
        "directMessage",
        ({ type, message, messageId, directMessageId, clientId }) => {
          if (clientId === user._id) {
            // console.log("Direct message from server");
            switch (type) {
              case "CREATE":
                // Send direct message to redux store
                createDirectMessageClient(message, directMessageId);
                break;
              case "DELETE":
                // Delete direct message in redux store
                deleteDirectMessageClient(messageId, directMessageId);
                break;
              default:
                return null;
            }
          }
        }
      );

      fetchProjects()
        .then(() => {
          socket.emit("initSockets");
          // MESSAGE CLIENT EVENT LISTENERS
          // Listening for message from server
          socket.on("message", ({ type, data, channelId, projectId }) => {
            // console.log("Message from server");
            switch (type) {
              case "CREATE":
                // Send message to redux store
                createMessageClient(data, channelId, projectId);
                break;
              case "DELETE":
                // console.log(data.messages);
                // Send updated Project to redux store
                deleteMessageClient(data, channelId, projectId);
                break;
              default:
                return null;
            }
          });

          // CHANNEL CLIENT EVENT LISTENERS
          // Listening for channel from server
          socket.on("channel", ({ type, data, channelId, projectId }) => {
            // console.log("Channel from server");
            switch (type) {
              case "CREATE":
                // Send new channel to store
                // console.log("Create new channel");
                createChannelClient(data, projectId);
                break;
              case "RENAME":
                // Send renamed channel to store
                // console.log("Renamed channel");
                renameChannelClient(data, channelId, projectId);
                break;
              case "DELETE":
                // Send channelId to be deleted to store
                // console.log("Delete channel");
                deleteChannelClient(channelId, projectId);
                break;
              default:
                return null;
            }
          });

          // PROJECT CLIENT EVENT LISTENERS
          // Listening for project from server
          socket.on("project", ({ type, data, projectId }) => {
            // console.log("Project from server");
            switch (type) {
              case "CREATE":
                // Send new project to store
                // console.log("Create new project");
                createProjectClient(data);
                break;
              case "RENAME":
                // Send renamed project to store
                // console.log("Renamed project");
                renameProjectClient(data, projectId);
                break;
              case "DELETE":
                // Send projectId to be deleted to store
                // console.log("Delete project");
                deleteProjectClient(projectId);
                break;
              default:
                return null;
            }
          });
        })
        .catch((err) => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, fetchProjects]);

  const render = () => {
    if (redirect) return <Redirect to="/" />;

    return (
      <MainComp>
        <ProjectModal />
        <ChannelModal />
        <FriendModal />
        <ProjectBar />
        <MainContent />
      </MainComp>
    );
  };

  return render();
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchProjects: () => dispatch(fetchProjects()),
    setSocket: (socket) => dispatch(setSocket(socket)),

    // FRIEND
    sendFriendRequestClient: (newRequest) =>
      dispatch(sendFriendRequestClient(newRequest)),
    deleteFriendRequestClient: (friendId) =>
      dispatch(deleteFriendRequestClient(friendId)),
    addFriendClient: (friend) => dispatch(addFriendClient(friend)),
    deleteFriendClient: (friend) => dispatch(deleteFriendClient(friend)),

    // DIRECT MESSAGE
    createDirectMessageGroupClient: (directMessage) =>
      dispatch(createDirectMessageGroupClient(directMessage)),
    deleteDirectMessageGroupClient: (directMessage) =>
      dispatch(deleteDirectMessageGroupClient(directMessage)),
    createDirectMessageClient: (newMessage, directMessageId) =>
      dispatch(createDirectMessageClient(newMessage, directMessageId)),
    deleteDirectMessageClient: (messageId, directMessageId) =>
      dispatch(deleteDirectMessageClient(messageId, directMessageId)),

    // MESSAGE
    createMessageClient: (newMessage, channelId, projectId) =>
      dispatch(createMessageClient(newMessage, channelId, projectId)),
    deleteMessageClient: (updatedChannel, channelId, projectId) =>
      dispatch(deleteMessageClient(updatedChannel, channelId, projectId)),

    // CHANNEL
    createChannelClient: (newChannel, projectId) =>
      dispatch(createChannelClient(newChannel, projectId)),
    renameChannelClient: (renamedChannel, channelId, projectId) =>
      dispatch(renameChannelClient(renamedChannel, channelId, projectId)),
    deleteChannelClient: (channelId, projectId) =>
      dispatch(deleteChannelClient(channelId, projectId)),

    // PROJECT
    createProjectClient: (newProject) =>
      dispatch(createProjectClient(newProject)),
    renameProjectClient: (renamedProject, projectId) =>
      dispatch(renameProjectClient(renamedProject, projectId)),
    deleteProjectClient: (projectId) =>
      dispatch(deleteProjectClient(projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
