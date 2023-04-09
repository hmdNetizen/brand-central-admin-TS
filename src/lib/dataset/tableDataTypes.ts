export type TableHeaderColumnTypes = {
  id: number;
  label: string;
  align: "left" | "center" | "right" | "justify" | "inherit" | undefined;
  minWidth?: string | number;
};
