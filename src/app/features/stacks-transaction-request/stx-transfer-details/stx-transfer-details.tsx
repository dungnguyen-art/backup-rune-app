import { Stack } from 'leather-styles/jsx';

import { AttachmentRow } from '@app/features/stacks-transaction-request/attachment-row';
import { Row } from '@app/features/stacks-transaction-request/row';
import { useTransactionRequestState } from '@app/store/transactions/requests.hooks';
import { Title } from '@app/ui/components/typography/title';
import i18n from '@app/i18n'

export function StxTransferDetails(): React.JSX.Element | null {
  const pendingTransaction = useTransactionRequestState();

  if (!pendingTransaction || pendingTransaction.txType !== 'token_transfer') {
    return null;
  }

  return (
    <Stack
      border="4px solid"
      borderColor="accent.border-default"
      borderRadius="md"
      mb="space.05"
      px="space.04"
      py="space.06"
      gap="space.05"
    >
      <Title>{i18n.common.transferDetails}</Title>
      <Stack gap="space.04">
        <Row name="Recipient" type="Principal" value={pendingTransaction.recipient} />
        <Row name="Amount" type="uSTX" value={pendingTransaction.amount} />
        {pendingTransaction.memo && (
          <Row name="Memo" type="string" value={pendingTransaction.memo} />
        )}
        {pendingTransaction.attachment && <AttachmentRow />}
      </Stack>
    </Stack>
  );
}
