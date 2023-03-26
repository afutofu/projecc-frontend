import React from "react";
import styled from "styled-components";

const ProjectItemComp = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  background-color: ${(props) => (props.selected ? "#ccc" : "#444")};
  color: white;
  border-radius: ${(props) => (props.selected ? "30%" : "50%")};
  box-sizing: border-box;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;

  transition: 0.2s;
  :hover {
    border-radius: 30%;
    background-color: #ccc;
  }
`;

const ProjectItem = (props) => {
  const { setSelectedProject, project, selected } = props;

  if (project === null) {
    return (
      <ProjectItemComp
        selected={selected}
        onClick={() => setSelectedProject(null)}
      ></ProjectItemComp>
    );
  }

  return (
    <ProjectItemComp
      selected={selected}
      onClick={() => setSelectedProject(project._id)}
    >
      {project && project.name.substring(0, 1)}
    </ProjectItemComp>
  );
};

export default ProjectItem;
