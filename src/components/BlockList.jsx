import { Padding } from "@mui/icons-material";
import Button from "@mui/material/Button";
import React from "react";
import axios from "axios";

const BlockList = ({ user, users, dispatch, userBlockList }) => {
  let blocedUsers = (user && user.blockList) || [];
  function handleBlock(e) {
    let found = users.find((item) => item.id == e.target.getAttribute("id"));
    console.log(found);
    let updatedBlock = userBlockList.filter((item) => item.id != found.id);
    console.log(updatedBlock);

    dispatch({
      userBlockList: updatedBlock,
      type: "addBlock",
    });
    dispatch({
      type: "getUser",
      user: {
        ...user,
        blockList: updatedBlock,
      },
    });

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        blockList: updatedBlock,
      })
    );

    user
      ? axios
          .patch(`http://localhost:8000/users/${user.id}`, {
            blockList: updatedBlock,
          })
          .then((response) => {
            console.log("Friend added successfully:", response.data);
          })
          .catch((error) => {
            console.error("Error sending friend request:", error);
          })
      : null;
  }
  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "70px" }}>My Block List</h1>
      {userBlockList.map((item) => {
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
              <h1> {item.fullName} </h1>
            </div>
            <div className="buttons">
              <Button variant="outlined" id={item.id} onClick={handleBlock}>
                Remove From Block
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default BlockList;
