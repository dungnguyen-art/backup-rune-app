import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import i18n from '@app/i18n'
import { RouteUrls } from '@shared/route-urls';

import { useAnalytics } from '@app/common/hooks/analytics/use-analytics';
import { useRouteHeader } from '@app/common/hooks/use-route-header';
import { Header } from '@app/components/header';
import { RequestPassword } from '@app/components/request-password';
import { TwoColumnLayout } from '@app/components/secret-key/two-column.layout';
import { SecretKeyDisplayer } from '@app/features/secret-key-displayer/secret-key-displayer';
import { useDefaultWalletSecretKey } from '@app/store/in-memory-key/in-memory-key.selectors';

import { ViewSecretKeyContent } from './components/view-secret-key.content';

export function ViewSecretKey() {
  const analytics = useAnalytics();
  const navigate = useNavigate();
  const defaultWalletSecretKey = useDefaultWalletSecretKey();
  const [showSecretKey, setShowSecretKey] = useState(false);

  useRouteHeader(<Header onClose={() => navigate(RouteUrls.Home)} />);

  useEffect(() => {
    void analytics.page('view', '/save-secret-key');
  }, [analytics]);

  if (showSecretKey) {
    return (
      <TwoColumnLayout
        leftColumn={<ViewSecretKeyContent />}
        rightColumn={<SecretKeyDisplayer secretKey={defaultWalletSecretKey ?? ''} />}
      />
    );
  }

  return (
    <>
      <RequestPassword
        title=
            {i18n.formatString(i18n.common.viewSecretKey, {
                htmlTag: <br/>
            })}
        caption={i18n.common.requestPassworkCaption}
        onSuccess={() => setShowSecretKey(true)}
      />
      <Outlet />
    </>
  );
}
