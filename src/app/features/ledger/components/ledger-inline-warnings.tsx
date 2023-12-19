import { styled } from 'leather-styles/jsx';

import { SupportedBlockchains } from '@shared/constants';

import { WarningLabel } from '@app/components/warning-label';
import { Capitalize } from '@app/ui/utils/capitalize';

import { isStacksLedgerAppClosed } from '../utils/stacks-ledger-utils';
import i18n from "@app/i18n";

interface RequiresChainProp {
  chain: SupportedBlockchains;
}

interface CommonLedgerInlineWarningsProps extends RequiresChainProp {
  latestDeviceResponse: any | null;
  outdatedLedgerAppWarning?: boolean;
}

function OutdatedLedgerAppWarning({ chain }: RequiresChainProp) {
  return (
    <WarningLabel textAlign="left">
      Latest version of <Capitalize>{chain} app</Capitalize> required
      <styled.a href="ledgerlive://manager" textDecoration="underline">
        {i18n.common.updateLedger}
      </styled.a>
    </WarningLabel>
  );
}

function LedgerDeviceLockedWarning({ chain }: RequiresChainProp) {
  return (
    <WarningLabel textAlign="left">
      Your Ledger is locked. Unlock it and open the {''}
      <Capitalize>{chain}</Capitalize>
      {''} app to continue.
    </WarningLabel>
  );
}

function LedgerAppClosedWarning({ chain }: RequiresChainProp) {
  return (
    <WarningLabel textAlign="left">
      The <Capitalize>{chain}</Capitalize> app appears to be closed on Ledger. Open it to continue.
    </WarningLabel>
  );
}

export function CommonLedgerDeviceInlineWarnings({
  chain,
  latestDeviceResponse,
  outdatedLedgerAppWarning = false,
}: CommonLedgerInlineWarningsProps) {
  if (!latestDeviceResponse) return null;

  if (outdatedLedgerAppWarning) {
    return <OutdatedLedgerAppWarning chain={chain} />;
  }
  if (latestDeviceResponse.deviceLocked) return <LedgerDeviceLockedWarning chain={chain} />;
  if (isStacksLedgerAppClosed(latestDeviceResponse))
    return <LedgerAppClosedWarning chain={chain} />;
  return null;
}

//i18n-variable
