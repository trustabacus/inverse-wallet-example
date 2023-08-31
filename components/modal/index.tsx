import { Modal as DefaultModal, TouchableOpacity } from 'react-native';

import {
  LoadingModalProps,
  ModalPositionOptionsData,
  ModalProps,
} from './type';
import { Button } from '../button';
import { LoginForm } from '../form/login';
import { CloseIcon } from '../icons';
import { SpinnerIcon } from '../icons/spinner';
import { ScrollView, Text, View } from '../themed';

import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import { Sizing } from '@/constants/sizing';

export const ModalPositionOptions: ModalPositionOptionsData = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};

export const Modal = (props: ModalProps) => {
  const {
    children,
    onClose,
    title,
    closeOnOverlayClick,
    hideCloseButton,
    showCloseIcon,
    footer,
    minHeight = Layout.isSmallDevice ? '70%' : '65%',
    position = 'bottom',
    contentProps,
    ...rest
  } = props;

  const OnOverlayClickHandler = () => {
    if (closeOnOverlayClick) {
      onClose?.();
    }
  };

  const renderCloseIcon = (hide?: boolean) => {
    return (
      <View opacity={hide ? 0 : 1}>
        <Button
          bg={Colors.dark.transparent}
          rightIcon={<CloseIcon iconColor="textFaded" />}
          width={Sizing[8]}
          height={Sizing[8]}
          onPress={hide ? undefined : onClose}
        />
      </View>
    );
  };

  const renderHeader = () => {
    if (title) {
      return (
        <View
          flexCenterX
          direction="row"
          marginBottom="base"
          borderBottom={1}
          paddingBottom="base"
          marginTop={showCloseIcon ? 'md' : 'base'}>
          {showCloseIcon ? renderCloseIcon(true) : null}
          <View flex={1}>
            <Text
              align="center"
              transform="uppercase"
              size="xs"
              color="textFaded">
              {title}
            </Text>
          </View>
          {showCloseIcon ? renderCloseIcon() : null}
        </View>
      );
    }

    return null;
  };

  return (
    <DefaultModal
      onRequestClose={onClose}
      statusBarTranslucent
      transparent
      animationType="slide"
      {...rest}>
      <View
        bg="backdropBg"
        width="100%"
        flex={1}
        justifyContent={ModalPositionOptions[position]}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
          onPress={OnOverlayClickHandler}
        />
        <View
          borderRadius={24}
          bg="modalBg"
          padding="base"
          overflow="hidden"
          paddingBottom="xxl"
          style={{ minHeight }}
          {...contentProps}>
          {renderHeader()}

          <View flex={1}>
            <ScrollView paddingBottom="xxl" flex={1}>
              {children}
            </ScrollView>
          </View>

          {footer ? <View>{footer}</View> : null}

          {hideCloseButton ? null : (
            <View>
              <Button text="Close" onPress={onClose} />
            </View>
          )}
        </View>
      </View>
    </DefaultModal>
  );
};

export const LoadingModal = (props: LoadingModalProps) => {
  const { loading, ...rest } = props;

  return (
    <Modal
      visible={loading}
      hideCloseButton
      position="center"
      animationType="none"
      contentProps={{
        flexCenter: true,
        size: Sizing[20],
        alignSelf: 'center',
        border: 1,
        padding: 'none',
        paddingBottom: 'none',
        borderRadius: Sizing[3],
        style: { minHeight: Sizing[20] },
      }}
      {...rest}>
      <View size={Sizing[20]} flexCenter>
        <SpinnerIcon />
      </View>
    </Modal>
  );
};

export const LoginModal = (props: ModalProps) => {
  const { ...rest } = props;

  return (
    <Modal title="Login" {...rest}>
      <View>
        <LoginForm
          onCompleted={() => {
            props.onClose?.();
          }}
        />
      </View>
    </Modal>
  );
};
