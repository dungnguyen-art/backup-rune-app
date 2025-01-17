import { Box, Flex, styled } from 'leather-styles/jsx';

import { ConnectLedgerErr } from '@app/features/ledger/illustrations/ledger-illu-connect-ledger-error';
import { LeatherButton } from '@app/ui/components/button';

import { LedgerWrapper } from '../../components/ledger-wrapper';

interface LedgerDeviceInvalidPayloadLayoutProps {
  onClose(): void;
}
export function LedgerDeviceInvalidPayloadLayout({
  onClose,
}: LedgerDeviceInvalidPayloadLayoutProps) {
  return (
    <LedgerWrapper>
      <Box>
        <ConnectLedgerErr />
      </Box>
      <styled.span mt="space.06" textStyle="label.01">
        Data Invalid
      </styled.span>
      <styled.span mt="space.03" lineHeight="24px" textStyle="caption.01">
        Your Ledger device has rejected the payload stating it is invalid
      </styled.span>
      <Flex mt="space.04">
        <LeatherButton variant="outline" mr="space.03" onClick={onClose}>
          Close
        </LeatherButton>
      </Flex>
    </LedgerWrapper>
  );
}
