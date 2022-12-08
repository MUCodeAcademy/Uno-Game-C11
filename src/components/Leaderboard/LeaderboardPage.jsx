import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { theme } from "../../shared/styled/themes/Theme";

function LeaderBoardPage() {
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
