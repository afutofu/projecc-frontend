import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";

import { createProject, renameProject } from "../store/actions";
import { projectModalClose } from "../store/actions";

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

const ProjectModalComp = styled.div`
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

const ProjectBox = styled.div`
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
  const [projectName, setProjectName] = useState("");
  const {
    modalOpen,
    modalType,
    modalData,
    createProject,
    renameProject,
    projectModalClose,
    username,
    socket,
  } = props;

  useEffect(() => {
    switch (modalType) {
      case "ADD":
        setProjectName("");
        break;
      case "RENAME":
        setProjectName(modalData.currentProjectName);
        break;
      default:
        setProjectName("");
        break;
    }
  }, [modalType, modalData]);

  if (modalOpen) firstRender = false;

  const onCreateProject = () => {
    createProject({ name: projectName, creatorName: username })
      .then(({ data }) => {
        socket.emit("createProject", { data }, () => {
          setProjectName("");
          projectModalClose();
        });
      })
      .catch((err) => {
        console.log(err);
        setProjectName("");
      });
  };

  const onRenameProject = () => {
    renameProject({ newName: projectName, projectId: modalData.projectId })
      .then(({ data, projectId }) => {
        socket.emit("renameProject", { data, projectId }, () => {
          setProjectName("");
          projectModalClose();
        });
      })
      .catch((err) => {
        console.log(err);
        setProjectName("");
      });
  };

  const onProjectModalClose = () => {
    setProjectName("");
    projectModalClose();
  };

  const renderProjectBox = () => {
    switch (modalType) {
      case "ADD":
        return (
          <ProjectBox>
            <Container>
              <Title>create a project</Title>
              <Header>project name</Header>
              <Input
                onChange={(e) => setProjectName(e.target.value)}
                value={projectName}
                onKeyPress={(e) => {
                  if (e.key === "Enter") onCreateProject();
                }}
              />
            </Container>
            <ButtonContainer>
              <CreateButton onClick={() => onCreateProject()}>
                Create Project
              </CreateButton>
              <CancelButton onClick={() => onProjectModalClose()}>
                Cancel
              </CancelButton>
            </ButtonContainer>
          </ProjectBox>
        );
      case "RENAME":
        return (
          <ProjectBox>
            <Container>
              <Title>rename project</Title>
              <Header>new project name</Header>
              <Input
                onChange={(e) => setProjectName(e.target.value)}
                value={projectName}
                onKeyPress={(e) => {
                  if (e.key === "Enter") onRenameProject();
                }}
              />
            </Container>
            <ButtonContainer>
              <CreateButton onClick={() => onRenameProject()}>
                Rename Project
              </CreateButton>
              <CancelButton onClick={() => onProjectModalClose()}>
                Cancel
              </CancelButton>
            </ButtonContainer>
          </ProjectBox>
        );
      default:
        return null;
    }
  };

  return (
    <ProjectModalComp modalOpen={modalOpen} firstRender={firstRender}>
      <Backdrop onClick={() => onProjectModalClose()} />
      {renderProjectBox()}
    </ProjectModalComp>
  );
};

const mapStateToProps = (state) => {
  return {
    modalOpen: state.modal.projectModalOpen,
    modalType: state.modal.projectModalType,
    modalData: state.modal.modalData,
    username: state.auth.username,
    socket: state.socket.socket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project)),
    renameProject: (data) => dispatch(renameProject(data)),
    projectModalClose: () => dispatch(projectModalClose()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelAddModal);
