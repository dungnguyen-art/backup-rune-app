import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

import { HStack, styled } from 'leather-styles/jsx';

import { useAnalytics } from '@app/common/hooks/analytics/use-analytics';
import { useBitcoinExplorerLink } from '@app/common/hooks/use-bitcoin-explorer-link';
import { useClipboard } from '@app/common/hooks/use-copy-to-clipboard';
import { useRouteHeader } from '@app/common/hooks/use-route-header';
import { satToBtc } from '@app/common/money/unit-conversion';
import {
  InfoCard,
  InfoCardAssetValue,
  InfoCardBtn,
  InfoCardFooter,
} from '@app/components/info-card/info-card';
import { ModalHeader } from '@app/components/modal-header';
import { CheckmarkIcon } from '@app/ui/components/icons/checkmark-icon';
import { CopyIcon } from '@app/ui/components/icons/copy-icon';
import { ExternalLinkIcon } from '@app/ui/components/icons/external-link-icon';
import i18n from '@app/i18n'
export function LockBitcoinSummary() {
  const { state } = useLocation();

  const { txId, txMoney, txFiatValue, txFiatValueSymbol, symbol, txLink } = state;

  const { onCopy } = useClipboard(txId);
  const { handleOpenBitcoinTxLink: handleOpenTxLink } = useBitcoinExplorerLink();
  const analytics = useAnalytics();

  function onClickLink() {
    void analytics.track('view_transaction_confirmation', { symbol: 'BTC' });
    handleOpenTxLink(txLink);
  }

  function onClickCopy() {
    onCopy();
    toast.success('ID copied!');
  }

  useRouteHeader(<ModalHeader hideActions defaultClose title="Locked Bitcoin" />);

  return (
    <InfoCard>
      <InfoCardAssetValue
        fiatSymbol={txFiatValueSymbol}
        fiatValue={txFiatValue}
        icon={<CheckmarkIcon size="32px" />}
        my="space.05"
        px="space.05"
        symbol={symbol}
        value={Number(satToBtc(txMoney.amount))}
      />
      <styled.span fontSize={2} fontWeight={200} p="space.05" textAlign="justify">
        <styled.span style={{ fontWeight: 500 }}>{i18n.common.success}</styled.span>
        {i18n.common.lockedBitcoin}
      </styled.span>
      <InfoCardFooter>
        <HStack gap="space.04" width="100%">
          <InfoCardBtn
            icon={<ExternalLinkIcon size="14px" />}
            label={i18n.button.viewDetails}
            onClick={onClickLink}
          />
          <InfoCardBtn icon={<CopyIcon size="14px" />} label={i18n.button.copyID} onClick={onClickCopy} />
        </HStack>
      </InfoCardFooter>
    </InfoCard>
  );
}
