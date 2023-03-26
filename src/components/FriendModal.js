import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";

import { friendModalClose, sendFriendRequest } from "../store/actions";

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

const FriendModalComp = styled.div`
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

const FriendBox = styled.div`
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

const ErrorMessage = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  color: red;
`;

const Input = styled.input.attrs((props) => ({
  placeholder: "Example: 2f059u8gc87bc0353a5b5384",
}))`
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

const AddButton = styled.button`
  border: none;
  outline: none;
  background: ${(props) => (props.success ? "#0eb514" : "#1a8cff")};
  pointer-events: ${(props) => (props.success ? "none" : "auto")};
  color: #ddd;
  margin-right: 20px;

  transition: 0.2s;
  :hover {
    background: ${(props) => (props.success ? "#0eb514" : "#0073e6")};
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
const FriendModal = (props) => {
  const [friendId, setFriendId] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const {
    modalOpen,
    modalType,
    modalData,
    friendModalClose,
    sendFriendRequest,
    user,
    friends,
    requests,
    socket,
  } = props;

  useEffect(() => {
    switch (modalType) {
      case "ADD":
        setFriendId("");
        break;
      default:
        setFriendId("");
        break;
    }
  }, [modalType, modalData]);

  if (modalOpen) firstRender = false;

  const onAddFriend = () => {
    setErrorMsg("");

    // Validation
    let error = false;

    // Check if there is a friend id
    if (!friendId) {
      error = true;
    }

    // Check if sending request to self
    if (!error) {
      if (user._id === friendId) {
        setFriendId("");
        setErrorMsg("You cannot send a friend request to yourself");
        error = true;
      }
    }

    // Check if there is already a request/friend with the same id
    // If already friends
    if (!error) {
      for (let i = 0; i < friends.length; i++) {
        const friend = friends[i];
        if (friend.friendId === friendId) {
          setFriendId("");
          setErrorMsg("You are already friends with this user");
          error = true;
          break;
        }
      }
    }

    // If already requested to be friends
    if (!error) {
      for (let i = 0; i < requests.length; i++) {
        const request = requests[i];
        if (request.senderId === friendId || request.receiverId === friendId) {
          setFriendId("");
          if (request.type === "SENT")
            setErrorMsg("You have already sent a request to this user");
          if (request.type === "RECEIVED")
            setErrorMsg("You already have pending request from this user");
          error = true;
          break;
        }
      }
    }

    if (!error) {
      sendFriendRequest(user._id, friendId)
        .then((newRequest) => {
          socket.emit(
            "sendFriendRequest",
            { newRequest, clientId: friendId },
            () => {
              setSuccess(true);
            }
          );
          setTimeout(() => {
            friendModalClose();
            setSuccess(false);
          }, 1500);
        })
        .catch((error) => {
          setFriendId("");
          setErrorMsg(error);
        });
    }
  };

  const onFriendModalClose = () => {
    setFriendId("");
    setErrorMsg("");
    friendModalClose();
  };

  const renderFriendBox = () => {
    switch (modalType) {
      case "ADD":
        return (
          <FriendBox>
            <Container>
              <Title>add a friend</Title>
              <Header>friend id</Header>
              {errorMsg !== "" && <ErrorMessage>{errorMsg}</ErrorMessage>}
              <Input
                onChange={(e) => setFriendId(e.target.value)}
                value={friendId}
                onKeyPress={(e) => {
                  if (e.key === "Enter") onAddFriend();
                }}
              />
            </Container>
            <ButtonContainer>
              <AddButton onClick={() => onAddFriend()} success={success}>
                {success ? "Friend Request Sent" : "Send Friend Request"}
              </AddButton>
              <CancelButton onClick={() => onFriendModalClose()}>
                Cancel
              </CancelButton>
            </ButtonContainer>
          </FriendBox>
        );
      default:
        return null;
    }
  };

  return (
    <FriendModalComp modalOpen={modalOpen} firstRender={firstRender}>
      <Backdrop onClick={() => onFriendModalClose()} />
      {renderFriendBox()}
    </FriendModalComp>
  );
};

const mapStateToProps = (state) => {
  return {
    modalOpen: state.modal.friendModalOpen,
    modalType: state.modal.friendModalType,
    modalData: state.modal.modalData,
    user: state.auth.user,
    friends: state.friend.friends,
    requests: state.friend.requests,
    socket: state.socket.socket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    friendModalClose: () => dispatch(friendModalClose()),
    sendFriendRequest: (userId, friendId) =>
      dispatch(sendFriendRequest(userId, friendId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendModal);
