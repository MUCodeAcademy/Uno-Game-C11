import React, { useEffect, useState, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { theme } from "../../shared/styled/themes/Theme";
import { ref, child, get } from "firebase/database";
import { database } from "../../firebase.config";
import { auth } from "../../firebase.config";

function LeaderBoardPage() {
  const [leaderBoard, setLeaderBoard] = useState(null);
  const dbRef = ref(database);

  async function getDB() {
    try {
      await get(child(dbRef, `users`)).then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          setLeaderBoard(putJSONinArray(data));
        } else {
          console.log("snapshot doesn't exist");
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  function putJSONinArray(data) {
    let arr = [];
    for (let user in data) {
      const played = parseInt(data[user]["total games played"]);
      const won = parseInt(data[user]["total games won"]);
      const lost = parseInt(data[user]["total games lost"]);
      const pct = played > 0 ? won / played : 0;
      arr.push({
        uid: user,
        name: data[user]["name"],
        played: played,
        won: won,
        lost: lost,
        pct: pct,
      });
    }
    arr.sort((a, b) => b.won - a.won);
    return arr;
  }
  console.log(leaderBoard);
  useEffect(() => {
    async function getData() {
      await getDB();
    }
    getData();
  }, []);

  const personalStats = useMemo(
    () => leaderBoard.find((u) => u.uid === auth.currentUser?.uid),
    [leaderBoard, auth.currentUser?.uid]
  );

  console.log(personalStats);
  return (
    <div>
      <Container style={{ margin: "10px 0px" }}>
        <Typography
          style={{ margin: "10px", padding: "15px" }}
          variant="h4"
          textAlign="center"
        >
          Game Statistics
        </Typography>
        <Grid container spacing={1} justifyContent="center">
          <Grid
            item
            xs={12}
            style={{
              backgroundColor: theme.palette.background.paper,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "15px",
              margin: "5px 0",
              color: "white",
            }}
          >
            <Typography variant="h5" textAlign="center">
              Your Stats
            </Typography>
            <div></div>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              backgroundColor: theme.palette.background.paper,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "15px",
              margin: "5px 0",
              color: "white",
            }}
          >
            <Typography variant="h5" textAlign="center">
              Leader Board
            </Typography>
            <div></div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LeaderBoardPage;
