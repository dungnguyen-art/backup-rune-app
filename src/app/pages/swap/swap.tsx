import { useAsync } from 'react-async-hook';
import { Outlet } from 'react-router-dom';

import { SwapSelectors } from '@tests/selectors/swap.selectors';
import { useFormikContext } from 'formik';

import { isUndefined } from '@shared/utils';

import { useRouteHeader } from '@app/common/hooks/use-route-header';
import { LoadingSpinner } from '@app/components/loading-spinner';
import { ModalHeader } from '@app/components/modal-header';
import { LeatherButton } from '@app/ui/components/button';

import { SwapContentLayout } from './components/swap-content.layout';
import { SwapFooterLayout } from './components/swap-footer.layout';
import { SwapSelectedAssets } from './components/swap-selected-assets';
import { SwapFormValues } from './hooks/use-swap-form';
import { useSwapContext } from './swap.context';
import i18n from "@app/i18n";

export function Swap() {
  const { isFetchingExchangeRate, swappableAssetsFrom } = useSwapContext();
  const { dirty, isValid, setFieldValue, values } = useFormikContext<SwapFormValues>();

  useRouteHeader(<ModalHeader defaultGoBack hideActions title="Swap" />, true);

  useAsync(async () => {
    if (isUndefined(values.swapAssetFrom))
      return await setFieldValue('swapAssetFrom', swappableAssetsFrom[0]);
    return;
  }, [swappableAssetsFrom, values.swapAssetFrom]);

  if (isUndefined(values.swapAssetFrom)) return <LoadingSpinner height="300px" />;

  return (
    <>
      <SwapContentLayout>
        <SwapSelectedAssets />
      </SwapContentLayout>
      <SwapFooterLayout>
        <LeatherButton
          data-testid={SwapSelectors.SwapReviewBtn}
          disabled={!(dirty && isValid) || isFetchingExchangeRate}
          type="submit"
          width="100%"
        >
            {i18n.button["swap.reviewAndSwap"]}
        </LeatherButton>
      </SwapFooterLayout>
      <Outlet />
    </>
  );
}
