import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Box } from 'leather-styles/jsx';

import { WALLET_ENVIRONMENT } from '@shared/environment';
import { RouteUrls } from '@shared/route-urls';
import { closeWindow } from '@shared/utils';

import { useRouteHeader } from '@app/common/hooks/use-route-header';
import { isFullPageMode, isPopupMode } from '@app/common/utils';
import { openIndexPageInNewTab } from '@app/common/utils/open-in-new-tab';
import { Header } from '@app/components/header';
import { RequestPassword } from '@app/components/request-password';
import { useNewBrandApprover } from '@app/store/settings/settings.selectors';
import i18n from '@app/i18n'
export function Unlock() {
  const navigate = useNavigate();

  useRouteHeader(<Header />);

  const { hasApprovedNewBrand } = useNewBrandApprover();

  useEffect(() => {
    if (!hasApprovedNewBrand && isPopupMode() && WALLET_ENVIRONMENT !== 'testing') {
      openIndexPageInNewTab('/unlock/we-have-a-new-name');
      closeWindow();
    }
    if (!hasApprovedNewBrand && isFullPageMode()) {
      navigate('./we-have-a-new-name');
    }
  }, [hasApprovedNewBrand, navigate]);

  const handleSuccess = () => navigate(RouteUrls.Home);

  return (
    <>
      {/* Hide the logo when user hasn't consented yet */}
      {!hasApprovedNewBrand && (
        <Box position="fixed" w="200px" h="60px" background="brown.2" top={0} left={0} />
      )}

      <RequestPassword
        title={
          <>
              {i18n.formatString(i18n.common.unlockPasswork, {
                  htmlTag: <br/>
              })}
          </>
        }
        caption={i18n.common.requestPassworkCaption}
        onSuccess={handleSuccess}
      />
      <Outlet />
    </>
  );
}
