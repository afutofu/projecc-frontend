import React from "react";
import styled from "styled-components";

const MessageComp = styled.div`
  display: relative;
  width: 100%;
  background-color: none;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: "Montserrat", "san-serif";
  margin-bottom: 25px;
  box-sizing: border-box;
`;

const AvatarDisplay = styled.div`
  flex: 0;
  position: relative;
  min-width: 50px;
  min-height: 50px;
  border-radius: 50%;
  background-color: #1a1a1a;
  margin: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  box-sizing: border-box;
  margin-top: 5px;
  margin-right: 14px;

  :focus {
    border: #1a8cff 1px solid;
  }
`;

const Text = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
`;

const TopRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  box-sizing: border-box;
`;

const NameDate = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: yellow;
  margin: 0;
  margin-right: 10px;
`;

const DateComp = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
`;

const MessageContainer = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  padding-right: 20px;
  box-sizing: border-box;
`;

const MessageText = styled.p`
  font-size: 14px;
  color: ${({ isInitial }) => (isInitial ? "#aaa" : "#ddd")};
  margin: 0;
  /* word-break: break-all; */
  line-height: 24px;
`;

const Buttons = styled.div`
  position: absolute;
  right: 0;
  /* width: 20%; */
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  opacity: 0;
  box-sizing: border-box;

  transition: 0.2s;
  ${MessageComp}:hover & {
    transition: 0.5s;
    opacity: 1;
  }
`;

const Button = styled.div`
  transition: 0.2s;
  padding: 5px;
  cursor: pointer;

  i {
    transition: 0.3s;
    font-size: 18px;
  }

  :hover i {
    color: red;
  }
`;

const Message = (props) => {
  const { chatType, message, channelId, projectId, deleteMessage } = props;
  const { initialId, _id, username, date, text } = message;

  // // If chat is in direct messages, fetch user data (name)
  // useEffect(() => {
  //   if (chatType == "dm") {
  //     fetchMemberName();
  //   }
  // }, []);

  // // If chat is changed, reset

  // const fetchMemberName = () => {
  //   let memberNameTemp = "";

  //   setMemberName(memberNameTemp);

  //   // Get user data for member
  //   fetchUserData(userId)
  //     .then((member) => {
  //       setMemberName(member.name);
  //     })
  //     .catch(() => {
  //       return null;
  //     });
  // };

  if (chatType === "dm") {
    return (
      <MessageComp>
        <AvatarDisplay>{username.substring(0, 1)}</AvatarDisplay>
        <Text>
          <TopRow>
            <NameDate>
              <Name>{username}</Name>
              <DateComp>{date && date}</DateComp>
            </NameDate>
            <Buttons>
              <Button onClick={() => deleteMessage(_id)}>
                <i className="fa fa-times"></i>
              </Button>
            </Buttons>
          </TopRow>
          <MessageContainer>
            <MessageText isInitial={initialId != null}>{text}</MessageText>
          </MessageContainer>
        </Text>
      </MessageComp>
    );
  }

  return (
    <MessageComp>
      <AvatarDisplay>{username.substring(0, 1)}</AvatarDisplay>
      <Text>
        <TopRow>
          <NameDate>
            <Name>{username}</Name>
            <DateComp>{date && date}</DateComp>
          </NameDate>
          <Buttons>
            <Button onClick={() => deleteMessage(_id, channelId, projectId)}>
              <i className="fa fa-times"></i>
            </Button>
          </Buttons>
        </TopRow>
        <MessageContainer>
          <MessageText isInitial={initialId != null}>{text}</MessageText>
        </MessageContainer>
      </Text>
    </MessageComp>
  );
};

export default Message;
