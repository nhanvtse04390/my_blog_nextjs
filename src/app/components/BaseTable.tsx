import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import noImage from "@/app/images/noImage.png";
import Image from "next/image";

export type Header<T> = {
    label: string;
    value?: keyof T;  // ✅ Cho phép giá trị là key của T (nếu không có renderCell)
    isImage?: boolean;
    renderCell?: (row: T) => React.ReactNode;  // ✅ Cho phép parent truyền JSX
};

export type BaseTableProps<T> = {
    headers: Header<T>[];
    rows: T[];
};

const BaseTable = <T, >({ headers, rows }: BaseTableProps<T>) => {
    return (
      <TableContainer
        component={Paper}
        sx={{ border: "1px solid #ddd", maxHeight: "80vh", overflowY: "auto" }}
      >
          <Table stickyHeader>
              <TableHead>
                  <TableRow>
                      {headers.map((header, index) => (
                        <TableCell key={index} sx={{ fontWeight: "bold", minWidth: "150px" }}>
                            {header.label}
                        </TableCell>
                      ))}
                  </TableRow>
              </TableHead>
              <TableBody>
                  {rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {headers.map((header, headerIndex) => (
                          <TableCell
                            key={headerIndex}
                            sx={{
                                minWidth: "150px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "200px",
                            }}
                          >
                              {header.renderCell ? (
                                header.renderCell(row)
                              ) : header.isImage ? (
                                <Image
                                  src={
                                      Array.isArray(row[header.value!]) && (row[header.value!] as string[]).length > 0
                                        ? (row[header.value!] as string[])[0] // Ép kiểu về string[]
                                        : typeof row[header.value!] === "string"
                                          ? (row[header.value!] as string)
                                          : noImage
                                  }
                                  alt="Preview"
                                  className="rounded"
                                  width={50}
                                  height={50}
                                />
                              ) : header.value ? (
                                row[header.value] !== undefined ? String(row[header.value]) : "-"
                              ) : (
                                "-"
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
