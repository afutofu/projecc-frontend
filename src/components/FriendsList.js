import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";

import { fetchUserData } from "../shared/utils";
import {
  deleteFriendRequest,
  addFriend,
  deleteFriend,
  createDirectMessageGroup,
} from "../store/actions";

const fadeIn = keyframes`
from{
  opacity:0;
}
to{
  opacity:1;
}
`;

const FriendsListComp = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease forwards;
`;

const RequestArea = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 16px;
  color: #ddd;
  font-weight: 600;
  text-transform: uppercase;
  margin: 0;
  margin: 10px 0;
  margin-bottom: 10px;
`;

const FriendItem = styled.div`
  width: 100%;
  height: 40px;
  padding: 5px 20px;
  padding-right: 15px;
  background-color: none;
  color: #aaa;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1px;
  font-size: 14px;

  transition: 0.2s;
  :hover {
    background-color: #3d3d3d;
    color: #ddd;
  }
`;

const Info = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Name = styled.span`
  color: #aaa;
  margin-right: 20px;
  font-weight: 500;

  transition: 0.2s;
  ${FriendItem}:hover & {
    color: #ddd;
  }
`;

const Id = styled.span`
  color: #888;

  transition: 0.2s;
  ${FriendItem}:hover & {
    color: #aaa;
  }
`;

const Buttons = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  opacity: 0;
  font-size: 18px;

  transition: 0.2s;
  ${FriendItem}:hover & {
    transition: 0.5s;
    opacity: 1;
  }
`;

const Button = styled.div`
  transition: 0.2s;
  padding: 5px;
  margin-left: 10px;

  i {
    transition: 0.3s;
  }

  :hover i {
    color: ${(props) => (props.color ? props.color : "#1a8cff")};
  }
`;

const FriendsList = (props) => {
  const {
    statusDisplay,
    socket,
    user,
    friends,
    requests,
    fetchUserData,
    deleteFriendRequest,
    addFriend,
    deleteFriend,
    createDirectMessageGroup,
  } = props;

  const [allFriends, setAllFriends] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);

  useEffect(() => {
    if (friends) {
      fetchFriends(friends);
    }
    if (requests) {
      fetchRequests(requests);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friends.length, requests.length]);

  const onAddFriend = (userId, friendId) => {
    addFriend(userId, friendId)
      .then((friend) => {
        socket.emit("addFriend", { friend, clientId: friendId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDeleteFriend = (userId, friendId) => {
    deleteFriend(userId, friendId)
      .then((friend) => {
        socket.emit("deleteFriend", { friend, clientId: friendId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDeleteFriendRequest = (userId, friendId) => {
    deleteFriendRequest(userId, friendId)
      .then(() => {
        // Send current userId to be deleted in the other user's redux store
        // Specify clientId to which user uses the event data
        socket.emit("deleteFriendRequest", {
          friendId: userId,
          clientId: friendId,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onCreateDirectMessageGroup = (userId, friendId) => {
    createDirectMessageGroup(userId, friendId)
      .then((directMessage) => {
        socket.emit("createDirectMessageGroup", {
          directMessage,
          clientId: friendId,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchFriends = (friends) => {
    let friendsArr = [];

    setAllFriends([...friendsArr]);

    friends.forEach((friend, i) => {
      fetchUserData(friend.friendId)
        .then((friend) => {
          friendsArr.unshift(
            <FriendItem key={i}>
              <Info>
                <Name>{friend.name}</Name>
                <Id>{friend._id}</Id>
              </Info>
              <Buttons>
                <Button
                  onClick={() =>
                    onCreateDirectMessageGroup(user._id, friend._id)
                  }
                >
                  <i className="fas fa-comment"></i>
                </Button>
                <Button
                  onClick={() => onDeleteFriend(user._id, friend._id)}
                  color="red"
                >
                  <i className="fa fa-times"></i>
                </Button>
              </Buttons>
            </FriendItem>
          );
          setAllFriends([...friendsArr]);
        })
        .catch(() => {
          return null;
        });
    });
  };

  const fetchRequests = (requests) => {
    let sent = [],
      received = [];

    setSentRequests([...sent]);
    setReceivedRequests([...received]);

    requests.forEach((request, i) => {
      switch (request.type) {
        case "SENT":
          fetchUserData(request.receiverId)
            .then((friend) => {
              sent.unshift(
                <FriendItem key={i}>
                  <Info>
                    <Name>{friend.name}</Name>
                    <Id>{friend._id}</Id>
                  </Info>
                  <Buttons>
                    <Button
                      onClick={() =>
                        onDeleteFriendRequest(user._id, friend._id)
                      }
                      color="red"
                    >
                      <i className="fa fa-times"></i>
                    </Button>
                  </Buttons>
                </FriendItem>
              );
              setSentRequests([...sent]);
            })
            .catch(() => {
              return null;
            });
          break;
        case "RECEIVED":
          fetchUserData(request.senderId)
            .then((friend) => {
              received.unshift(
                <FriendItem key={i}>
                  <Info>
                    <Name>{friend.name}</Name>
                    <Id>{friend._id}</Id>
                  </Info>
                  <Buttons>
                    <Button onClick={() => onAddFriend(user._id, friend._id)}>
                      <i className="fa fa-check"></i>
                    </Button>
                    <Button
                      onClick={() =>
                        onDeleteFriendRequest(user._id, friend._id)
                      }
                      color="red"
                    >
                      <i className="fa fa-times"></i>
                    </Button>
                  </Buttons>
                </FriendItem>
              );
              setReceivedRequests([...received]);
            })
            .catch(() => {
              return null;
            });
          break;
        default:
          return;
      }
    });
  };

  const renderFriends = () => {
    switch (statusDisplay) {
      case "all":
        return allFriends.length > 0 && allFriends;
      case "pending":
        return (
          <React.Fragment>
            <RequestArea>
              {sentRequests.length > 0 && (
                <React.Fragment>
                  <Title>sent</Title>
                  {sentRequests}
                </React.Fragment>
              )}
            </RequestArea>
            <RequestArea>
              {receivedRequests.length > 0 && (
                <React.Fragment>
                  <Title>received</Title>
                  {receivedRequests}
                </React.Fragment>
              )}
            </RequestArea>
          </React.Fragment>
        );

      default:
        return null;
    }
  };

  return <FriendsListComp>{renderFriends()}</FriendsListComp>;
};

const mapStateToProps = (state) => {
  return {
    statusDisplay: state.friend.statusDisplay,
    socket: state.socket.socket,
    user: state.auth.user,
    friends: state.friend.friends,
    requests: state.friend.requests,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserData: (userId) => dispatch(fetchUserData(userId)),
    deleteFriendRequest: (userId, friendId) =>
      dispatch(deleteFriendRequest(userId, friendId)),
    addFriend: (userId, friendId) => dispatch(addFriend(userId, friendId)),
    deleteFriend: (userId, friendId) =>
      dispatch(deleteFriend(userId, friendId)),
    createDirectMessageGroup: (userId, friendId) =>
      dispatch(createDirectMessageGroup(userId, friendId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
