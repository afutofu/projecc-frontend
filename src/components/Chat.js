import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Messages from "./Messages";
import {
  createMessage,
  createMessageClient,
  deleteMessage,
  deleteMessageClient,
  createDirectMessage,
  deleteDirectMessage,
} from "../store/actions";
import { fetchUserData } from "../shared/utils";

const ChatComp = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: "Raleway", "san-serif";
  display: flex;
  flex-direction: column;
`;

const ChatPrefix = styled.span`
  :before {
    content: "~";
  }
  width: 15px;
  color: #555;
  font-size: 25px;
  padding-right: 8px;
  font-weight: 700;
`;

const FriendPrefix = styled.span`
  width: 30px;
  color: #555;
  font-size: 25px;
  padding-right: 5px;
  font-weight: 700;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #1b1b1b;
  color: #ddd;
  padding: 10px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  font-family: "Montserrat", "san-serif";
  font-weight: 600;
  font-size: 16px;
  cursor: default;
  position: relative;
  background-color: #2b2b2b;
  z-index: 100;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 50px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form.attrs((props) => {
  return {
    onSubmit: props.onSubmit,
  };
})`
  position: relative;
  width: 100%;
  bottom: 0;
  margin: 0;
  padding: 0 20px;
  box-sizing: border-box;
`;

const Input = styled.input.attrs((props) => {
  return {
    placeholder: props.placeholder,
    disabled: props.isGuest,
  };
})`
  position: relative;
  width: 100%;
  height: 45px;
  padding: 10px 20px;
  border-radius: 10px;
  color: white;
  background-color: #333;
  outline: none;
  border: none;
  box-sizing: border-box;
  font-size: 14px;
  font-family: "Raleway", "san-serif";
  margin: 0;
`;

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const [messageDM, setMessageDM] = useState("");
  const [member, setMember] = useState({});
  const {
    selectedProject,
    selectedChannel,
    username,
    userId,
    directMessageId,
    directMessage,
    fetchUserData,
    createMessage,
    deleteMessage,
    createDirectMessage,
    deleteDirectMessage,
    socket,
    chatType,
    user,
  } = props;

  // If chat is in direct messages, fetch user data (name)
  useEffect(() => {
    if (chatType === "dm" && directMessage) {
      fetchMember();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directMessageId]);

  const fetchMember = () => {
    let memberTemp = {};

    setMember(memberTemp);

    // Get all members excluding the user
    const memberIds = directMessage.members.filter((member) => {
      if (member !== userId) return member;
      return null;
    });

    // Get the first member in the memberIds array
    const memberId = memberIds[0];

    // Get user data for member
    fetchUserData(memberId)
      .then((member) => {
        setMember(member);
      })
      .catch(() => {
        return null;
      });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();

    if (chatType === "dm") {
      if (messageDM) {
        // Clear input so there is no wait for API requests
        const text = messageDM;
        setMessageDM("");
        createDirectMessage({
          directMessageId,
          userId,
          username,
          text,
        })
          .then(({ message, directMessageId }) => {
            // Send message to server
            socket.emit(
              "sendDirectMessage",
              { message, directMessageId, clientId: member._id },
              () => {}
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      if (message) {
        // Clear input so there is no wait for API requests
        const text = message;
        setMessage("");
        createMessage(
          {
            text,
            username,
            userId,
          },
          selectedChannel._id,
          selectedProject._id
        )
          .then(({ data, channelId, projectId }) => {
            // Send message to server
            socket.emit(
              "sendMessage",
              { data, channelId, projectId },
              () => {}
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const onDeleteMessage = (messageId, channelId, projectId) => {
    deleteMessage(messageId, channelId, projectId)
      .then(({ data, channelId, projectId }) => {
        socket.emit("deleteMessage", { data, channelId, projectId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDeleteDirectMessage = (messageId) => {
    deleteDirectMessage({
      directMessageId,
      messageId,
    })
      .then(({ directMessageId, messageId }) => {
        socket.emit("deleteDirectMessage", {
          directMessageId,
          messageId,
          clientId: member._id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (chatType === "dm") {
    return (
      <ChatComp>
        <Header>
          <FriendPrefix>-</FriendPrefix>
          {member.name}
        </Header>
        <Container>
          <Messages
            chatType={chatType}
            messages={directMessage && directMessage.messages}
            deleteMessage={(messageId) => onDeleteDirectMessage(messageId)}
            fetchUserData={fetchUserData}
          />
          <Form onSubmit={onMessageSubmit}>
            <Input
              onChange={(e) => setMessageDM(e.target.value)}
              value={messageDM}
              placeholder={`Message ${member.name}`}
            />
          </Form>
        </Container>
      </ChatComp>
    );
  }

  return (
    <ChatComp>
      <Header>
        <ChatPrefix />
        {selectedChannel.name}
      </Header>
      <Container>
        <Messages
          messages={selectedChannel.messages}
          channelId={selectedChannel._id}
          projectId={selectedProject._id}
          deleteMessage={onDeleteMessage}
        />
        <Form onSubmit={onMessageSubmit}>
          <Input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder={
              user.isGuest == null
                ? `Message ~${selectedChannel.name}`
                : "Guests cannot send messages"
            }
            isGuest={user.isGuest == null ? false : true}
          />
        </Form>
      </Container>
    </ChatComp>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.auth.user.name,
    userId: state.auth.user._id,
    directMessages: state.directMessage.directMessages,
    socket: state.socket.socket,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createMessage: (message, channelId, projectId) =>
      dispatch(createMessage(message, channelId, projectId)),
    createMessageClient: (message, channelId, projectId) =>
      dispatch(createMessageClient(message, channelId, projectId)),
    deleteMessage: (messageId, channelId, projectId) =>
      dispatch(deleteMessage(messageId, channelId, projectId)),
    deleteMessageClient: (updatedChannel, channelId, projectId) =>
      dispatch(deleteMessageClient(updatedChannel, channelId, projectId)),
    createDirectMessage: ({ directMessageId, userId, username, text }) =>
      dispatch(
        createDirectMessage({ directMessageId, userId, username, text })
      ),
    deleteDirectMessage: ({ directMessageId, messageId }) =>
      dispatch(deleteDirectMessage({ directMessageId, messageId })),
    fetchUserData: (userId) => dispatch(fetchUserData(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
