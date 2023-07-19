import { SalesPersonReturnedPayload } from "src/services/salespersons/SalesPersonTypes";

export type SalesPersonsPageLayoutProps = {
  title: "Salespersons" | "Deactivated Salespersons";
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  filterText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  openEditSalesperson: boolean;
  setOpenEditSalesperson: React.Dispatch<React.SetStateAction<boolean>>;
  openDeleteSalesperson: boolean;
  setOpenDeleteSalesperson: React.Dispatch<React.SetStateAction<boolean>>;
  salesPersonsDataset: SalesPersonReturnedPayload[];
};
