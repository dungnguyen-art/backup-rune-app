import { StacksTransaction } from '@stacks/transactions';
import { Box, HStack, Stack } from 'leather-styles/jsx';

import { useStacksExplorerLink } from '@app/common/hooks/use-stacks-explorer-link';
import { getTxSenderAddress } from '@app/common/transactions/stacks/transaction.utils';
import { usePressable } from '@app/components/item-hover';
import { Tooltip } from '@app/components/tooltip';
import { TransactionTitle } from '@app/components/transaction/transaction-title';
import { Caption } from '@app/ui/components/typography/caption';
import { Title } from '@app/ui/components/typography/title';

import { SubmittedTransactionIcon } from './submitted-transaction-icon';
import { getSubmittedTransactionDetails } from './submitted-transaction-list.utils';
import i18n from '@app/i18n'

interface SubmittedTransactionItemProps {
  transaction: StacksTransaction;
  txId: string;
}
export function SubmittedTransactionItem({ transaction, txId }: SubmittedTransactionItemProps) {
  const [component, bind] = usePressable(true);
  const { handleOpenStacksTxLink: handleOpenTxLink } = useStacksExplorerLink();

  if (!transaction) return null;

  const submittedTransactionDetails = getSubmittedTransactionDetails({
    payload: transaction.payload,
    senderAddress: getTxSenderAddress(transaction),
    txId,
  });

  if (!submittedTransactionDetails) return null;

  const { caption, title, value } = submittedTransactionDetails;

  return (
    <Box {...bind}>
      <HStack
        alignItems="center"
        onClick={() =>
          handleOpenTxLink({
            suffix: `&submitted=true`,
            txid: txId,
          })
        }
        position="relative"
        gap="space.04"
        zIndex={2}
      >
        <SubmittedTransactionIcon transaction={transaction} />
        <HStack alignItems="center" flexGrow={1} justifyContent="space-between">
          <Stack minWidth="0px" gap="space.03">
            <TransactionTitle title={title} />
            <Stack flexWrap="wrap">
              <Caption>{caption}</Caption>
              <Tooltip
                placement="bottom"
                label={i18n.common.submittedTransactionItem}
              >
                <Caption>{i18n.errorMessages.submitted}</Caption>
              </Tooltip>
            </Stack>
          </Stack>
          <Box alignItems="flex-end">{value && <Title fontWeight="normal">{value}</Title>}</Box>
        </HStack>
      </HStack>
      {component}
    </Box>
  );
}
