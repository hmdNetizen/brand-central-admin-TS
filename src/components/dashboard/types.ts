export type RectangularCardItemProps = {
  primaryColor: string;
  secondaryColor: string;
  heading: string;
  numberCount: number;
  path: string;
  cardIcon: JSX.Element;
};

export type CardPropTypes = {
  menuSlideIn: boolean;
};

export type CircularCardProps = {
  numberCount: number;
  heading: string;
  description: string;
  cardBorderColor: string;
};
