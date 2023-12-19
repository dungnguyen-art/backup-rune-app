import { useContext } from 'react';

import { Box, Flex } from 'leather-styles/jsx';

import { DeviceOperationApprovalStatus } from '@app/features/ledger/components/device-approval-status';
import { LedgerScreenDetail } from '@app/features/ledger/components/ledger-screen-detail';
import { LedgerTitle } from '@app/features/ledger/components/ledger-title';
import { LedgerWrapper } from '@app/features/ledger/components/ledger-wrapper';
import { ledgerJwtSigningContext } from '@app/features/ledger/flows/jwt-signing/ledger-sign-jwt.context';
import { useHasApprovedOperation } from '@app/features/ledger/hooks/use-has-approved-transaction';
import { SignLedgerTransaction } from '@app/features/ledger/illustrations/ledger-illu-sign-ledger-transaction';
import i18n from '@app/i18n'
export function SignJwtHash() {
  const { jwtPayloadHash } = useContext(ledgerJwtSigningContext);
  const hasApprovedOperation = useHasApprovedOperation();

  return (
    <LedgerWrapper>
      <Box mt="space.02">
        <SignLedgerTransaction />
      </Box>
      <LedgerTitle mt="space.05" mx="space.08">
        {i18n.common.approveJWT}
      </LedgerTitle>
      <DeviceOperationApprovalStatus
        status={hasApprovedOperation ? 'approved' : 'awaiting-approval'}
      />
      <Flex
        bg="accent.component-background-default"
        borderRadius="lg"
        flexDirection="column"
        textAlign="left"
        px="space.06"
        py="space.06"
        width="100%"
      >
        <LedgerScreenDetail
          title="JWT Hash"
          tooltipLabel={i18n.common.ledgerToolTipLabel}
        >
          {jwtPayloadHash}
        </LedgerScreenDetail>
      </Flex>
    </LedgerWrapper>
  );
}
