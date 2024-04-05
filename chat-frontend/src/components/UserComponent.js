import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import React from "react";
import { StyledBadge } from "./customMui/StyledBadge";
import { socket } from "../socket";
import { Chat } from "phosphor-react";
const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));
const user_id = window.localStorage.getItem("user_id");
const UserComponent = ({ firstName, lastName, img, online, _id }) => {
  const theme = useTheme();
  const name = `${firstName} ${lastName}`;
  return (
    <StyledChatBox
      sx={{
        width: "100%",
        
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={2}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}  >
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={img} alt={name}  />
            </StyledBadge>
          ) : (
            <Avatar src={img} alt={name} />
          )}
          <Typography variant="subtitle2">{name}</Typography>
        </Stack>
        <Button
          
          onClick={() => {
            socket.emit("friend_req", { to: _id, from: user_id }, () => {
              alert("request sent");
            });
          }}
        >
          <Typography variant="subtitle2" bgcolor={theme.palette.background.paper} >Send Request </Typography>
        </Button>
      </Stack>
    </StyledChatBox>
  );
};
const FriendRequestComponent = ({
  firstName,
  lastName,
  img,
  online,
  _id,
  id,
}) => {
  const theme = useTheme();
  // id is request id which is used to point to the reque4st id of frined request
  const name = `${firstName} ${lastName}`;
  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={2}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2} p={2} >
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={img} alt={name} />
            </StyledBadge>
          ) : (
            <Avatar src={img} alt={name} />
          )}
          <Typography variant="subtitle2">{name}</Typography>
        </Stack>
        <Button
          onClick={() => {
            socket.emit("accept_friend", { request_id: id }, () => {
              alert("request accepted");
            });
          }}
        >
          Accept Request
        </Button>
      </Stack>
    </StyledChatBox>
  );
};

const FriendsComponent = ({ firstName, lastName, img, online, _id }) => {
  const theme = useTheme();
  const name = `${firstName} ${lastName}`;
  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={2}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2} p={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={img} alt={name} />
            </StyledBadge>
          ) : (
            <Avatar src={img} alt={name} />
          )}
          <Typography variant="subtitle2">{name}</Typography>
        </Stack>
        <IconButton
          onClick={() => {
            //  TODO create link to open individual chat from here
          }}
        >
          <Chat />
        </IconButton>
      </Stack>
    </StyledChatBox>
  );
};
export { UserComponent, FriendRequestComponent, FriendsComponent };
