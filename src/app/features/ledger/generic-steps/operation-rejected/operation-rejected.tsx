import { useLocationState } from '@app/common/hooks/use-location-state';
import { LedgerOperationRejectedLayout } from '@app/features/ledger/generic-steps/operation-rejected/operation-rejected.layout';
import { useLedgerNavigate } from '@app/features/ledger/hooks/use-ledger-navigate';
import i18n from '@app/i18n'
export function OperationRejected() {
  const ledgerNavigate = useLedgerNavigate();
  const description = useLocationState<string>(
    i18n.common.descriptionName,
    i18n.common.descriptionValue
  );
  return (
    <LedgerOperationRejectedLayout
      description={description}
      onClose={() => ledgerNavigate.cancelLedgerAction()}
    />
  );
}
