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
import React, { useEffect, useMemo, useRef, useState } from "react";

function LobbyPage() {
  const navigate = useNavigate();
  const [hasClicked, setHasClicked] = useState(false);
  const socketRef = useRef(null);
  const [roomNum, setRoomNum] = useState("");
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    socketRef.current = io("localhost:8080", {
      query: {
        username: auth.currentUser?.displayName,
      },
    });
    socketRef.current.on("rooms", ({ rooms }) => {
      setRooms(rooms);
    });
  }, []);

  const errorMsg = useMemo(() => {
    if (rooms.includes(roomNum)) return "Room already exists";
    return "Must be at least 4 characters";
  }, [roomNum]);
  return (
    <>
      <Container>
        <Typography variant="h4" textAlign="center" paddingTop={"5px"}>
          Join a room
        </Typography>
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
          <form>
            <TextField
              fullWidth
              variant="filled"
              id="outlined-required"
              label="Room Name"
              placeholder="room-name"
              color="secondary"
              value={roomNum}
              helperText={errorMsg}
              error={
                (hasClicked && roomNum.length < 3) || rooms.includes(roomNum)
              }
              onChange={(e) => setRoomNum(e.target.value)}
            />
            <Button
              sx={{ marginTop: "5px" }}
              fullWidth
              type="submit"
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                setHasClicked(true);
                if (roomNum.length > 3 && !rooms.includes(roomNum)) {
                  navigate(`/game-room/${roomNum}`);
                }
              }}
            >
              Create Room
            </Button>
          </form>
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
            onClick={() => navigate("/game-room/game-1")}
          >
            Game 1
          </Button>
          <Button
            sx={{ margin: "5px" }}
            fullWidth
            variant="contained"
            size="small"
            onClick={() => navigate("/game-room/game-2")}
          >
            Game 2
          </Button>
          <Button
            sx={{ margin: "5px" }}
            fullWidth
            variant="contained"
            size="small"
            onClick={() => navigate("/game-room/game-3")}
          >
            Game 3
          </Button>
          <Button
            sx={{ margin: "5px" }}
            fullWidth
            variant="contained"
            size="small"
            onClick={() => navigate("/game-room/game-4")}
          >
            Game 4
          </Button>
          {rooms.map((val) => {
            let starting = ["game-1", "game-2", "game-3", "game-4"];
            if (starting.includes(val)) return <div key={val}></div>;
            return (
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
            );
          })}
        </Grid>
      </Grid>
    </>
  );
}

export default LobbyPage;
