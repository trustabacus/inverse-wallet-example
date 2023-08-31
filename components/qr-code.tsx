import { BarCodeScanner } from 'expo-barcode-scanner';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Button } from './button';
import { CloseIcon, QrCodeIcon } from './icons';
import { SpinnerIcon } from './icons/spinner';
import { View } from './themed';

import Layout from '@/constants/layout';
import { Sizing } from '@/constants/sizing';

type QRCodeScannerResponseType = {
  type: any;
  data: any;
};

type QRCodeScannerProps = {
  onData?: (arg: QRCodeScannerResponseType) => void;
  loading?: boolean;
};

export const QRCodeScanner = (props: QRCodeScannerProps) => {
  const { onData, loading } = props;

  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(true);

  const size = Layout.isSmallDevice ? 175 : 200;

  const requestPermission = async () => {
    const { granted } = await BarCodeScanner.requestPermissionsAsync();

    setHasPermission(granted);
  };

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    onData?.({ type, data });
  };

  const onScanHandler = async () => {
    try {
      if (!hasPermission) {
        await requestPermission();
      }
      setScanned(false);
    } catch {
      setScanned(false);
    }
  };

  return (
    <View
      padding="md"
      style={{ alignSelf: 'center' }}
      border={1}
      borderRadius={24}>
      {!scanned ? (
        <View
          overflow="hidden"
          padding="base"
          flexCenterX
          flexCenterY
          width={size}
          height={size}
          borderRadius={18}
          bg="backgroundFaded">
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={[
              StyleSheet.absoluteFillObject,
              {
                margin: 0,
                padding: 0,
                width: '180%',
                height: '180%',
                left: -40,
              },
            ]}
          />
          <View
            position="absolute"
            bg="transparent"
            style={{ bottom: Sizing[6] }}>
            <Button
              borderRadius={Sizing[10]}
              width={Sizing[10]}
              height={Sizing[10]}
              paddingX={0}
              bg="rgba(255, 255, 255, .2)"
              type="inline"
              leftIcon={<CloseIcon iconColor="text" />}
              onPress={() => setScanned(true)}
            />
          </View>
        </View>
      ) : (
        <View
          padding="base"
          flexCenterX
          flexCenterY
          width={size}
          height={size}
          borderRadius={18}
          bg="backgroundFaded">
          <View marginBottom="lg">
            <QrCodeIcon size="xxxl" />
          </View>
          <Button
            type="inline"
            width={loading ? Sizing[32] : undefined}
            colorScheme="secondary"
            size={Layout.isSmallDevice ? 'sm' : 'sm'}
            text={loading ? '' : 'Scan QR code'}
            leftIcon={loading ? <SpinnerIcon size={Sizing[6]} /> : null}
            onPress={onScanHandler}
          />
        </View>
      )}
    </View>
  );
};
