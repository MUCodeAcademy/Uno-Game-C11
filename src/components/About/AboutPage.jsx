import React from "react";
import { Avatar, Box, Button, Grid, IconButton, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Gabe from "./Gabe.jpg";
import Mark from "./Mark.jpg";
import Steven from "./Steven.jpg";
import Tom from "./Tom.jpg";
import GabePopover from "./GabePopover";

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
                <Grid item xs={12} md={3} justifyContent="center" display="flex">
                    <Avatar alt="Gabe" src={Gabe} sx={{ width: 100, height: 100 }} />
                </Grid>
                <Grid item xs={12} md={9}>
                    <Box className="padding-10">
                        <Typography variant="h5"> Gabe Bierman</Typography>
                        <Typography
                            variant="body2"
                            style={{ marginLeft: "15px", textAlign: "left" }}
                        >
                            I'm a junior developer with a long history working in IT and a
                            formal education in music and audio engineering. My experience
                            working with music informatics and MIR while in college gave me a
                            love of working at the crossroads between music and technology,
                            something that drove me into attending the Midland University Code
                            Academy. During my time here I've gained hands-on experience with
                            full-stack development languages and methodologies and I can't wait
                            to continue to learn and grow as much as possible in my career as a
                            developer!
                        </Typography>
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
                        <GabePopover></GabePopover>
                    </Box>
                </Grid>
            </Grid>
            <Grid container item xs={12} sm={6}>
                <Grid item xs={12} md={3} justifyContent="center" display="flex">
                    <Avatar alt="Tom" src={Tom} sx={{ width: 100, height: 100 }} />
                </Grid>
                <Grid item xs={12} md={9}>
                    <Box className="padding-10">
                        <Typography variant="h5"> Tom Heafey</Typography>
                        <Typography
                            variant="body2"
                            style={{ marginLeft: "15px", textAlign: "left" }}
                        >
                            Hello! I'm a junior developer with a background in tech
                            support/system administration. In my previous role, I began
                            teaching myself programming to automate tasks in Python and
                            PowerShell, which is what sparked my interest in a career change.
                        </Typography>
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
                <Grid item xs={12} md={3} justifyContent="center" display="flex">
                    <Avatar src={Steven} alt="Steven" sx={{ width: 100, height: 100 }} />
                </Grid>
                <Grid item xs={12} md={9}>
                    <Box className="padding-10">
                        <Typography variant="h5">Steven May</Typography>
                        <Typography
                            variant="body2"
                            style={{ marginLeft: "15px", textAlign: "left" }}
                        >
                            I was a student at the University of Nebraska Omaha where I learned
                            to program. A friend of mine had taken the Code Academy class at
                            Midland University and recommended it to me. At Code Academy I
                            learned full stack development and how to program with a team.
                        </Typography>
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
                <Grid item xs={12} md={3} justifyContent="center" display="flex">
                    <Avatar alt="Mark" src={Mark} sx={{ width: 100, height: 100 }} />
                </Grid>
                <Grid item xs={12} md={9}>
                    <Box className="padding-10">
                        <Typography variant="h5">Mark Waring</Typography>
                        <Typography
                            variant="body2"
                            style={{ marginLeft: "15px", textAlign: "left" }}
                        >
                            I'm a junior developer based out of Omaha, NE. I'm a graduate of
                            St. John's University in Collegeville, MN and completed the Midland
                            University Code Academy in 2022. I began my development career as a
                            database analyst for Signature Performance later that year. In my
                            spare time I enjoy spending time with family and friends, coaching
                            high school baseball, and playing the piano.
                        </Typography>
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
