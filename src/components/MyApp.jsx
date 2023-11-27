import React, { useEffect, useReducer, memo, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import axios from "axios";
import LandingPage from "./LandingPage";
import Friends from "./Friends";
import NewRequests from "./NewRequests";
import Register from "./Register";
import BlockList from "./BlockList";

function reducer(state, action) {
  switch (action.type) {
    case "getUsers":
      return {
        ...state,
        users: action.users,
        // inpValue: "",
      };
    case "checkEmail":
      return {
        ...state,
        email: action.email,
      };
    case "checkPass":
      return {
        ...state,
        password: action.password,
      };
    case "getUser":
      return {
        ...state,
        user: action.user,
      };
    case "setFullName":
      return {
        ...state,
        rFullName: action.rFullName,
      };
    case "setEmail":
      return {
        ...state,
        rEmail: action.rEmail,
      };
    case "setPhone":
      return {
        ...state,
        rPhone: action.rPhone,
      };
    case "setPass":
      return {
        ...state,
        rPassword: action.rPassword,
      };
    case "setBio":
      return {
        ...state,
        rBio: action.rBio,
      };
    case "setNewUser":
      return {
        ...state,
        newUser: action.newUser,
        users: [...state.users, action.newUser],
      };
    case "addRequest":
      return {
        ...state,
        userRequestList: action.userRequestList,
      };
    case "addBlock":
      return {
        ...state,
        userBlockList: action.userBlockList,
      };
    case "addFriend":
      return {
        ...state,
        userFriendList: action.userFriendList,
      };
    case "setClicked":
      return {
        ...state,
        clicked: action.clicked,
      };
    case "removeFriend":
      return {
        ...state,
        userFriendList: action.userFriendList,
      };
    case "fakeUsers":
      return {
        ...state,
        fakeUsers: action.fakeUsers,
      };
    case "setValue":
      return {
        ...state,
        inpValue: action.inpValue,
      };

    default:
      break;
  }
}

const MyApp = () => {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    user:
      (JSON.parse(localStorage.getItem("user")) &&
        JSON.parse(localStorage.getItem("user"))) ||
      [],
    users: [],
    rEmail: "",
    rFullName: "",
    rPassword: "",
    rPhone: "",
    rBio: "",
    newUser: {},
    inpValue: "",
    fakeUsers: [],
    clicked: [],
    userRequestList:
      (JSON.parse(localStorage.getItem("user")) &&
        JSON.parse(localStorage.getItem("user")).requestList) ||
      [],
    userFriendList:
      (JSON.parse(localStorage.getItem("user")) &&
        JSON.parse(localStorage.getItem("user")).friendsList) ||
      [],
    userBlockList:
      (JSON.parse(localStorage.getItem("user")) &&
        JSON.parse(localStorage.getItem("user")).blockList) ||
      [],
  });

  //   console.log(state.user);
  //   console.log(state.users);
  //   console.log(state.userFriendList);
  console.log(state.userBlockList);
  //   state.user.friendsList = state.userFriendList;
  //   state.user.blockList = state.userBlockList;

  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("user")
  );
  useEffect(() => {
    axios.get("http://localhost:8000/users").then((res) => {
      dispatch({
        users: res.data,
        type: "getUsers",
      });
      dispatch({
        fakeUsers: res.data,
        type: "fakeUsers",
      });
    });
  }, [state.user, state.userFriendList, state.userBlockList, state.clicked]);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            authenticated ? (
              <>
                <Header
                  onLogout={handleLogout}
                  setAuthenticated={setAuthenticated}
                />
                <Outlet />
              </>
            ) : (
              <Routes>
                <Route
                  index
                  element={
                    <Login
                      users={state.users}
                      dispatch={dispatch}
                      email={state.email}
                      password={state.password}
                      user={state.user}
                      onLogin={handleLogin}
                      authenticated={authenticated}
                      setAuthenticated={setAuthenticated}
                    />
                  }
                />
              </Routes>
            )
          }
        >
          <Route
            index
            element={
              <LandingPage
                users={state.users}
                dispatch={dispatch}
                userFriendList={state.userFriendList}
                userBlockList={state.userBlockList}
                userRequestList={state.userRequestList}
                user={state.user}
                clicked={state.clicked}
                fakeUsers={state.fakeUsers}
                inpValue={state.inpValue}
              />
            }
          />
          <Route
            path="/friends"
            element={
              <Friends
                user={state.user}
                users={state.users}
                dispatch={dispatch}
              />
            }
          />
          <Route
            path="/requests"
            element={
              <NewRequests
                user={state.user}
                users={state.users}
                dispatch={dispatch}
                userFriendList={state.userFriendList}
              />
            }
          />
          <Route
            path="/block"
            element={
              <BlockList
                user={state.user}
                users={state.users}
                dispatch={dispatch}
                userBlockList={state.userBlockList}
              />
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            <Login
              users={state.users}
              dispatch={dispatch}
              email={state.email}
              password={state.password}
              user={state.user}
              onLogin={handleLogin}
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              dispatch={dispatch}
              rEmail={state.rEmail}
              rFullName={state.rFullName}
              rPassword={state.rPassword}
              rPhone={state.rPhone}
              rBio={state.rBio}
              newUser={state.newUser}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default memo(MyApp);
