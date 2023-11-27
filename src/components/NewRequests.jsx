import { Padding } from "@mui/icons-material";
import Button from "@mui/material/Button";
import React from "react";
import axios from "axios";

const NewRequests = ({ user, users, dispatch, userFriendList }) => {
  let requests = (user && user.requestList) || [];

  function handleConfirm(e) {
    let found = users.find(
      (item) => item.id == e.currentTarget.getAttribute("id")
    );

    dispatch({
      type: "addFriend",
      userFriendList: [...userFriendList, found],
    });

    console.log(found);
    console.log(user);

    let updatedRequest = user.requestList.filter((item) => item.id != found.id);
    let updatedFriend = [...userFriendList, found];
    axios
      .patch(`http://localhost:8000/users/${user.id}`, {
        requestList: updatedRequest,
        friendsList: [...user.friendsList, found],
      })
      .then((response) => {
        console.log("Friend added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending friend request:", error);
      });

    axios
      .patch(`http://localhost:8000/users/${found.id}`, {
        friendsList: [...found.friendsList, user],
      })
      .then((response) => {
        console.log("Friend added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending friend request:", error);
      });

    dispatch({
      type: "getUser",
      user: {
        ...user,
        friendList: updatedFriend,
        requestList: updatedRequest,
      },
    });

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        friendsList: updatedFriend,
        requestList: updatedRequest,
      })
    );
  }
  function handleDelete(e) {
    console.log(e.target.getAttribute("id"));
    let updatedRequest = user.requestList.filter(
      (item) => item.id != e.target.getAttribute("id")
    );

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        requestList: updatedRequest,
      })
    );

    axios
      .patch(`http://localhost:8000/users/${user.id}`, {
        requestList: updatedRequest,
      })
      .then((response) => {
        console.log("Friend added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending friend request:", error);
      });
    [];
  }

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "70px" }}>New Requests</h1>
      {requests.map((item) => {
        return (
          <div
            style={{
              width: "70%",
              height: "60px",
              margin: "50px auto",
              padding: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              borderTop: "1px solid gray",
              borderBottom: "1px solid gray",
            }}
          >
            <div className="image-wrapper" style={{ width: "20%" }}>
              <img
                src="https://i.pinimg.com/originals/31/e2/23/31e2235faafde5ef0331214c55f1a2c5.jpg"
                alt=""
                style={{ width: "90px", height: "80px" }}
              />
            </div>
            <div className="user-info" style={{ width: "50%" }}>
              <h1> {item.fullName} wants to be friend with you</h1>
            </div>
            <div className="buttons">
              <Button
                variant="outlined"
                style={{ marginRight: "20px" }}
                id={item.id}
                onClick={handleConfirm}
              >
                Confirm
              </Button>
              <Button
                variant="outlined"
                color="error"
                id={item.id}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default NewRequests;
