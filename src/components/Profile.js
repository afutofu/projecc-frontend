import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { logout } from "../store/actions";

const ProfileComp = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  box-sizing: border-box;
`;

const AvatarDisplay = styled.div`
  position: relative;
  min-width: 150px;
  min-height: 150px;
  border-radius: 50%;
  background-color: #1a1a1a;
  margin-bottom: 30px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-size: 45px;
  font-weight: 700;
  text-transform: uppercase;

  :focus {
    border: #1a8cff 1px solid;
  }
`;

// const AvatarImage = styled.img.attrs((props) => ({
//   src: props.src && props.src,
// }))`
//   display: ${(props) => (props.src ? "block" : "none")};
//   width: 100%;
//   height: 100%;
//   border-radius: 50%;
//   background: none;
//   outline: none;
//   border: 0;
// `;

const UserDisplay = styled.h1`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 8px;
  color: #ddd;
  padding: 7px;
  border: rgba(0, 0, 0, 0) 1px solid;
  box-sizing: border-box;
`;

const EmailDisplay = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 15px;
  color: #ddd;
  padding: 7px;
  border: rgba(0, 0, 0, 0) 1px solid;
  box-sizing: border-box;
`;

const GuestDisplay = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 15px;
  color: #ddd;
  padding: 7px;
  border: rgba(0, 0, 0, 0) 1px solid;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  * {
    margin: 0;
  }

  h3 {
    margin-bottom: 8px;
  }

  p {
    margin-bottom: 5px;
  }
`;

const IdDisplay = styled.p`
  font-size: 14px;
  color: #888;
  margin: 0;
  margin-bottom: 20px;
  font-family: "Montserrat", sans-serif;
`;

// const FileInput = styled.input.attrs((props) => ({
//   type: "file",
// }))`
//   display: none;
//   border: none;
// `;

// const AvatarEdit = styled.div`
//   position: absolute;
//   width: 150px;
//   height: 150px;
//   border-radius: 50%;
//   margin-bottom: 30px;
//   background-color: rgba(0, 0, 0, 0.5);
//   opacity: 0;
//   cursor: pointer;

//   display: flex;
//   justify-content: center;
//   align-items: center;

//   color: #ddd;
//   font-size: 12px;
//   text-transform: uppercase;
//   font-weight: 700;

//   transition: opacity 0.2s;
//   :hover {
//     opacity: 1;
//   }
// `;

// const UserEdit = styled.input.attrs((props) => ({
//   placeholder: props.placeholder,
//   value: props.value,
//   spellCheck: "false",
//   type: "text",
// }))`
//   width: 100%;
//   max-width: 400px;
//   text-align: center;
//   font-size: 18px;
//   font-weight: 500;
//   margin: 0;
//   margin-bottom: 8px;
//   background-color: #222;
//   color: #ddd;
//   padding: 7px;
//   box-sizing: border-box;
//   outline: unset;
//   border: #222 1px solid;
//   border-radius: 4px;
//   font-family: "Montserrat", sans-serif;

//   :focus {
//     border: #1a8cff 1px solid;
//   }
// `;

// const EmailEdit = styled.input.attrs((props) => ({
//   placeholder: props.placeholder,
//   value: props.value,
//   spellCheck: "false",
//   type: "text",
// }))`
//   width: 100%;
//   max-width: 400px;
//   text-align: center;
//   font-size: 18px;
//   font-weight: 500;
//   margin: 0;
//   margin-bottom: 15px;
//   background-color: #222;
//   color: #ddd;
//   padding: 7px;
//   box-sizing: border-box;
//   outline: unset;
//   border: #222 1px solid;
//   border-radius: 4px;
//   font-family: "Montserrat", sans-serif;

//   :focus {
//     border: #1a8cff 1px solid;
//   }
// `;

// const Button = styled.button`
//   width: 200px;
//   height: 45px;
//   margin-bottom: 20px;
//   padding-left: 10px;
//   text-transform: uppercase;
//   /* font-family: "Montserrat", sans-serif; */
//   font-weight: 700;
//   color: white;
//   background: #1a8cff;
//   border: none;
//   border-radius: 4px;
//   outline: none;
//   cursor: pointer;

//   transition: background-color 0.25s;
//   :hover {
//     background: #0073e6;
//   }

//   a {
//     color: white;
//     all: unset;
//   }
// `;

// const CancelButton = styled.p`
//   border: none;
//   outline: none;
//   background: none;
//   color: #ddd;
//   margin: 0;
//   margin-bottom: 20px;
//   font-family: "Montserrat", sans-serif;
//   font-size: 14px;
//   cursor: pointer;

//   :hover {
//     text-decoration: underline;
//   }
// `;

const LogoutButton = styled.button`
  position: absolute;
  bottom: 20px;
  margin-bottom: 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  color: red;
  border: none;
  background: unset;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  font-size: 16px;

  :hover {
    text-decoration: underline;
  }
`;

const Profile = (props) => {
  const { socket, user, logout } = props;

  // let fileInput = useRef(null);

  // const [editable, setEditable] = useState(false);
  // const [profileImage, setProfileImage] = useState(
  //   "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
  // );
  // const [usernameVal, setUsernameVal] = useState("");
  // const [emailVal, setEmailVal] = useState("");

  // const onProfileImageSelect = (e) => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setProfileImage(reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // };

  // const onEdit = () => {
  //   setUsernameVal(user.name);
  //   setEmailVal(user.email);
  //   setEditable(true);
  // };

  // const onEditExit = () => {
  //   setEditable(false);
  // };

  // const onEditSave = () => {
  //   setEditable(false);
  // };

  const onLogout = () => {
    // console.log("logout");
    socket.emit("forceDisconnect");
    logout();
  };

  // if (editable) {
  //   return (
  //     <ProfileComp>
  //       <AvatarDisplay>
  //         <FileInput
  //           onChange={onProfileImageSelect}
  //           ref={(el) => (fileInput = el)}
  //         />
  //         <AvatarEdit onClick={() => fileInput.click()}>
  //           Change Avatar
  //         </AvatarEdit>
  //         {/* <AvatarImage src={profileImage} /> */}
  //       </AvatarDisplay>
  //       {user ? (
  //         <UserEdit
  //           placeholder={"Username"}
  //           value={usernameVal}
  //           onChange={(e) => setUsernameVal(e.target.value)}
  //         />
  //       ) : null}
  //       {user ? (
  //         <EmailEdit
  //           placeholder={"Email"}
  //           value={emailVal}
  //           onChange={(e) => setEmailVal(e.target.value)}
  //         />
  //       ) : null}
  //       <CancelButton onClick={onEditExit}>Cancel</CancelButton>
  //       <Button onClick={onEditSave}>Save</Button>
  //     </ProfileComp>
  //   );
  // }
  //user && user.name.substring(0, 1)
  return (
    <ProfileComp>
      <AvatarDisplay>{user && user.name.substring(0, 1)}</AvatarDisplay>
      {user ? <UserDisplay>{user.name}</UserDisplay> : null}
      {user ? (
        user.isGuest ? (
          <GuestDisplay>
            <h3>Guest Account</h3>
            <p>Can only view public project messages</p>
            <p>Create an account to access all features</p>
          </GuestDisplay>
        ) : (
          <EmailDisplay>{user.email}</EmailDisplay>
        )
      ) : null}
      {user ? <IdDisplay>{user._id}</IdDisplay> : null}
      {/* <Button onClick={onEdit}>Edit</Button> */}
      <LogoutButton onClick={onLogout}>Logout</LogoutButton>
    </ProfileComp>
  );
};

const mapStateToProps = (state) => {
  return {
    socket: state.socket.socket,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
