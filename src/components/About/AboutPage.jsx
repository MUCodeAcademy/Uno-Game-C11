import React from "react";
import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function AboutPage() {
  return (
    <Grid
      container
      rowSpacing={4}
      columnSpacing={6}
      style={{
        textAlign: "center",
        padding: "20px",
        marginLeft: "0px",
        width: "100%",
      }}
      className="center padding-20"
    >
      <Grid item xs={12}>
        <Typography variant="h4">About The Dev Team</Typography>
      </Grid>
      <Grid container item xs={12} sm={6}>
        <Grid item xs={3}>
          <Avatar alt="Gabe" src={"GABE"} sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item xs={9}>
          <Box className="padding-10">
            <Typography variant="h5"> Gabe Bierman</Typography>
            <Typography variant="body2">ABOUT GABE GOES HERE</Typography>
            <IconButton
              color="secondary"
              href="https://github.com/gabebierman"
              target="_blank"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              color="secondary"
              href="https://www.linkedin.com/in/gabebierman/"
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6}>
        <Grid item xs={3}>
          <Avatar alt="Tom" src={"TOM PIC"} sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item xs={9}>
          <Box className="padding-10">
            <Typography variant="h5"> Tom Heafey</Typography>
            <Typography variant="body2">ABOUT TOM GOES HERE</Typography>
            <IconButton
              color="secondary"
              href="https://github.com/tomheafey"
              target="_blank"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              color="secondary"
              href="https://www.linkedin.com/in/tom-h-3a31b21b8/"
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6}>
        <Grid item xs={3}>
          <Avatar
            src={"STEVEN PIC"}
            alt="Steven"
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        <Grid item xs={9}>
          <Box className="padding-10">
            <Typography variant="h5">Steven May</Typography>
            <Typography variant="body2">ABOUT STEVEN GOES HERE</Typography>
            <IconButton
              color="secondary"
              href="https://github.com/stevenbmay"
              target="_blank"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              color="secondary"
              href="https://www.linkedin.com/in/steven-may-b626b3255/"
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6}>
        <Grid item xs={3}>
          <Avatar
            alt="Mark"
            src={"MARK PIC"}
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        <Grid item xs={9}>
          <Box className="padding-10">
            <Typography variant="h5">Mark Waring</Typography>
            <Typography variant="body2">ABOUT MARK GOES HERE</Typography>
            <IconButton
              color="secondary"
              href="https://github.com/Mark-Waring/"
              target="_blank"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              color="secondary"
              href="https://www.linkedin.com/in/mark-waring-05bb6b57/"
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AboutPage;
