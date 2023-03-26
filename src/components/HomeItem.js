import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const HomeItemComp = styled.div`
  width: 100%;
  height: 45px;
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

const Icon = styled.div`
  width: ${(props) => (props.friend ? "30px" : "45px")};
  color: ${(props) => (props.selected ? "#aaa" : "#555")};
  font-size: ${(props) => (props.friend ? "25px" : "20px")};
  padding-right: ${(props) => (props.friend ? "5px" : "15px")};
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  transition: 0.1s;
  ${HomeItemComp}:hover & {
    color: ${(props) => (props.selected ? "#aaa" : "#888")};
  }
`;

const ItemName = styled.h3`
  font-size: 14px;
  color: ${(props) => (props.selected ? "#ddd" : "#888")};
  margin: 0;
  font-weight: 600;

  transition: 0.1s;
  ${HomeItemComp}:hover & {
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
  ${HomeItemComp}:hover & {
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

const HomeItem = (props) => {
  const { id, name, homeItem, setHomeItem, onDeleteDirectMessageGroup } = props;

  const selected = homeItem === id;

  const renderIcon = () => {
    switch (id) {
      case "profile":
        return <i className="fas fa-user"></i>;
      case "schedule":
        return <i className="fas fa-calendar-alt"></i>;
      case "friends":
        return <i className="fas fa-user-friends"></i>;
      default:
        return "-";
    }
  };

  const checkIfFriend = () => {
    if (id !== "profile" && id !== "schedule" && id !== "friends") {
      return true;
    }
    return false;
  };

  const onSetHomeItem = (e) => {
    e.stopPropagation();
    setHomeItem(id);
  };

  const renderButtons = () => {
    return (
      <Buttons>
        <Button onClick={onDeleteDirectMessageGroup} color="red">
          <i className="fa fa-times"></i>
        </Button>
      </Buttons>
    );
  };

  return (
    <HomeItemComp selected={selected} onClick={onSetHomeItem}>
      <ItemContainer>
        <Icon selected={selected} friend={checkIfFriend()}>
          {renderIcon()}
        </Icon>
        <ItemName selected={selected}>{name}</ItemName>
      </ItemContainer>
      {checkIfFriend() && renderButtons()}
    </HomeItemComp>
  );
};

const mapStateToProps = (state) => {
  return {
    homeItem: state.home.homeItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeItem);
