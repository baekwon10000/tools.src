
import { LocationDescriptor } from "react-router"

export interface Props {
  // children?: undefined;
  className?: string;
  location?: LocationDescriptor;
}

export interface ComponentProps extends Props {
  type: string;
  action: string;
}
