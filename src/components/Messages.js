import React from "react";
import styled from "styled-components";

import Message from "./Message";

const MessagesComp = styled.div`
  position: relative;
  height: calc(100% - 65px);
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  padding: 0 20px;
  margin: 0;
  box-sizing: border-box;
  overflow-y: auto;
`;

const TopSpace = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Messages = (props) => {
  const {
    chatType,
    messages,
    channelId,
    projectId,
    deleteMessage,
    fetchUserData,
  } = props;
  let newMessages = [];

  if (messages !== undefined) {
    messages.forEach((message) => {
      newMessages.unshift(message);
    });
  }

  if (chatType === "dm") {
    return (
      <MessagesComp>
        {newMessages.map((message, i) => {
          return (
            <Message
              key={i}
              chatType={chatType}
              message={message}
              deleteMessage={(messageId) => deleteMessage(messageId)}
              fetchUserData={fetchUserData}
            />
          );
        })}
        <TopSpace />
      </MessagesComp>
    );
  }

  return (
    <MessagesComp>
      {newMessages.map((message, i) => {
        return (
          <Message
            key={i}
            message={message}
            channelId={channelId}
            projectId={projectId}
            deleteMessage={deleteMessage}
          />
        );
      })}
      <TopSpace />
    </MessagesComp>
  );
};

export default Messages;
