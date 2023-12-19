import { TransactionTypes } from '@stacks/connect';

import { stacksValue } from '@app/common/stacks-utils';
import { EventCard } from '@app/components/event-card';
import { useTransactionRequestState } from '@app/store/transactions/requests.hooks';
import { truncateMiddle } from '@app/ui/utils/truncate-middle';
import i18n from '@app/i18n'

export function StxPostCondition(): React.JSX.Element | null {
  const pendingTransaction = useTransactionRequestState();

  if (!pendingTransaction || pendingTransaction.txType !== TransactionTypes.STXTransfer)
    return null;

  return (
    <EventCard
      title={i18n.common.stxPostCondition}
      icon="STX"
      amount={stacksValue({ value: pendingTransaction.amount, withTicker: false })}
      ticker="STX"
      left="Stacks Token"
      right={
        pendingTransaction.txType === TransactionTypes.STXTransfer
          ? `To ${truncateMiddle(pendingTransaction.recipient, 4)}`
          : undefined
      }
    />
  );
}
