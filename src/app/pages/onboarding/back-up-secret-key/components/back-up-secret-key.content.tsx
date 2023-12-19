import { HStack, Stack, styled } from 'leather-styles/jsx';

import { EyeSlashIcon } from '@app/ui/components/icons/eye-slash-icon';
import { LockIcon } from '@app/ui/components/icons/lock-icon';
import { RotateLeftIcon } from '@app/ui/components/icons/rotate-left-icon';
import i18n from '@app/i18n'

export function BackUpSecretKeyContent(): React.JSX.Element {
  return (
    <>
      <styled.h1
        textStyle={['heading.03', 'heading.03', 'heading.03', 'display.02']}
        mt="space.00"
        mb="space.06"
      >
        Back up your <br /> Secret Key
      </styled.h1>
      <styled.p textStyle={['label.01', 'heading.05']} mb="space.06">
        {i18n.common.secretKey}
      </styled.p>
      <styled.p textStyle={['label.01', 'heading.05']} mb="space.06">
        {i18n.common.backUpSecretKey}
      </styled.p>

      <Stack gap="space.03">
        <HStack alignItems="center" margin={['auto', 'auto', 'auto', 'unset']}>
          <RotateLeftIcon />
          <styled.span textStyle="body.01">{i18n.common.noteSecretKey}</styled.span>
        </HStack>
        <HStack alignItems="center" margin={['auto', 'auto', 'auto', 'unset']}>
          <EyeSlashIcon size="16px" />
          <styled.span textStyle="body.01">{i18n.common.neverShareSecretKey}</styled.span>
        </HStack>
        <HStack alignItems="center" margin={['auto', 'auto', 'auto', 'unset']} mb="space.05">
          <LockIcon size="16px" />
          <styled.span textStyle="body.01">{i18n.common.storeSecretKeyPrivate}</styled.span>
        </HStack>
      </Stack>
    </>
  );
}
