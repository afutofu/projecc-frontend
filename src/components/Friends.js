import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { setFriendStatusDisplay, friendModalOpen } from "../store/actions";
import FriendsList from "./FriendsList";

const FriendsComp = styled.div`
  width: 100%;
  height: 100%;
  font-family: "Montserrat", "san-serif";
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
`;

const Title = styled.h3`
  font-weight: 600;
  font-size: 16px;
  margin-right: 50px;
`;

const Container = styled.div`
  position: relative;
  height: calc(100% - 50px);
  box-sizing: border-box;
`;

const FriendStatusButton = styled.button`
  padding: 0;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-family: "Montserrat", "san-serif";
  box-sizing: border-box;
  font-weight: 600;
  border: none;
  outline: none;
  color: ${(props) => (props.selected ? "#ddd" : "#777")};
  background: unset;
  margin-right: 40px;

  transition: 0.2s;

  :hover {
    color: ${(props) => (props.selected ? "#ddd" : "#aaa")};
  }
`;

const AddFriendButton = styled.button`
  padding: 7px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-family: "Montserrat", "san-serif";
  box-sizing: border-box;
  font-weight: 600;
  border: none;
  outline: none;
  background-color: #1a8cff;
  color: #ddd;

  transition: 0.2s;
  :hover {
    background-color: #0073e6;
  }
`;

const Friends = (props) => {
  const { friendStatusDisplay, setFriendStatusDisplay, friendModalOpen, user } =
    props;

  return (
    <FriendsComp>
      <Header>
        <Title>Friends</Title>
        <FriendStatusButton
          onClick={() => setFriendStatusDisplay("all")}
          selected={friendStatusDisplay === "all"}
        >
          All
        </FriendStatusButton>
        <FriendStatusButton
          onClick={() => setFriendStatusDisplay("pending")}
          selected={friendStatusDisplay === "pending"}
        >
          Pending
        </FriendStatusButton>
        <AddFriendButton
          onClick={() => {
            // If the user is a guest, do not open modal
            if (user.isGuest) {
              return;
            }

            friendModalOpen("ADD");
          }}
        >
          Add Friend
        </AddFriendButton>
      </Header>
      <Container>
        <FriendsList />
      </Container>
    </FriendsComp>
  );
};

const mapStateToProps = (state) => {
  return {
    friendStatusDisplay: state.friend.statusDisplay,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFriendStatusDisplay: (friendStatusDisplay) =>
      dispatch(setFriendStatusDisplay(friendStatusDisplay)),
    friendModalOpen: (type) => dispatch(friendModalOpen(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
