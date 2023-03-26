import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import ChannelItem from "./ChannelItem";
import { channelModalOpen } from "../store/actions/modal";

const ChannelBarComp = styled.div``;

const Container = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  padding: 10px 10px;
  box-sizing: border-box;
`;

const AddChannelButton = styled.button`
  position: absolute;
  width: 100%;
  height: 40px;
  bottom: 0;
  background: #252525;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;
  border: none;
  box-sizing: border-box;
  padding-top: 5px;
  cursor: pointer;

  i {
    color: #888;
    font-size: 16px;
    transition: 0.2s;
  }

  :hover i {
    color: #ddd;
  }
`;

const ContentBar = (props) => {
  const { channelModalOpen, selectedProject, channels, selectedChannel, user } =
    props;

  return (
    <ChannelBarComp>
      <Container>
        {channels.map((channel) => {
          return (
            <ChannelItem
              key={channel._id}
              _id={channel._id}
              name={channel.name}
              projectName={selectedProject.name}
              project={selectedProject}
              selected={channel._id === selectedChannel._id ? true : false}
              user={user}
            />
          );
        })}
      </Container>
      <AddChannelButton
        onClick={() => {
          // If the user is a guest, do not open modal
          if (user.isGuest) {
            return;
          }

          channelModalOpen("ADD");
        }}
      >
        <i className="fa fa-plus"></i>
      </AddChannelButton>
    </ChannelBarComp>
  );
};

const mapStateToProps = (state) => {
  const { selectedProject } = state.project;

  if (selectedProject) {
    return {
      selectedProject: selectedProject,
      channels: selectedProject.channels,
      selectedChannel: selectedProject.selectedChannel,
      user: state.auth.user,
    };
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    channelModalOpen: (modalType) => dispatch(channelModalOpen(modalType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentBar);
