import React, { useEffect, useState, useMemo } from "react";
import { theme } from "../../shared/styled/themes/Theme";
import { ref, child, get } from "firebase/database";
import { database } from "../../firebase.config";
import { auth } from "../../firebase.config";
import { Container, Grid, Typography } from "@mui/material";
import { LeaderboardTable } from "./tables/LeaderboardTable";
import { UserTable } from "./tables/UserTable";
import { ServerTable } from "./tables/ServerTable";
import { FilterDramaTwoTone } from "@mui/icons-material";

function LeaderBoardPage() {
    const [leaderBoard, setLeaderBoard] = useState([]);
    const [server, setServer] = useState([]);
    const dbRef = ref(database);
    const playerUID = auth.currentUser.uid;

    async function getDB() {
        try {
            await get(child(dbRef, `/users`)).then((snapshot) => {
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

    async function getServerDB() {
        try {
            await get(child(dbRef, `/server`)).then((snapshot) => {
                if (snapshot.exists()) {
                    let data = snapshot.val();
                    setServer(formatServerData(data));
                } else {
                    console.log("snapshot doesn't exist");
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    function formatServerData(data) {
        const started = parseInt(data["total games started"]);
        const drawn = parseInt(data["total games stalemate"]);
        const completed = parseInt(data["total games completed"]);
        const abandoned = started - completed;
        let output = {
            started,
            drawn,
            completed,
            abandoned,
        };
        return output;
    }

    function putJSONinArray(data) {
        let arr = [];
        for (let user in data) {
            const played = parseInt(data[user]["total games played"]);
            const won = parseInt(data[user]["total games won"]);
            const lost = parseInt(data[user]["total games lost"]);
            const drawn = parseInt(data[user]["total games drawn"]);
            const pct = played > 0 ? Math.floor((won / played) * 10000) / 100 : 0;
            arr.push({
                uid: data[user]["uid"],
                name: data[user]["name"],
                played: played,
                won: won,
                lost: lost,
                pct: pct,
                drawn: drawn,
            });
        }

        arr.sort((a, b) => b.won - a.won);
        return arr;
    }

    useEffect(() => {
        async function getData() {
            await getDB();
            await getServerDB();
        }
        getData();
    }, []);
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
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
                        <UserTable leaderBoard={leaderBoard}></UserTable>
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
                        <LeaderboardTable
                            leaderBoard={leaderBoard}
                            playerUID={playerUID}
                        ></LeaderboardTable>
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
                            Server Statistics
                        </Typography>
                        <ServerTable server={server}></ServerTable>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default LeaderBoardPage;
