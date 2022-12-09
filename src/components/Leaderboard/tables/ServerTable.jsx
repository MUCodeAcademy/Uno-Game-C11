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
import { visuallyHidden } from "@mui/utils";

const headCells = [
    {
        id: "gamesstarted",
        numeric: false,
        disablePadding: true,
        label: "Games Started",
    },
    {
        id: "gamescompleted",
        numeric: true,
        disablePadding: false,
        label: "Games Completed",
    },
    {
        id: "gamesdrawn",
        numeric: true,
        disablePadding: false,
        label: "Games Drawn",
    },
    {
        id: "gamesabandonded",
        numeric: true,
        disablePadding: false,
        label: "Games Abandoned",
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

export function ServerTable({ leaderBoard }) {
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
