import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Image from "next/image";
import noImage from '../images/noImage.png'

export type Header<T> = {
    label: string;
    value: keyof T;  // ✅ Đảm bảo value là key của T
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
                                        <Image
                                            src={row[header.value] ? (row[header.value] as string) : noImage}
                                            alt="Preview"
                                            width={50}
                                            height={50}
                                        />
                                    ) : (
                                        row[header.value]
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
