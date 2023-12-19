import { useNavigate } from 'react-router-dom';

import { useFormikContext } from 'formik';

import { RouteUrls } from '@shared/route-urls';
import { isUndefined } from '@shared/utils';

import { SwapFormValues } from '../../hooks/use-swap-form';
import { SwapAssetItemLayout } from './swap-asset-item.layout';
import { SwapAssetsPairLayout } from './swap-assets-pair.layout';
import i18n from "@app/i18n";

export function SwapAssetsPair() {
  const { values } = useFormikContext<SwapFormValues>();
  const { swapAmountFrom, swapAmountTo, swapAssetFrom, swapAssetTo } = values;
  const navigate = useNavigate();

  if (isUndefined(swapAssetFrom) || isUndefined(swapAssetTo)) {
    navigate(RouteUrls.Swap, { replace: true });
    return null;
  }

  return (
    <SwapAssetsPairLayout
      swapAssetFrom={
        <SwapAssetItemLayout
          caption={i18n.screen["swap-review.noteOrigin"]}
          icon={swapAssetFrom.icon}
          symbol={swapAssetFrom.balance.symbol}
          value={swapAmountFrom}
        />
      }
      swapAssetTo={
        <SwapAssetItemLayout
          caption={i18n.screen["swap-review.noteReceive"]}
          icon={swapAssetTo.icon}
          symbol={swapAssetTo.balance.symbol}
          value={swapAmountTo}
        />
      }
    />
  );
}
