import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import {
  setUsername,
  fetchUser,
  register,
  login,
  loginGuest,
} from "../store/actions";

const fadeIn = keyframes`
  from {opacity:0}
  to {opacity:1}
`;

const JoinComp = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 25vh 0;
  box-sizing: border-box;
  background-color: #1b1b1b;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 15vw;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const JoinBox = styled.div`
  position: relative;
  width: 300px;
  height: 100%;
  background-color: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const JoinBoxContainer = styled.div`
  width: 300px;
  height: 100%;
`;

const LoginBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  animation: ${fadeIn} 1.5s forwards;
`;

const RegisterBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  animation: ${fadeIn} 1.5s forwards;
`;

const Header = styled.h1`
  color: white;
  text-align: center;
  border-bottom: 3px solid white;
  margin: 0;
  padding-bottom: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
  font-size: 29px;
`;

const ErrorBox = styled.div`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  font-family: "Raleway", sans-serif;
  box-sizing: border-box;
  outline: none;
  font-size: 17px;
  letter-spacing: 1px;
  line-height: 1.3em;
  background: #ff3d3d;
  color: white;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${fadeIn} 0.5s forwards;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Input = styled.input.attrs((props) => {
  return {
    type: props.type || "text",
    placeholder: props.placeholder || "Name",
    name: props.name,
  };
})`
  height: 45px;
  margin-bottom: 20px;
  padding-left: 15px;
  font-family: "Raleway", sans-serif;
  box-sizing: border-box;
  outline: none;
  font-size: 17px;
  letter-spacing: 1px;
`;

const Button = styled.button`
  height: 45px;
  margin-bottom: 5px;
  padding-left: 10px;
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  color: white;
  background: ${(props) => (props.success ? "#0eb514" : "#1a8cff")};
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: ${(props) => (props.success ? "auto" : "pointer")};

  transition: background-color 0.25s;
  :hover {
    background: ${(props) => (props.success ? "#0eb514" : "#0073e6")};
  }

  a {
    color: white;
    all: unset;
  }
`;

const SwitchTextArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SwitchText = styled.p`
  color: white;
  font-size: 13px;
  align-self: center;
  margin-bottom: 0;

  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

const Join = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState(null);
  const [registerErrorMsg, setRegisterErrorMsg] = useState(null);
  const [loginWelcomeMsg, setLoginWelcomeMsg] = useState(null);
  const [registerWelcomeMsg, setRegisterWelcomeMsg] = useState(null);

  const { isAuthenticated, error, fetchUser, register, login, loginGuest } =
    props;

  useEffect(() => {
    if (isAuthenticated === true) {
      setRedirect(true);
    } else {
      fetchUser()
        .then(() => setRedirect(true))
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Check for register error
    if (error) {
      switch (error.id) {
        case "REGISTER_ERROR":
          setRegisterErrorMsg(error.msg);
          break;
        case "LOGIN_ERROR":
          setLoginErrorMsg(error.msg);
          break;
        default:
          break;
      }
    } else {
      setRegisterErrorMsg(null);
    }
  }, [error]);

  const onLogin = (e) => {
    e.preventDefault();
    clearLoginErrorMsg();

    login(email, password).then((user) => {
      setLoginWelcomeMsg(`Welcome back, ${user.name}`);
      setTimeout(() => {
        setRedirect(true);
      }, 1500);
    });
  };

  const onLoginGuest = () => {
    clearLoginErrorMsg();

    loginGuest().then(() => {
      setLoginWelcomeMsg(`Welcome, guest`);
      setTimeout(() => {
        setRedirect(true);
      }, 1500);
    });
  };

  const onRegister = (e) => {
    e.preventDefault();
    clearRegisterErrorMsg();

    register(name, email, password).then((user) => {
      setRegisterWelcomeMsg(`Welcome, ${user.name}`);
      setTimeout(() => {
        setRedirect(true);
      }, 1500);
    });
  };

  const switchIsLogin = () => {
    setUsername("");
    setEmail("");
    setPassword("");

    setIsLogin(!isLogin);
  };

  const clearLoginErrorMsg = () => {
    setLoginErrorMsg(null);
  };

  const clearRegisterErrorMsg = () => {
    setRegisterErrorMsg(null);
  };

  const render = () => {
    if (redirect) return <Redirect to="/projects" />;

    const loginError = (
      <ErrorBox onClick={clearLoginErrorMsg}>{loginErrorMsg}</ErrorBox>
    );

    const registerError = (
      <ErrorBox onClick={clearRegisterErrorMsg}>{registerErrorMsg}</ErrorBox>
    );

    const loginSuccess = loginWelcomeMsg !== null;

    const login = (
      <LoginBox>
        <Header>Login</Header>
        <Form onSubmit={onLogin}>
          {loginErrorMsg ? loginError : null}
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Email"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Password"
          />
          <Button onClick={onLogin} success={loginSuccess}>
            {loginSuccess ? loginWelcomeMsg : "Login"}
          </Button>
          <SwitchTextArea>
            <SwitchText onClick={switchIsLogin}>
              or create a new account
            </SwitchText>
            <SwitchText onClick={onLoginGuest}>or login as a guest</SwitchText>
          </SwitchTextArea>
        </Form>
      </LoginBox>
    );

    const registerSuccess = registerWelcomeMsg !== null;

    const register = (
      <RegisterBox>
        <Header>Register</Header>
        <Form onSubmit={onRegister}>
          {registerErrorMsg ? registerError : null}
          <Input onChange={(e) => setName(e.target.value)} name="username" />
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Email"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Password"
          />
          <Button onClick={onRegister} success={registerSuccess}>
            {registerSuccess ? registerWelcomeMsg : "Register"}
          </Button>
          <SwitchText onClick={switchIsLogin}>
            or login with an account
          </SwitchText>
        </Form>
      </RegisterBox>
    );

    return (
      <JoinComp>
        <Container>
          <JoinBox>
            <JoinBoxContainer>{isLogin ? login : register}</JoinBoxContainer>
          </JoinBox>
        </Container>
      </JoinComp>
    );
  };

  return render();
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: (username) => dispatch(setUsername(username)),
    fetchUser: () => dispatch(fetchUser()),
    register: (name, email, password) =>
      dispatch(register(name, email, password)),
    login: (email, password) => dispatch(login(email, password)),
    loginGuest: () => dispatch(loginGuest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Join);
