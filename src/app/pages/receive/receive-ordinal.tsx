import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import i18n from '@app/i18n'
import { useAnalytics } from '@app/common/hooks/analytics/use-analytics';
import { useClipboard } from '@app/common/hooks/use-copy-to-clipboard';
import { useBackgroundLocationRedirect } from '@app/routes/hooks/use-background-location-redirect';

import { ReceiveBtcModalWarning } from './components/receive-btc-warning';
import { ReceiveTokensLayout } from './components/receive-tokens.layout';

export function ReceiveOrdinalModal() {
  useBackgroundLocationRedirect();
  const analytics = useAnalytics();
  const { state } = useLocation();
  const { onCopy } = useClipboard(state.btcAddressTaproot);

  function copyToClipboard() {
    void analytics.track('copy_address_to_add_new_inscription');
    toast.success(i18n.notification.copiedToClipboard);
    onCopy();
  }
  // #4028 FIXME - this doesn't open in new tab as it loses btcAddressTaproot amd crashes btcStamp and Stx are OK?
  return (
    <ReceiveTokensLayout
      address={state.btcAddressTaproot}
      onCopyAddressToClipboard={copyToClipboard}
      title={i18n.common.ordInscription}
      warning={<ReceiveBtcModalWarning message={i18n.common.depositOrdinal} />}
    />
  );
}
