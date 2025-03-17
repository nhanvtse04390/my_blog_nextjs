import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

export type Header<T> = {
    label: string;
    value: keyof T; // Chỉ định value là key của T
    isImage?: boolean;
};

export type BaseTableProps<T> = {
    headers: Header<T>[];
    rows: T[];
};

const BaseTable = <T,>({ headers, rows }: BaseTableProps<T>) => {
    return (
        <TableContainer component={Paper} sx={{ border: "1px solid #ddd" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell key={index} sx={{ fontWeight: "bold" }}>
                                {header.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {headers.map((header, headerIndex) => (
                                <TableCell key={headerIndex}>
                                    {header.isImage ? (
                                        <img
                                            src={row[header.value] as string}
                                            alt="Preview"
                                            style={{ width: "50px", height: "50px" }}
                                        />
                                    ) : (
                                        String(row[header.value])
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BaseTable;
