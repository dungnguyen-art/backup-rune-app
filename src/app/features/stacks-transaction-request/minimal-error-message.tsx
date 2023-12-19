import { Suspense, memo } from 'react';

import { TransactionRequestSelectors } from '@tests/selectors/requests.selectors';
import { HStack, HstackProps, styled } from 'leather-styles/jsx';

import { useTransactionError } from '@app/features/stacks-transaction-request/hooks/use-transaction-error';
import { TransactionErrorReason } from '@app/features/stacks-transaction-request/transaction-error/transaction-error';
import { ErrorIcon } from '@app/ui/components/icons/error-icon';
import i18n from '@app/i18n'
function MinimalErrorMessageSuspense(props: HstackProps) {
  const error = useTransactionError();

  if (!error) return null;

  const getTitle = () => {
    if (error) {
      switch (error) {
        case TransactionErrorReason.Unauthorized:
          return i18n.common.transactionErrorReasonUnauthorized;
        case TransactionErrorReason.NoContract:
          return i18n.common.transactionErrorReasonNoContract;
        case TransactionErrorReason.InvalidContractAddress:
          return i18n.common.transactionErrorReasonInvalidContractAddress;
        case TransactionErrorReason.StxTransferInsufficientFunds:
        case TransactionErrorReason.FeeInsufficientFunds:
          return i18n.common.transactionErrorReasonFeeInsufficientFunds;
        case TransactionErrorReason.Generic:
          return i18n.errorMessages.default;
      }
    }
    return null;
  };

  return (
    <HStack
      alignItems="center"
      // #4476 TODO change this colour
      bg="#FCEEED"
      borderRadius="md"
      color="error.label"
      p="space.04"
      width="100%"
      {...props}
    >
      <ErrorIcon />
      <styled.span data-testid={TransactionRequestSelectors.ErrorMessage} textStyle="caption.01">
        {getTitle()}
      </styled.span>
    </HStack>
  );
}

function MinimalErrorMessageBase(props: HstackProps) {
  return (
    <Suspense fallback={<></>}>
      <MinimalErrorMessageSuspense {...props} />
    </Suspense>
  );
}

export const MinimalErrorMessage = memo(MinimalErrorMessageBase);
