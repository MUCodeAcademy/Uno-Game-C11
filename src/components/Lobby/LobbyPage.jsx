import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";
// import { Button } from "../../shared/styled/components/Button";
import Button from "@mui/material/Button";
import { theme } from "../../shared/styled/themes/Theme";
import io from "socket.io-client";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { auth } from "../../firebase.config";
import React, { useEffect, useRef, useState } from "react";

function LobbyPage() {
  const navigate = useNavigate();
  const [hasClicked, setHasClicked] = useState(false);
  const socketRef = useRef(null);
  const [roomNum, setRoomNum] = useState("");
  const [room, setRoom] = useState([]);
  useEffect(() => {
    socketRef.current = io("localhost:8080", {
      query: {
        username: auth.currentUser?.displayName,
        roomID: roomID,
        uid: auth.currentUser?.uid,
      },
    });
    socketRef.current.on("rooms", (rooms) => {
      setRoom(rooms);
      console.log(room);
    });
  }, []);
  return (
    <>
      <Container>
        <Typography variant="h4" textAlign="center" paddingTop={"5px"}>
          Join a room
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/gameroom/static")}
        >
          Join static room
        </Button>
      </Container>
      <Grid container spacing={1} justifyContent="space-evenly">
        <Grid
          item
          xs={12}
          sm={5}
          style={{
            backgroundColor: theme.palette.background.paper,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "15px",
            margin: "5px 0",
          }}
        >
          <Typography variant="h5" textAlign="center">
            Create Your Own Game
          </Typography>
          <TextField
            fullWidth
            variant="filled"
            id="outlined-required"
            label="Room Name"
            placeholder="room-name"
            color="secondary"
            value={roomNum}
            onChange={(e) => setRoomNum(e.target.value)}
          />
          <Button
            sx={{ marginTop: "5px" }}
            fullWidth
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              setHasClicked(true);
              if (room.length > 3) {
                navigate(`/game-room/${roomNum}`);
              }
            }}
          >
            Create Room
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          style={{
            backgroundColor: theme.palette.background.paper,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "15px",
            margin: "5px 0",
          }}
        >
          <Typography variant="h5" textAlign="center">
            Select from active games
          </Typography>

          <Button
            sx={{ margin: "5px" }}
            fullWidth
            variant="contained"
            size="small"
            onClick={() => navigate("/game-room/static1")}
          >
            Game 1
          </Button>
          <Button
            sx={{ margin: "5px" }}
            fullWidth
            variant="contained"
            size="small"
            onClick={() => navigate("/game-room/static2")}
          >
            Game 2
          </Button>
          <Button
            sx={{ margin: "5px" }}
            fullWidth
            variant="contained"
            size="small"
            onClick={() => navigate("/game-room/static3")}
          >
            Game 3
          </Button>
          <Button
            sx={{ margin: "5px" }}
            fullWidth
            variant="contained"
            size="small"
            onClick={() => navigate("/game-room/static4")}
          >
            Game 4
          </Button>
          {room.map((val) => (
            <Button
              key={val}
              sx={{ margin: "5px" }}
              fullWidth
              variant="contained"
              size="small"
              onClick={() => navigate(`/game-room/${val}`)}
            >
              {val}
            </Button>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default LobbyPage;
