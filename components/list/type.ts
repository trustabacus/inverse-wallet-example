import { ViewProps } from '../themed/type';

export interface TextListProps extends ViewProps {
  title?: string;
  data?: string | string[];
}

export interface InfoListProps extends ViewProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}
