import { useNavigate } from 'react-router-dom';
import i18n from '@app/i18n'
import { RouteUrls } from '@shared/route-urls';

import { SwapSelectedAssetFrom } from './swap-selected-asset-from';
import { SwapSelectedAssetTo } from './swap-selected-asset-to';

export function SwapSelectedAssets() {
  const titleFrom = i18n.screen["swap.currency"];
  const titleTo = i18n.screen["swap.receiveCurrency"];
  const navigate = useNavigate();

  function onChooseAssetFrom() {
    navigate(RouteUrls.SwapChooseAsset, { state: { swap: 'from' } });
  }

  function onChooseAssetTo() {
    navigate(RouteUrls.SwapChooseAsset, { state: { swap: 'to' } });
  }

  return (
    <>
      <SwapSelectedAssetFrom onChooseAsset={onChooseAssetFrom} title={titleFrom} />
      <SwapSelectedAssetTo onChooseAsset={onChooseAssetTo} title={titleTo} />
    </>
  );
}
