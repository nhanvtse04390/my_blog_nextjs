import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Image from "next/image";
import {Product} from "@/app/types/product";
import {Header} from "@/app/types/TableHeader";

export type BaseTableProps = {
  headers: Header[];
  rows: Product[];
};

const BaseTable: React.FC<BaseTableProps> = ({headers, rows}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "1px solid #ddd",
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index} sx={{fontWeight: "bold"}}>
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
                    row[header.value] ? (
                      <div className="relative mt-3 w-32 h-32">
                        <Image
                          src={row[header.value] as string} // ✅ Đảm bảo kiểu dữ liệu đúng
                          alt="Preview"
                          layout="fill"
                          objectFit="cover"
                          className="rounded"
                        />
                      </div>
                    ) : (
                      "Không có ảnh"
                    )
                  ) : (
                    row[header.value] || "—"
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
