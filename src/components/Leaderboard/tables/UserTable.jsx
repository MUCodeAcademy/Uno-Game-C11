import React, { useMemo } from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Paper,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import { auth } from "../../../firebase.config";

const headCells = [
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Player Name",
    },
    {
        id: "pct",
        numeric: true,
        disablePadding: false,
        label: "Win Percentage",
    },
    {
        id: "played",
        numeric: true,
        disablePadding: false,
        label: "Total Games Played",
    },
    {
        id: "won",
        numeric: true,
        disablePadding: false,
        label: "Total Games Won",
    },
    {
        id: "lost",
        numeric: true,
        disablePadding: false,
        label: "Total Games Lost",
    },
    {
        id: "stalemate",
        numeric: true,
        disablePadding: false,
        label: "Total Games Drawn",
    },
];

export function EnhancedTableHead(props) {
    const { order, orderBy } = props;

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={index}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                    >
                        <TableSortLabel>
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

//!
//!

export function UserTable({ leaderBoard }) {
    const personalStats = useMemo(
        () => leaderBoard.find((user) => user.uid === auth.currentUser?.uid),
        [leaderBoard, auth.currentUser?.uid]
    );
    return (
        <>
            {personalStats && (
                <Box sx={{ width: "100%" }}>
                    <Paper sx={{ width: "100%", mb: 2 }}>
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={"medium"}
                            >
                                <EnhancedTableHead rowCount={1} />
                                <TableBody>
                                    <TableRow hover role="checkbox" tabIndex={-1}>
                                        <TableCell component="th" scope="row" padding="none">
                                            {personalStats.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {personalStats.pct}%
                                        </TableCell>
                                        <TableCell align="right">
                                            {personalStats.played}
                                        </TableCell>
                                        <TableCell align="right">
                                            {personalStats.won}
                                        </TableCell>
                                        <TableCell align="right">
                                            {personalStats.lost}
                                        </TableCell>
                                        <TableCell align="right">
                                            {personalStats.drawn}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            )}
        </>
    );
}
