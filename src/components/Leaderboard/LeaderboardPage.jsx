import React, { useEffect, useState, useMemo } from "react";
import { theme } from "../../shared/styled/themes/Theme";
import { ref, child, get } from "firebase/database";
import { database } from "../../firebase.config";
import { auth } from "../../firebase.config";
import { Container, Grid, Typography, Table, TableContainer } from "@mui/material";
import { EnhancedTable } from "./tables/LeaderboardTable";
import { UserTable } from "./tables/UserTable";

function LeaderBoardPage() {
    const [leaderBoard, setLeaderBoard] = useState([]);
    const dbRef = ref(database);

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
                        <EnhancedTable leaderBoard={leaderBoard}></EnhancedTable>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default LeaderBoardPage;
