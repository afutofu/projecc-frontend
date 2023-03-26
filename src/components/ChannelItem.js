import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import {
  setSelectedChannel,
  deleteChannel,
  channelModalOpen,
} from "../store/actions";

const ChannelItemComp = styled.div`
  width: 100%;
  height: 35px;
  font-family: "Montserrat", "san-serif";
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  border-radius: 5px;
  margin-bottom: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => (props.selected ? "#333" : "none")};
  cursor: pointer;

  transition: 0.1s;
  :hover {
    background-color: ${(props) => (props.selected ? "#333" : "#2d2d2d")};
  }
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

const ItemName = styled.h3`
  font-size: 14px;
  color: ${(props) => (props.selected ? "#ddd" : "#888")};
  margin: 0;
  font-weight: 600;

  transition: 0.1s;
  ${ChannelItemComp}:hover & {
    color: ${(props) => (props.selected ? "#ddd" : "#bbb")};
  }
`;

const ItemContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Buttons = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  opacity: 0;

  transition: 0.2s;
  ${ChannelItemComp}:hover & {
    transition: 0.5s;
    opacity: 1;
  }
`;

const Button = styled.div`
  transition: 0.2s;
  padding: 5px;

  i {
    transition: 0.3s;
  }

  :hover i {
    color: ${(props) => (props.color === "red" ? "red" : "#1a8cff")};
  }
`;

const ChannelItem = (props) => {
  const {
    setSelectedChannel,
    deleteChannel,
    channelModalOpen,
    selected,
    name,
    project,
    _id,
    socket,
    user,
  } = props;

  const onDeleteChannel = (e) => {
    e.stopPropagation();
    deleteChannel(_id, project._id)
      .then(({ channelId, projectId }) => {
        socket.emit("deleteChannel", { channelId, projectId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRenameChannel = (e) => {
    e.stopPropagation();
    channelModalOpen("RENAME", { currentChannelName: name, channelId: _id });
  };

  return (
    <ChannelItemComp
      onClick={() => setSelectedChannel(_id, project._id)}
      selected={selected}
    >
      <ItemContainer>
        <ChatPrefix />
        <ItemName selected={selected}>{name}</ItemName>
      </ItemContainer>

      {user.isGuest == null && (
        <Buttons>
          <Button onClick={(e) => onRenameChannel(e)}>
            <i className="fa fa-pencil"></i>
          </Button>
          <Button onClick={(e) => onDeleteChannel(e)} color="red">
            <i className="fa fa-times"></i>
          </Button>
        </Buttons>
      )}
    </ChannelItemComp>
  );
};

const mapStateToProps = (state) => {
  return {
    socket: state.socket.socket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedChannel: (channel, project) =>
      dispatch(setSelectedChannel(channel, project)),
    deleteChannel: (channel, projectName) =>
      dispatch(deleteChannel(channel, projectName)),
    channelModalOpen: (modalType, data) =>
      dispatch(channelModalOpen(modalType, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelItem);
