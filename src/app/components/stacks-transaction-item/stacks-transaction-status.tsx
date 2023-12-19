import { styled } from 'leather-styles/jsx';

import { StacksTx } from '@shared/models/transactions/stacks-transaction.model';

import { isPendingTx } from '@app/common/transactions/stacks/transaction.utils';
import { Tooltip } from '@app/components/tooltip';

import { MicroblockLabel } from '../transaction/microblock-label';
import { PendingLabel } from '../transaction/pending-label';
import i18n from '@app/i18n'

interface TransactionStatusProps {
  transaction: StacksTx;
}
export function StacksTransactionStatus({ transaction }: TransactionStatusProps) {
  const isPending = isPendingTx(transaction);
  const isFailed = !isPending && transaction.tx_status !== 'success';
  const isInMicroblock =
    !isPending && transaction.tx_status === 'success' && transaction.is_unanchored;

  return (
    <>
      {isPending && <PendingLabel />}
      {isInMicroblock && <MicroblockLabel />}
      {isFailed && (
        <Tooltip label={transaction.tx_status} placement="bottom">
          <styled.span color="error.label" textStyle="label.03">
            {i18n.common.transactionStatusFailed}
          </styled.span>
        </Tooltip>
      )}
    </>
  );
}
