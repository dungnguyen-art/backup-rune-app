import { BitcoinTx } from '@shared/models/transactions/bitcoin-transaction.model';

import { PendingLabel } from '@app/components/transaction/pending-label';
import i18n from '@app/i18n'
interface BitcoinTransactionStatusProps {
  transaction: BitcoinTx;
}
const pendingWaitingMessage = i18n.common.pendingWaitingMessage;
export function BitcoinTransactionStatus({ transaction }: BitcoinTransactionStatusProps) {
  const isPending = !transaction.status.confirmed;
  return isPending ? <PendingLabel pendingWaitingMessage={pendingWaitingMessage} /> : null;
}
