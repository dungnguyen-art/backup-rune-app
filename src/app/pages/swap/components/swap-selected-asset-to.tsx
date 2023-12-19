import { useField } from 'formik';

import { formatMoneyWithoutSymbol } from '@app/common/money/format-money';
import { LoadingSpinner } from '@app/components/loading-spinner';

import { useAlexSdkAmountAsFiat } from '../hooks/use-alex-sdk-fiat-price';
import { useSwapContext } from '../swap.context';
import { SwapAmountField } from './swap-amount-field';
import { SwapSelectedAssetLayout } from './swap-selected-asset.layout';
import i18n from "@app/i18n";

interface SwapSelectedAssetToProps {
  onChooseAsset(): void;
  title: string;
}
export function SwapSelectedAssetTo({ onChooseAsset, title }: SwapSelectedAssetToProps) {
  const { isFetchingExchangeRate } = useSwapContext();
  const [amountField] = useField('swapAmountTo');
  const [assetField] = useField('swapAssetTo');

  const amountAsFiat = useAlexSdkAmountAsFiat(
    assetField.value?.balance,
    assetField.value?.price,
    amountField.value
  );

  return (
    <SwapSelectedAssetLayout
      caption={i18n.screen["swap.caption"]}
      icon={assetField.value?.icon}
      name="swapAmountTo"
      onChooseAsset={onChooseAsset}
      showToggle
      swapAmountInput={
        isFetchingExchangeRate ? (
          <LoadingSpinner justifyContent="flex-end" size="sm" />
        ) : (
          <SwapAmountField amountAsFiat={amountAsFiat} isDisabled name="swapAmountTo" />
        )
      }
      symbol={assetField.value?.name ?? i18n.dropdown["swap.selectAsset"]}
      title={title}
      value={assetField.value?.balance ? formatMoneyWithoutSymbol(assetField.value?.balance) : '0'}
    />
  );
}
