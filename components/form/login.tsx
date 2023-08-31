import { LoginFormProps } from './type';
import { QRCodeScanner } from '../qr-code';
import { Text, View } from '../themed';
import { showToast } from '../toast';

import { useAppDispatch } from '@/hooks';
import { setGlobalCredentials } from '@/redux/reducers/global';
import { useGenerateMobileWalletConfigsMutation } from '@/services/api';

export const LoginForm = (props: LoginFormProps) => {
  const { onCompleted } = props;

  const dispatch = useAppDispatch();

  const [generateWallet, { isLoading }] =
    useGenerateMobileWalletConfigsMutation();

  const loading = isLoading;

  const onQRHandler = async (token: string) => {
    console.log({ token });
    try {
      dispatch(setGlobalCredentials({ token }));
      const addressDetails = await generateWallet().unwrap();
      dispatch(
        setGlobalCredentials({
          addressDetails,
        })
      );
      console.log({ addressDetails });
      showToast({ text: 'You`ve logged in successfully' });
      onCompleted?.();
    } catch (error) {
      console.log({ error });
      showToast({ text: 'Something went wrong, try again', type: 'danger' });
    }
  };

  return (
    <View>
      <View paddingX="base" marginY="base">
        <Text size="sm" align="center">
          To log into your wallet, visit your profile on the inverse website and
          scan the QR code located there.
        </Text>
      </View>

      <View>
        <QRCodeScanner
          loading={loading}
          onData={(res) => {
            onQRHandler(res.data);
          }}
        />
      </View>
    </View>
  );
};
