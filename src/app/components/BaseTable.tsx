import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Image from "next/image";
import BaseButton from "@/app/components/BaseButton";
import {Product} from "@/app/types/product";

export type Header = {
  label: string;
  value: string | Action[];
  isImage?: boolean;
  isAction?: boolean;
}

export type BaseTableProps =  {
  headers: Header[];
  rows: Product[];
  page?: number;
}
export type Action =  {
  label: string;
  value: string;
}

const BaseTable: React.FC<BaseTableProps> = ({ headers, rows }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "1px solid #ddd",
        maxHeight: "80vh",
        overflowY: "auto"
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
                    row[header.value] ? ( // Kiểm tra nếu có ảnh
                      <div className="relative mt-3 w-32 h-32">
                        <Image
                          src={row[header.value] as string} // Dùng ảnh mặc định nếu không có
                          alt="Preview"
                          layout="fill"
                          objectFit="cover"
                          className="rounded"
                        />
                      </div>
                    ) : null
                  ) : header.isAction ? (
                    Array.isArray(header.value) ? (
                      header.value.map((action, actionIndex) => (
                        <BaseButton
                          key={actionIndex}
                          className="bg-blue-500 text-white py-2 hover:bg-blue-600 transition cursor-pointer mt-5 rounded-lg mr-1"
                        >
                          {action.label}
                        </BaseButton>
                      ))
                    ) : null
                  ) : (
                    row[header.value] || ""
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
