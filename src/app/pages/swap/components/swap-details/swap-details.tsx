import { SwapSelectors } from '@tests/selectors/swap.selectors';
import BigNumber from 'bignumber.js';
import { HStack, styled } from 'leather-styles/jsx';

import { createMoneyFromDecimal } from '@shared/models/money.model';
import { isDefined, isUndefined } from '@shared/utils';

import { formatMoneyPadded } from '@app/common/money/format-money';
import { microStxToStx } from '@app/common/money/unit-conversion';
import { getEstimatedConfirmationTime } from '@app/common/transactions/stacks/transaction.utils';
import { SwapSubmissionData, useSwapContext } from '@app/pages/swap/swap.context';
import { useStacksBlockTime } from '@app/query/stacks/info/info.hooks';
import { useCurrentNetworkState } from '@app/store/networks/networks.hooks';
import { ChevronUpIcon } from '@app/ui/components/icons/chevron-up-icon';

import { SwapDetailLayout } from './swap-detail.layout';
import { SwapDetailsLayout } from './swap-details.layout';
import i18n from "@app/i18n";

function RouteNames(props: { swapSubmissionData: SwapSubmissionData }) {
  return props.swapSubmissionData.router.map((route, i) => {
    const insertIcon = isDefined(props.swapSubmissionData.router[i + 1]);
    return (
      <HStack gap="space.01" key={route.name}>
        <styled.span>{route.name}</styled.span>
        {insertIcon && <ChevronUpIcon transform="rotate(90deg)" />}
      </HStack>
    );
  });
}

export function SwapDetails() {
  const { swapSubmissionData } = useSwapContext();
  const { isTestnet } = useCurrentNetworkState();
  const { data: blockTime } = useStacksBlockTime();

  if (
    isUndefined(swapSubmissionData) ||
    isUndefined(swapSubmissionData.swapAssetFrom) ||
    isUndefined(swapSubmissionData.swapAssetTo)
  )
    return null;

  const formattedMinToReceive = formatMoneyPadded(
    createMoneyFromDecimal(
      new BigNumber(swapSubmissionData.swapAmountTo).times(1 - swapSubmissionData.slippage),
      swapSubmissionData.swapAssetTo.balance.symbol,
      swapSubmissionData.swapAssetTo.balance.decimals
    )
  );

  return (
    <SwapDetailsLayout>
      <SwapDetailLayout
        dataTestId={SwapSelectors.SwapDetailsProtocol}
        title={i18n.screen["swap-review.poweredBy"]}
        value={swapSubmissionData.protocol}
      />
      <SwapDetailLayout
        title={i18n.screen["swap-review.route"]}
        value={
          <HStack gap="space.01">
            <RouteNames swapSubmissionData={swapSubmissionData} />
          </HStack>
        }
      />
      <SwapDetailLayout title={i18n.screen["swap-review.minToReceive"]} value={formattedMinToReceive} />
      <SwapDetailLayout
        title={i18n.screen["swap-review.tolerance"]}
        value={`${swapSubmissionData.slippage * 100}%`}
      />
      <SwapDetailLayout
        title={i18n.screen["swap-review.liquidityProviderFee"]}
        tooltipLabel={i18n.screen["swap-review.transactionFeesTooltip"]}
        value={`${swapSubmissionData.liquidityFee} ${swapSubmissionData.swapAssetFrom.name}`}
      />
      <SwapDetailLayout
        title={i18n.screen["swap-review.transactionFees"]}
        tooltipLabel={i18n.screen["swap-review.transactionFeesTooltip"]}
        value={
          swapSubmissionData.sponsored
            ? 'Sponsored'
            : microStxToStx(swapSubmissionData.fee).toString()
        }
      />
      <SwapDetailLayout
        title={i18n.screen["swap-review.estimateTime"]}
        value={getEstimatedConfirmationTime(isTestnet, blockTime)}
      />
      <SwapDetailLayout title={i18n.screen["swap-review.none"]} value={swapSubmissionData.nonce?.toString() ?? 'Unknown'} />
    </SwapDetailsLayout>
  );
}
