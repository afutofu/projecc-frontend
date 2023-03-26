import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import ContentBar from "./ContentBar";
import Content from "./Content";

const MainContentComp = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
`;

const ProjectContent = ({ selectedProject }) => {
  return (
    <MainContentComp>
      <ContentBar selectedProject={selectedProject} />
      <Content selectedProject={selectedProject} />
    </MainContentComp>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedProject: state.project.selectedProject,
  };
};

export default connect(mapStateToProps)(ProjectContent);
