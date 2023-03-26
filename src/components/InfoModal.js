import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";

import { friendModalClose } from "../store/actions";

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

const Input = styled.input.attrs(() => {
  return {
    placeholder: "Example: 2f059u8gc87bc0353a5b5384",
  };
})`
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
const InfoModal = (props) => {
  const { modalOpen, modalType, modalData, friendModalClose } = props;

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

  const onFriendModalClose = () => {
    setFriendId("");
    setErrorMsg("");
    friendModalClose();
  };

  const renderInfoBox = () => {
    return (
      <FriendBox>
        <Container>
          <Title>add a friend</Title>
          <Header>friend id</Header>
        </Container>
        <ButtonContainer>
          <CancelButton onClick={() => onFriendModalClose()}>
            Cancel
          </CancelButton>
        </ButtonContainer>
      </FriendBox>
    );
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    friendModalClose: () => dispatch(friendModalClose()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoModal);
