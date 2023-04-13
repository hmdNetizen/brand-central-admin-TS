import React from "react";
import { TableHeaderColumnTypes } from "src/lib/dataset/tableDataTypes";

export type TablePropsType = {
  headerColumns: TableHeaderColumnTypes[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
  total: number;
  loading: boolean;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  hasPagination: boolean;
  notFoundText: string;
  loaderHeight: string | number;
  notFoundHeight: string | number;
  hasShadow: boolean;
};
