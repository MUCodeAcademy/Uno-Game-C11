import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { theme } from "../../shared/styled/themes/Theme";
import io from "socket.io-client";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { auth } from "../../firebase.config";
import React, { useEffect, useMemo, useRef, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function LobbyPage() {
  const navigate = useNavigate();
  const [hasClicked, setHasClicked] = useState(false);
  const [hasClickedJoin, setHasClickedJoin] = useState(false);
  const socketRef = useRef(null);
  const [roomNum, setRoomNum] = useState("");
  const [joinRoomNum, setJoinRoomNum] = useState("");
  const [roomFilter, setRoomFilter] = useState("");
  const [rooms, setRooms] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  useEffect(() => {
    socketRef.current = io("10.200.224.166:8080", {
      query: {
        username: auth.currentUser?.displayName,
      },
    });
    socketRef.current.on("rooms", ({ rooms }) => {
      setRooms(rooms);
    });
  }, []);

  const errorMsg = useMemo(() => {
    const startingVals = ["game 1", "game 2", "game 3", "game 4"];
    if (
      rooms.some((room) => room.id === roomNum) ||
      startingVals.includes(roomNum.toLowerCase())
    )
      return "Room already exists";
    return "Must be at least 4 characters";
  }, [roomNum]);

  const joinErrorMsg = useMemo(() => {
    if (!rooms.some((room) => room.id === joinRoomNum))
      return "Room Doesn't Exist";
    return "Must be at least 4 characters";
  }, [joinRoomNum]);

  const filterErrorMsg = useMemo(() => {
    const startingVals = ["Game 1", "Game 2", "Game 3", "Game 4"];
    const isFilteringInit = startingVals.some((val) =>
      val.toLowerCase().includes(roomFilter.toLowerCase())
    );
    const doesRoomExist = rooms.some((room) => {
      return room.id.toLowerCase().includes(roomFilter.toLowerCase());
    });
    if (!doesRoomExist && !isFilteringInit && roomFilter.length)
      return "That room doesn't exist";
    return null;
  }, [roomFilter]);

  function buttonDisplay(text) {
    return {
      display: `${
        text.toLowerCase().includes(roomFilter.toLowerCase()) ? "" : "none"
      }`,
    };
  }

  return (
    <>
      <Container>
        <Typography variant="h4" textAlign="center" padding={"15px"}>
          Room Select
        </Typography>
      </Container>
      <Grid container spacing={1} justifyContent="center">
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
          <Typography variant="h5" textAlign="center" marginBottom="5px">
            Create Your Own Game
          </Typography>
          <form style={{ textAlign: "right" }}>
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
                (hasClicked && roomNum.length < 4) ||
                rooms.some(
                  (room) =>
                    room.id === roomNum.replace(/\s+/g, "-").toLowerCase()
                )
              }
              onChange={(e) => {
                setHasClicked(false);
                setRoomNum(e.target.value);
              }}
            />
            <FormControlLabel
              style={{ marginLeft: "auto" }}
              control={
                <Checkbox
                  checked={isPrivate}
                  color="secondary"
                  onChange={() => setIsPrivate((curr) => !curr)}
                />
              }
              label="Private Game"
            />
            <Button
              sx={{ marginTop: "5px" }}
              fullWidth
              type="submit"
              variant="contained"
              disabled={errorMsg === "Room already exists"}
              onClick={(e) => {
                e.preventDefault();
                setHasClicked(true);
                if (
                  roomNum.length > 3 &&
                  !rooms.some(
                    (room) =>
                      room === roomNum.replace(/\s+/g, "-").toLowerCase()
                  )
                ) {
                  socketRef.current.emit("create room", {
                    id: roomNum.replace(/\s+/g, "-").toLowerCase(),
                    isPrivate: isPrivate,
                  });
                  navigate(
                    `/game-room/${roomNum.replace(/\s+/g, "-").toLowerCase()}`
                  );
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
          <Typography variant="h5" textAlign="center" marginBottom="5px">
            Join Game
          </Typography>
          <form
            style={{
              textAlign: "right",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              id="outlined-required"
              label="Room Name"
              placeholder="room-name"
              color="secondary"
              value={joinRoomNum}
              helperText={joinErrorMsg}
              error={
                (hasClickedJoin && joinRoomNum.length < 4) ||
                !rooms.some((room) => room.id === roomNum)
              }
              onChange={(e) => {
                setHasClickedJoin(false);
                setJoinRoomNum(e.target.value);
              }}
            />
            <Button
              sx={{ marginTop: "auto" }}
              fullWidth
              type="submit"
              variant="contained"
              disabled={errorMsg === "Room doesn't exist"}
              onClick={(e) => {
                e.preventDefault();
                setHasClickedJoin(true);
                if (
                  roomNum.length > 3 &&
                  rooms.some(
                    (room) =>
                      room.id === joinRoomNum.replace(/\s+/g, "-").toLowerCase()
                  )
                ) {
                  navigate(
                    `/game-room/${joinRoomNum
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`
                  );
                }
              }}
            >
              Join Private Room
            </Button>
          </form>
        </Grid>
        <Grid
          item
          xs={12}
          sm={10}
          style={{
            backgroundColor: theme.palette.background.paper,
            display: "flex",
            flexDirection: "column",
            padding: "15px",
            margin: "5px 0",
          }}
        >
          <Typography variant="h5" textAlign="center">
            Select from active games
          </Typography>
          <form>
            <TextField
              fullWidth
              variant="filled"
              id="outlined-required"
              label="Find a room"
              placeholder="room-name"
              color="secondary"
              value={roomFilter}
              helperText={filterErrorMsg}
              error={!!filterErrorMsg}
              onChange={(e) => setRoomFilter(e.target.value)}
            />
          </form>
          <Button
            disabled={rooms[0]?.playerCount === 6}
            sx={{ margin: "5px 0" }}
            fullWidth
            variant="contained"
            style={buttonDisplay("Game 1")}
            size="small"
            onClick={() => navigate("/game-room/game-1")}
          >
            Game 1 - {rooms[0]?.playerCount} player
            {rooms[0]?.playerCount !== 1 ? "s" : ""}
          </Button>
          <Button
            disabled={rooms[1]?.playerCount === 6}
            sx={{ margin: "5px 0" }}
            fullWidth
            variant="contained"
            size="small"
            style={buttonDisplay("Game 2")}
            onClick={() => navigate("/game-room/game-2")}
          >
            Game 2 - {rooms[1]?.playerCount} player
            {rooms[1]?.playerCount !== 1 ? "s" : ""}
          </Button>
          <Button
            disabled={rooms[2]?.playerCount === 6}
            sx={{ margin: "5px 0" }}
            fullWidth
            variant="contained"
            size="small"
            style={buttonDisplay("Game 3")}
            onClick={() => navigate("/game-room/game-3")}
          >
            Game 3 - {rooms[2]?.playerCount} player
            {rooms[2]?.playerCount !== 1 ? "s" : ""}
          </Button>
          <Button
            disabled={rooms[3]?.playerCount === 6}
            sx={{ margin: "5px 0" }}
            fullWidth
            variant="contained"
            size="small"
            style={buttonDisplay("Game 4")}
            onClick={() => navigate("/game-room/game-4")}
          >
            Game 4 - {rooms[3]?.playerCount} player
            {rooms[3]?.playerCount !== 1 ? "s" : ""}
          </Button>

          {rooms
            .filter((room) => {
              if (roomFilter.length) {
                return room.id.includes(roomFilter);
              }
              return room;
            })
            .map((val) => {
              let starting = ["game-1", "game-2", "game-3", "game-4"];
              if (starting.includes(val.id) || val.isPrivate)
                return <div key={val.id}></div>;

              return (
                <Button
                  disabled={val.playerCount === 6}
                  key={val.id}
                  sx={{ margin: "5px 0" }}
                  fullWidth
                  variant="contained"
                  size="small"
                  onClick={() => navigate(`/game-room/${val.id}`)}
                >
                  {val.id} - {val.playerCount} player
                  {val?.playerCount !== 1 ? "s" : ""}
                </Button>
              );
            })}
        </Grid>
      </Grid>
    </>
  );
}

export default LobbyPage;
