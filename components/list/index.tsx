import { InfoListProps, TextListProps } from './type';
import { Text, View } from '../themed';

import { isArray } from '@/helpers/base';

export const TextList = (props: TextListProps) => {
  const { title, data, ...rest } = props;

  const items = isArray(data) ? (data as string[]) : data ? [data] : [];

  if (!title && (!items || items.length === 0)) {
    return null;
  }

  return (
    <View marginBottom="base" paddingY="base" borderBottom={1} {...rest}>
      <Text weight="semiBold" size="sm">
        {title}
      </Text>

      <View style={{ flexWrap: 'wrap' }} direction="row" flexCenterX>
        {items.length > 0 ? (
          items.map((item, index) => (
            <View marginRight="sm" marginBottom="sm" key={`${item}-${index}`}>
              <Text color="textFaded" size="xs">
                {item} {items.length > 1 ? '|' : ''}
              </Text>
            </View>
          ))
        ) : (
          <View marginBottom="sm">
            <Text color="textFaded" size="sm">
              -
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export const InfoList = (props: InfoListProps) => {
  const { title, description, icon, ...rest } = props;

  if (!title && !description) {
    return null;
  }

  return (
    <View flexCenter {...rest}>
      {icon || null}

      <View marginTop="lg">
        <Text weight="semiBold" size="lg" align="center">
          {title}
        </Text>

        <View marginTop="md">
          <Text align="center" color="textFaded" size="sm">
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const TextRowList = (props: TextListProps) => {
  const { title, data, ...rest } = props;

  const items = isArray(data) ? (data as string[]) : data ? [data] : [];

  if (!title && (!items || items.length === 0)) {
    return null;
  }

  return (
    <View
      direction="row"
      flexCenterX
      paddingY="base"
      borderBottom={1}
      {...rest}>
      <View flex={1}>
        <Text weight="semiBold" color="textFaded" size="xs">
          {title}
        </Text>
      </View>

      <View style={{ flexWrap: 'wrap' }} direction="row" flexCenterX>
        {items.length > 0 ? (
          items.map((item, index) => (
            <View marginRight="sm" marginBottom="sm" key={`${item}-${index}`}>
              <Text size="sm">
                {item} {items.length > 1 ? '|' : ''}
              </Text>
            </View>
          ))
        ) : (
          <View marginBottom="sm">
            <Text size="sm">-</Text>
          </View>
        )}
      </View>
    </View>
  );
};
