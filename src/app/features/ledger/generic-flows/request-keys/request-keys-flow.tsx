import { Outlet, useNavigate } from 'react-router-dom';

import { useScrollLock } from '@app/common/hooks/use-scroll-lock';
import { BaseDrawer } from '@app/components/drawer/base-drawer';

import { LedgerRequestKeysContext, LedgerRequestKeysProvider } from './ledger-request-keys.context';
import i18n from '@app/i18n'
interface RequestKeysFlowProps {
  context: LedgerRequestKeysContext;
  isActionCancellableByUser: boolean;
  onCancelConnectLedger?(): void;
}
export function RequestKeysFlow({
  context,
  isActionCancellableByUser,
  onCancelConnectLedger,
}: RequestKeysFlowProps) {
  const navigate = useNavigate();
  useScrollLock(true);

  return (
    <LedgerRequestKeysProvider value={context}>
      <BaseDrawer
        isShowing
        isWaitingOnPerformedAction={isActionCancellableByUser}
        onClose={onCancelConnectLedger ? onCancelConnectLedger : () => navigate('../')}
        pauseOnClickOutside
        waitingOnPerformedActionMessage={i18n.common.ledgerInUse}
      >
        <Outlet />
      </BaseDrawer>
    </LedgerRequestKeysProvider>
  );
}
