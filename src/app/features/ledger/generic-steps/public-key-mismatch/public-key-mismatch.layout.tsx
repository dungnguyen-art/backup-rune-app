import { Box, Flex, styled } from 'leather-styles/jsx';

import { ConnectLedgerErr } from '@app/features/ledger/illustrations/ledger-illu-connect-ledger-error';
import { LeatherButton } from '@app/ui/components/button';
import i18n from '@app/i18n'

import { LedgerWrapper } from '../../components/ledger-wrapper';

interface PublicKeyMismatchLayoutProps {
  onClose(): void;
  onTryAgain(): void;
}
export function PublicKeyMismatchLayout({ onClose, onTryAgain }: PublicKeyMismatchLayoutProps) {
  return (
    <LedgerWrapper>
      <Box>
        <ConnectLedgerErr />
      </Box>
      <styled.span mt="space.06" textStyle="label.01">
          {i18n.common.publicKeyNotMatch}
      </styled.span>
      <styled.span mt="space.03" lineHeight="24px" textStyle="caption.01">
          {i18n.common.noteUseLedger}
      </styled.span>
      <Flex mt="space.04">
        <LeatherButton variant="outline" mr="space.03" onClick={onClose}>
            {i18n.button.close}
        </LeatherButton>
        <LeatherButton onClick={onTryAgain}>{i18n.button.tryAgain}</LeatherButton>
      </Flex>
    </LedgerWrapper>
  );
}
