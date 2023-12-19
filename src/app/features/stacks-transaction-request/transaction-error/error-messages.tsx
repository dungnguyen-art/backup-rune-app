import { memo } from 'react';
import { Navigate } from 'react-router-dom';

import { STXTransferPayload, TransactionTypes } from '@stacks/connect';
import { Flex, HStack, Stack } from 'leather-styles/jsx';

import { RouteUrls } from '@shared/route-urls';
import { closeWindow } from '@shared/utils';

import { useAnalytics } from '@app/common/hooks/analytics/use-analytics';
import { useDrawers } from '@app/common/hooks/use-drawers';
import { useScrollLock } from '@app/common/hooks/use-scroll-lock';
import { stacksValue } from '@app/common/stacks-utils';
import { ErrorMessage } from '@app/features/stacks-transaction-request/transaction-error/error-message';
import { useCurrentStacksAccountAnchoredBalances } from '@app/query/stacks/balance/stx-balance.hooks';
import { useCurrentNetworkState } from '@app/store/networks/networks.hooks';
import { useTransactionRequestState } from '@app/store/transactions/requests.hooks';
import { LeatherButton } from '@app/ui/components/button';
import { Caption } from '@app/ui/components/typography/caption';
import { truncateMiddle } from '@app/ui/utils/truncate-middle';
import i18n from '@app/i18n'

interface InsufficientFundsActionButtonsProps {
  eventName: string;
}
function InsufficientFundsActionButtons({ eventName }: InsufficientFundsActionButtonsProps) {
  const analytics = useAnalytics();
  const { setIsShowingSwitchAccountsState } = useDrawers();

  const onGetStx = () => {
    void analytics.track(eventName);
    closeWindow();
    void chrome.tabs.create({ url: 'index.html#/fund' });
  };

  return (
    <>
      <LeatherButton onClick={onGetStx}>{i18n.button.getSTX}</LeatherButton>
      <LeatherButton onClick={() => setIsShowingSwitchAccountsState(true)} variant="outline">
        {i18n.button.switchAccount}
      </LeatherButton>
    </>
  );
}

export const FeeInsufficientFundsErrorMessage = memo(props => {
  return (
    <ErrorMessage
      title={i18n.common.feeInsufficientTitle}
      body={i18n.common.feeInsufficientBody}
      actions={<InsufficientFundsActionButtons eventName="get_stx_for_tx_fees" />}
      {...props}
    />
  );
});

export const StxTransferInsufficientFundsErrorMessage = memo(props => {
  const pendingTransaction = useTransactionRequestState();
  const { data: balance } = useCurrentStacksAccountAnchoredBalances();

  return (
    <ErrorMessage
      title={i18n.common.feeInsufficientTitle}
      body={
        <Stack gap="space.05">
          <Caption color="accent.text-primary">
            {i18n.common.stxTransferCaption}
          </Caption>
          <Stack gap="space.04" justifyContent="flex-end" textAlign="right">
            <HStack alignItems="center" justifyContent="space-between">
              <Caption>{i18n.common.currentBalance}</Caption>
              <Caption>
                {balance
                  ? stacksValue({
                      value: balance.stx.unlockedStx.amount,
                      withTicker: true,
                    })
                  : '--'}
              </Caption>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <Caption>Transfer amount</Caption>
              <Caption>
                {stacksValue({
                  value: (pendingTransaction as STXTransferPayload).amount,
                  withTicker: true,
                })}
              </Caption>
            </HStack>
          </Stack>
        </Stack>
      }
      actions={<InsufficientFundsActionButtons eventName="get_stx_for_stx_transfer" />}
      {...props}
    />
  );
});

export const NoContractErrorMessage = memo(props => {
  const network = useCurrentNetworkState();
  const pendingTransaction = useTransactionRequestState();

  if (!pendingTransaction || pendingTransaction.txType !== TransactionTypes.ContractCall)
    return null;
  return (
    <ErrorMessage
      title="Contract not found"
      body={`The contract (${truncateMiddle(pendingTransaction.contractAddress)}.${
        pendingTransaction.contractName
      }) that you are trying to call cannot be found on ${network.mode}.`}
      {...props}
    />
  );
});

export const IncorrectContractAddressMessage = memo(props => {
  const pendingTransaction = useTransactionRequestState();

  if (!pendingTransaction || pendingTransaction.txType !== TransactionTypes.ContractCall)
    return null;
  return (
    <ErrorMessage
      title="Invalid contract address"
      body={`The contract address (${truncateMiddle(
        pendingTransaction.contractAddress
      )}) that you are trying to call is not a valid Stacks address.`}
      {...props}
    />
  );
});

export const UnauthorizedRequestRedirect = memo(() => {
  return <Navigate to={RouteUrls.UnauthorizedRequest} />;
});

// TODO: Change this to new Error component?
// #4476 TODO: maybe we can do the above now?
export const ExpiredRequestErrorMessage = memo(props => {
  useScrollLock(true);
  return (
    <Flex
      position="fixed"
      width="100%"
      height="100vh"
      zIndex={99}
      left={0}
      top={0}
      alignItems="center"
      justifyContent="center"
      p="space.05"
      bg="rgba(0,0,0,0.35)"
      backdropFilter="blur(10px)"
    >
      <ErrorMessage
        title={i18n.common.expiredRequestTitle}
        body={i18n.common.expiredRequestBody}
        border="1px solid"
        borderColor="accent.border-default"
        // #4476 TODO - move this to new error component
        // #4476 TODO check this is OK to remove boxShadow="high"
        // boxShadow="high"
        // css={{
        //   '& > *': {
        //     pointerEvents: 'all',
        //   },
        // }}
        {...props}
      />
    </Flex>
  );
});
