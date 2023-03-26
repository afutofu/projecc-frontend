import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";

import { createChannel, renameChannel } from "../store/actions";
import { channelModalClose } from "../store/actions";

const modalFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%)
  }
  1%{
    opacity:0;
    transform:translateX(0%);
  }
  100%{
    opacity:1;
    transform: translateX(0%)
  }
`;

const modalFadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0%)
  }
  99%{
    opacity:0;
    transform: translateX(0%)
  }
  100%{
    opacity:0;
    transform: translateX(100%)
  }
`;

const ButtonContainerHeight = "80px";
const horizontalPadding = "25px";

const ChannelAddModalComp = styled.div`
  position: relative;
  color: #ddd;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  transform: translateX(-100%);
  opacity: 0;

  animation: ${(props) =>
      props.modalOpen ? modalFadeIn : props.firstRender ? "none" : modalFadeOut}
    0.5s forwards;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 150;
`;

const ChannelBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 400px;
  background-color: #2b2b2b;
  font-family: "Montserrat", "san-serif";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-bottom: ${ButtonContainerHeight};
  box-sizing: border-box;
  z-index: 200;
  border-radius: 10px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: ${horizontalPadding};
  padding-bottom: 0;
  box-sizing: border-box;
`;

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 22px;
  margin-bottom: 25px;
`;

const Header = styled.h3`
  font-size: 14px;
  text-transform: uppercase;
  margin-bottom: 20px;
  font-weight: 500;
`;

const Input = styled.input.attrs((props) => ({}))`
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
  font-family: "Montserrat", "san-serif";
  margin: 0;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${ButtonContainerHeight};
  background-color: #222;
  border-radius: 0 0 10px 10px;
  padding: ${horizontalPadding};
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  button {
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-family: "Montserrat", "san-serif";
    box-sizing: border-box;
    font-weight: 500;
  }
`;

const CreateButton = styled.button`
  border: none;
  outline: none;
  background-color: #1a8cff;
  color: #ddd;
  margin-right: 20px;

  transition: 0.2s;
  :hover {
    background-color: #0073e6;
  }
`;

const CancelButton = styled.button`
  border: none;
  outline: none;
  background: none;
  color: #ddd;

  :hover {
    text-decoration: underline;
  }
`;

let firstRender = true;
const ChannelAddModal = (props) => {
  const {
    modalOpen,
    modalType,
    modalData,
    createChannel,
    renameChannel,
    channelModalClose,
    selectedProject,
    socket,
  } = props;
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    switch (modalType) {
      case "ADD":
        setChannelName("");
        break;
      case "RENAME":
        setChannelName(modalData.currentChannelName);
        break;
      default:
        setChannelName("");
        break;
    }
  }, [modalType, modalData]);

  if (modalOpen) firstRender = false;

  const onCreateChannel = () => {
    createChannel(channelName, selectedProject._id)
      .then(({ data, projectId }) => {
        // Send channel metadata to server
        socket.emit("createChannel", { data, projectId }, () => {
          setChannelName("");
          channelModalClose();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRenameChannel = () => {
    renameChannel(channelName, modalData.channelId, selectedProject._id)
      .then(({ data, channelId, projectId }) => {
        // Send channel metadata to server
        socket.emit("renameChannel", { data, channelId, projectId }, () => {
          setChannelName("");
          channelModalClose();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderChannelBox = () => {
    switch (modalType) {
      case "ADD":
        return (
          <ChannelBox>
            <Container>
              <Title>create a channel</Title>
              <Header>channel name</Header>
              <Input
                onChange={(e) => setChannelName(e.target.value)}
                value={channelName}
                onKeyPress={(e) => {
                  if (e.key === "Enter") onCreateChannel();
                }}
              />
            </Container>
            <ButtonContainer>
              <CreateButton onClick={() => onCreateChannel()}>
                Create Channel
              </CreateButton>
              <CancelButton onClick={() => channelModalClose()}>
                Cancel
              </CancelButton>
            </ButtonContainer>
          </ChannelBox>
        );
      case "RENAME":
        return (
          <ChannelBox>
            <Container>
              <Title>rename channel</Title>
              <Header>new channel name</Header>
              <Input
                onChange={(e) => setChannelName(e.target.value)}
                value={channelName}
                onKeyPress={(e) => {
                  if (e.key === "Enter") onRenameChannel();
                }}
              />
            </Container>
            <ButtonContainer>
              <CreateButton onClick={() => onRenameChannel()}>
                Rename Channel
              </CreateButton>
              <CancelButton onClick={() => channelModalClose()}>
                Cancel
              </CancelButton>
            </ButtonContainer>
          </ChannelBox>
        );
      default:
        return null;
    }
  };

  return (
    <ChannelAddModalComp modalOpen={modalOpen} firstRender={firstRender}>
      <Backdrop onClick={() => channelModalClose()} />
      {renderChannelBox()}
    </ChannelAddModalComp>
  );
};

const mapStateToProps = (state) => {
  return {
    modalOpen: state.modal.channelModalOpen,
    modalType: state.modal.channelModalType,
    modalData: state.modal.modalData,
    selectedProject: state.project.selectedProject,
    socket: state.socket.socket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createChannel: (channel, project) =>
      dispatch(createChannel(channel, project)),
    renameChannel: (newChannelName, channelId, projectId) =>
      dispatch(renameChannel(newChannelName, channelId, projectId)),
    channelModalClose: () => dispatch(channelModalClose()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelAddModal);
