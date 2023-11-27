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

const Friends = ({ user, dispatch }) => {
  let friends = (user && user.friendsList) || [];
  console.log(friends);
  function removeFriend(e) {
    let found = friends.find((item) => item.id == e.target.getAttribute("id"));

    let updatedUserFriends = friends.filter((item) => item.id != found.id);

    let updatedFriendFriends = found.friendsList.filter(
      (item) => item.id != user.id
    );

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        friendsList: updatedUserFriends,
      })
    );

    dispatch({
      type: "setClicked",
      clicked: found,
    });

    axios
      .patch(`http://localhost:8000/users/${found.id}`, {
        friendsList: updatedFriendFriends,
      })
      .then((response) => {
        console.log("Friend added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending friend request:", error);
      });

    axios
      .patch(`http://localhost:8000/users/${user.id}`, {
        friendsList: updatedUserFriends,
      })
      .then((response) => {
        console.log("Friend added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending friend request:", error);
      });
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }} style={{ margin: "5em auto", width: "70%" }}>
        <h1 style={{ textAlign: "center" }}>My Friends</h1>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
          {friends &&
            friends.map((friend) => {
              return (
                <Grid
                  item
                  xs={2}
                  sm={4}
                  md={4}
                  key={friend.id}
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
                        {friend.fullName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {friend.about}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        id={friend.id}
                        onClick={removeFriend}
                      >
                        Remove From Friends
                      </Button>
                      <Button size="small" id={friend.id}>
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </>
  );
};

export default Friends;
