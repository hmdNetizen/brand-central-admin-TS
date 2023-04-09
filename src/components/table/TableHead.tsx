import React from "react";
import PropTypes from "prop-types";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TableHeaderColumnTypes } from "src/lib/dataset/tableDataTypes";

type HeaderColumnsType = {
  headerColumns: TableHeaderColumnTypes[];
};

const TableHeader = ({ headerColumns }: HeaderColumnsType) => {
  return (
    <TableHead>
      <TableRow>
        {headerColumns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{
              minWidth: column.hasOwnProperty("minWidth") ? column.minWidth : 0,
              fontWeight: 600,
              fontSize: "1.5rem",
              width: column.label === "Photo" ? 100 : undefined,
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
