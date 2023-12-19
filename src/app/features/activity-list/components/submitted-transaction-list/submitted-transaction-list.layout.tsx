import { ReactNode, useMemo } from 'react';

import { deserializeTransaction } from '@stacks/transactions';
import { Stack, styled } from 'leather-styles/jsx';

import { SubmittedTransactionItem } from '@app/features/activity-list/components/submitted-transaction-list/submitted-transaction-item';
import { SubmittedTransaction } from '@app/store/submitted-transactions/submitted-transactions.slice';

import i18n from '@app/i18n'

type SubmittedTransactionListItemProps = SubmittedTransaction;

export function SubmittedTransactionListItem({ rawTx, txId }: SubmittedTransactionListItemProps) {
  const submittedTx = useMemo(() => deserializeTransaction(rawTx), [rawTx]);
  return <SubmittedTransactionItem transaction={submittedTx} txId={txId} />;
}

interface SubmittedTransactionListLayoutProps {
  children: ReactNode;
}
export function SubmittedTransactionListLayout({ children }: SubmittedTransactionListLayoutProps) {
  return (
    <>
      <styled.span textStyle="body.02" color="accent.text-subdued">
        {i18n.common.submitted}
      </styled.span>
      <Stack mt="space.04" pb="space.06" gap="space.05">
        {children}
      </Stack>
    </>
  );
}
