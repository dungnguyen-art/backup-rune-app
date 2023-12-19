import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Stack } from 'leather-styles/jsx';

import { RouteUrls } from '@shared/route-urls';

import { useAnalytics } from '@app/common/hooks/analytics/use-analytics';
import { formatMoneyPadded } from '@app/common/money/format-money';
import { delay } from '@app/common/utils';
import { FormAddressDisplayer } from '@app/components/address-displayer/form-address-displayer';
import { ExternalLink } from '@app/components/external-link';
import { InfoCard, InfoCardRow, InfoCardSeparator } from '@app/components/info-card/info-card';
import {
  useCurrentTaprootAccountBalance,
  useCurrentTaprootAccountUninscribedUtxos,
} from '@app/query/bitcoin/balance/btc-taproot-balance.hooks';
import { useBitcoinBroadcastTransaction } from '@app/query/bitcoin/transaction/use-bitcoin-broadcast-transaction';
import { useCurrentAccountNativeSegwitAddressIndexZero } from '@app/store/accounts/blockchain/bitcoin/native-segwit-account.hooks';
import { truncateMiddle } from '@app/ui/utils/truncate-middle';

import { RetrieveTaprootToNativeSegwitLayout } from './components/retrieve-taproot-to-native-segwit.layout';
import { useGenerateRetrieveTaprootFundsTx } from './use-generate-retrieve-taproot-funds-tx';
import i18n from '@app/i18n'
export function RetrieveTaprootToNativeSegwit() {
  const navigate = useNavigate();
  const balance = useCurrentTaprootAccountBalance();
  const recipient = useCurrentAccountNativeSegwitAddressIndexZero();
  const uninscribedUtxos = useCurrentTaprootAccountUninscribedUtxos();
  const analytics = useAnalytics();
  const { generateRetrieveTaprootFundsTx, fee } = useGenerateRetrieveTaprootFundsTx();
  const { broadcastTx, isBroadcasting } = useBitcoinBroadcastTransaction();

  async function handleBroadcastRetieveBitcoinTx() {
    const tx = await generateRetrieveTaprootFundsTx({ recipient, fee });
    await broadcastTx({
      tx,
      async onSuccess() {
        await delay(1200);
        toast.success(i18n.notification.broadcastSuccesfully);
        await delay(700);
        navigate(RouteUrls.Activity);
        void analytics.track('broadcast_retrieve_taproot_to_native_segwit');
      },
      onError(e) {
        alert(e);
      },
    });
  }

  return (
    <RetrieveTaprootToNativeSegwitLayout
      isBroadcasting={isBroadcasting}
      onApproveTransaction={handleBroadcastRetieveBitcoinTx}
      onClose={() => navigate(RouteUrls.Home)}
    >
      <InfoCard mt="space.05">
        <Stack width="100%">
          <InfoCardRow title={i18n.common.yourAddress} value={<FormAddressDisplayer address={recipient} />} />
          <InfoCardSeparator />
          <InfoCardRow title={i18n.common.amount} value={formatMoneyPadded(balance)} />
          <InfoCardRow title={i18n.common.fee} value={formatMoneyPadded(fee)} />
          <InfoCardSeparator />
          {uninscribedUtxos.map((utxo, i) => (
            <InfoCardRow
              key={utxo.txid}
              title={`Uninscribed UTXO #${i}`}
              value={
                <ExternalLink
                  href={`https://ordinals-explorer.generative.xyz/output/${utxo.txid}:${utxo.vout}`}
                >
                  {`${truncateMiddle(utxo.txid, 4)}:${utxo.vout}`} ↗
                </ExternalLink>
              }
            />
          ))}
        </Stack>
      </InfoCard>
    </RetrieveTaprootToNativeSegwitLayout>
  );
}
