import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Input } from "antd";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function LandingPage({
  users,
  dispatch,
  userBlockList,
  userFriendList,
  user,
  userRequestList,
  fakeUsers,
  inpValue,
}) {
  const friendHandler = (e) => {
    let found = users.find(
      (item) => item.id == e.currentTarget.getAttribute("id")
    );

    const isAlreadyFriend = userFriendList.some(
      (friend) => friend.id === found.id
    );

    if (isAlreadyFriend) {
      const updatedFriendList = userFriendList.filter(
        (friend) => friend.id !== found.id
      );

      dispatch({
        type: "setClicked",
        clicked: found,
      });

      dispatch({
        userFriendList: updatedFriendList,
        type: "removeFriend",
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          friendsList: updatedFriendList,
        })
      );

      console.log(`${found.fullName} removed from friends.`);

      axios
        .patch(`http://localhost:8000/users/${found.id}`, {
          friendsList: updatedFriendList,
        })
        .then((response) => {
          console.log("Friend request sent successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error sending friend request:", error);
        });

      axios
        .patch(`http://localhost:8000/users/${user.id}`, {
          friendsList: updatedFriendList,
        })
        .then((response) => {
          console.log("Friend request sent successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error sending friend request:", error);
        });
    } else {
      dispatch({
        type: "setClicked",
        clicked: found,
      });

      axios
        .patch(`http://localhost:8000/users/${found.id}`, {
          requestList: [...found.requestList, user],
        })
        .then((response) => {
          console.log("Friend request sent successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error sending friend request:", error);
        });
    }
  };
  const blockHandler = (e) => {
    let found = users.find(
      (item) => item.id == e.currentTarget.getAttribute("id")
    );

    dispatch({
      userBlockList: [...userBlockList, found],
      type: "addBlock",
    });

    const updatedBlockList = [...user.blockList, found];

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        blockList: updatedBlockList,
      })
    );

    dispatch({
      type: "getUser",
      user: {
        ...user,
        blockList: updatedBlockList,
      },
    });

    axios
      .patch(`http://localhost:8000/users/${user.id}`, {
        blockList: [...user.blockList, found],
      })
      .then((response) => {
        console.log("Friend request sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending friend request:", error);
      });
  };

  let elements = (user && users.filter((item) => item.id != user.id)) || [];
  let cards = elements.filter(
    (item) => !user.blockList.some((blockedUser) => blockedUser.id === item.id)
  );

  console.log(inpValue);
  console.log(users);
  console.log(fakeUsers);
  return (
    <Box sx={{ flexGrow: 1 }} style={{ margin: "3em auto", width: "70%" }}>
      <Input
        placeholder="Search Users"
        value={inpValue}
        style={{
          height: "40px",
          fontSize: "17px",
          padding: "5px",

          width: "65%",
          display: "block",
          margin: "45px auto",
        }}
        onChange={(e) => {
          dispatch({ inpValue: e.target.value, type: "setValue" });

          let found = users;
          found = fakeUsers.filter((item) =>
            item.fullName.toLowerCase().includes(e.target.value)
          );

          dispatch({ users: found, type: "getUsers" });
        }}
      />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
        {cards &&
          cards.map((item) => {
            return (
              <Grid
                item
                xs={6}
                sm={4}
                md={4}
                lg={3}
                key={item.id}
                style={{ marginBottom: "30px" }}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 240 }}
                    image="https://i.pinimg.com/originals/31/e2/23/31e2235faafde5ef0331214c55f1a2c5.jpg"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.about}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" id={item.id} onClick={friendHandler}>
                      {item && userFriendList.find((elem) => elem.id == item.id)
                        ? "Remove from Friends"
                        : "Add to Friends"}
                    </Button>
                    <Button size="small" id={item.id} onClick={blockHandler}>
                      Add to Block
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}

export default LandingPage;
