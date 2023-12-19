import { useLocation, useNavigate } from 'react-router-dom';

import { RouteUrls } from '@shared/route-urls';

import { useAnalytics } from '@app/common/hooks/analytics/use-analytics';
import { PlusIcon } from '@app/ui/components/icons/plus-icon';

import { CollectibleItemLayout } from './collectible-item.layout';
import i18n from '@app/i18n'
export function AddCollectible() {
  const navigate = useNavigate();
  const analytics = useAnalytics();
  const location = useLocation();

  return (
    <CollectibleItemLayout
      onClickLayout={() => {
        void analytics.track('select_add_new_collectible');
        navigate(`${RouteUrls.Home}${RouteUrls.ReceiveCollectible}`, {
          state: {
            backgroundLocation: location,
          },
        });
      }}
      showBorder
      subtitle={i18n.common.collectible}
      title={i18n.common.addNewCollectible}
    >
      <PlusIcon size="xl" />
    </CollectibleItemLayout>
  );
}
