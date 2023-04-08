import { IconType } from "react-icons";

export type SubMenuTypes = {
  subId: number;
  title: string;
  path: string;
};

export type MenuTypes = {
  id: number;
  title: string;
  icon: IconType;
  path: string;
  subMenus?: SubMenuTypes[];
};
