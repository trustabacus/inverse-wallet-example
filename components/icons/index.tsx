import Svg, { Path } from 'react-native-svg';

import { SvgIconProps } from './index.type';
import { useThemeColor } from '../themed';

import { TabParamList } from '@/app/(tabs)/_layout';
import { iconSizes } from '@/constants/sizing';

export const HomeIcon = (props: SvgIconProps) => {
  const { lightColor: light, darkColor: dark } = props;
  const iconSize = iconSizes[props.size || 'xs'];

  const stroke = useThemeColor({ light, dark }, props.iconColor || 'iconColor');

  return (
    <Svg
      width={iconSize || 24}
      height={iconSize || 24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      <Path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={props?.strokeWidth || 2}
        d="M9.5 21v-7.4c0-.56 0-.84.109-1.054a1 1 0 0 1 .437-.437C10.26 12 10.54 12 11.1 12h2.8c.56 0 .84 0 1.054.109a1 1 0 0 1 .437.437c.109.214.109.494.109 1.054V21M11.518 2.764 4.735 8.039c-.453.353-.68.53-.843.75a2 2 0 0 0-.318.65c-.074.265-.074.552-.074 1.126V17.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C5.02 21 5.58 21 6.7 21h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874c.218-.428.218-.988.218-2.108v-7.235c0-.574 0-.861-.074-1.126a2.002 2.002 0 0 0-.318-.65c-.163-.22-.39-.397-.843-.75l-6.783-5.275c-.351-.273-.527-.41-.72-.462a1 1 0 0 0-.523 0c-.194.052-.37.189-.721.462Z"
      />
    </Svg>
  );
};

export const ActivityIcon = (props: SvgIconProps) => {
  const { lightColor: light, darkColor: dark } = props;
  const iconSize = iconSizes[props.size || 'xs'];

  const stroke = useThemeColor({ light, dark }, props.iconColor || 'iconColor');

  return (
    <Svg
      width={iconSize || 24}
      height={iconSize || 24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      <Path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={props?.strokeWidth || 2}
        d="M3 8h12m0 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0Zm-6 8h12M9 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </Svg>
  );
};

export const PlusIcon = (props: SvgIconProps) => {
  const { lightColor: light, darkColor: dark } = props;
  const iconSize = iconSizes[props.size || 'xs'];

  const stroke = useThemeColor({ light, dark }, props.iconColor || 'iconColor');

  return (
    <Svg
      width={iconSize || 24}
      height={iconSize || 24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      <Path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={props?.strokeWidth || 2}
        d="M12.5 5.5v14m-7-7h14"
      />
    </Svg>
  );
};

export const CloseIcon = (props: SvgIconProps) => {
  const { lightColor: light, darkColor: dark } = props;
  const iconSize = iconSizes[props.size || 'xs'];

  const stroke = useThemeColor({ light, dark }, props.iconColor || 'iconColor');

  return (
    <Svg
      width={iconSize || 24}
      height={iconSize || 24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      <Path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={props?.strokeWidth || 2}
        d="M18 6 6 18M6 6l12 12"
      />
    </Svg>
  );
};

export const ChevronRightIcon = (props: SvgIconProps) => {
  const { lightColor: light, darkColor: dark } = props;
  const iconSize = iconSizes[props.size || 'xs'];

  const stroke = useThemeColor({ light, dark }, props.iconColor || 'iconColor');

  return (
    <Svg
      width={iconSize || 24}
      height={iconSize || 24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      <Path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={props?.strokeWidth || 2}
        d="m9 18 6-6-6-6"
      />
    </Svg>
  );
};

export const ChevronLeftIcon = (props: SvgIconProps) => {
  const { lightColor: light, darkColor: dark } = props;
  const iconSize = iconSizes[props.size || 'xs'];

  const stroke = useThemeColor({ light, dark }, props.iconColor || 'iconColor');

  return (
    <Svg
      width={iconSize || 24}
      height={iconSize || 24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      <Path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={props?.strokeWidth || 2}
        d="m15 18-6-6 6-6"
      />
    </Svg>
  );
};

export const CheckIcon = (props: SvgIconProps) => {
  const { lightColor: light, darkColor: dark } = props;
  const iconSize = iconSizes[props.size || 'xs'];

  const stroke = useThemeColor({ light, dark }, props.iconColor || 'iconColor');

  return (
    <Svg
      width={iconSize || 24}
      height={iconSize || 24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      <Path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={props?.strokeWidth || 2}
        d="M20 6 9 17l-5-5"
      />
    </Svg>
  );
};

export const WalletIcon = (props: SvgIconProps) => {
  const { lightColor: light, darkColor: dark } = props;
  const iconSize = iconSizes[props.size || 'xs'];

  const stroke = useThemeColor({ light, dark }, props.iconColor || 'iconColor');

  return (
    <Svg
      width={iconSize || 24}
      height={iconSize || 24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      <Path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={props?.strokeWidth || 2}
        d="M16.5 14h.01M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 1-2-2Zm0 0a2 2 0 0 1 2-2h12m0 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
      />
    </Svg>
  );
};

export const CopyIcon = (props: SvgIconProps) => {
  const { lightColor: light, darkColor: dark } = props;
  const iconSize = iconSizes[props.size || 'xs'];

  const stroke = useThemeColor({ light, dark }, props.iconColor || 'iconColor');

  return (
    <Svg
      width={iconSize || 24}
      height={iconSize || 24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      <Path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={props?.strokeWidth || 2}
        d="M5 15c-.932 0-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C2 13.398 2 12.932 2 12V5.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C3.52 2 4.08 2 5.2 2H12c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C15 3.602 15 4.068 15 5m-2.8 17h6.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C22 20.48 22 19.92 22 18.8v-6.6c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C20.48 9 19.92 9 18.8 9h-6.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C9 10.52 9 11.08 9 12.2v6.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C10.52 22 11.08 22 12.2 22Z"
      />
    </Svg>
  );
};

export const QrCodeIcon = (props: SvgIconProps) => {
  const { lightColor: light, darkColor: dark } = props;
  const iconSize = iconSizes[props.size || 'xs'];

  const fill = useThemeColor({ light, dark }, props.iconColor || 'text');

  return (
    <Svg
      width={iconSize || 24}
      height={iconSize || 24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      <Path
        fill={fill}
        fillRule="evenodd"
        d="M24 9.335V24H9.333l.001-5.333H12l-.001 2.667h9.335V12H20V12h-1.333V9.335H24ZM2.667 18.668v2.668h4V24H0v-5.333h2.667Zm16-4v4h-4v-4h4ZM16 .001V12h-2.667V2.668H2.667v10.667H12V16H0v-16h16Zm-5.333 5.334v5.333H5.333V5.335h5.334Zm8-5.335L24 .001v5.332l-2.666-.001V2.667h-2.667V0Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export const MonitorIcon = (props: SvgIconProps) => {
  const { lightColor: light, darkColor: dark } = props;
  const iconSize = iconSizes[props.size || 'xs'];

  const stroke = useThemeColor({ light, dark }, props.iconColor || 'iconColor');

  return (
    <Svg
      width={iconSize || 24}
      height={iconSize || 24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      <Path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={props?.strokeWidth || 2}
        d="M5.5 20H8m9-11h.01M8 6H5.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C2 7.52 2 8.08 2 9.2v3.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C3.52 16 4.08 16 5.2 16H8m7.2 4h3.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C22 18.48 22 17.92 22 16.8V7.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C20.48 4 19.92 4 18.8 4h-3.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C12 5.52 12 6.08 12 7.2v9.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C13.52 20 14.08 20 15.2 20Zm2.8-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
      />
    </Svg>
  );
};

export const NavigationIcons = (
  props: SvgIconProps & { type?: TabParamList }
) => {
  switch (props.type) {
    case 'index':
      return <PlusIcon {...props} />;
    case 'activities':
      return <ActivityIcon {...props} />;
    case 'items':
      return <HomeIcon {...props} />;
    default:
      return null;
  }
};
