import { Box, styled } from 'leather-styles/jsx';

import { usePsbtSignerContext } from '@app/features/psbt-signer/psbt-signer.context';

import { PsbtRequestDetailsSectionHeader } from '../psbt-request-details-section-header';
import { PsbtRequestDetailsSectionLayout } from '../psbt-request-details-section.layout';
import { PsbtAddressReceiveTotals } from './components/psbt-address-receive-totals';
import { PsbtAddressTransferTotals } from './components/psbt-address-transfer-totals';
import i18n from '@app/i18n'

export function PsbtInputsOutputsTotals() {
  const { addressNativeSegwitTotal, addressTaprootTotal } = usePsbtSignerContext();
  // Transferring (+)
  const isNativeSegwitTotalGreaterThanZero = addressNativeSegwitTotal.amount.isGreaterThan(0);
  const isTaprootTotalGreaterThanZero = addressTaprootTotal.amount.isGreaterThan(0);
  // Receiving (-)
  const isNativeSegwitTotalLessThanZero = addressNativeSegwitTotal.amount.isLessThan(0);
  const isTaprootTotalLessThanZero = addressTaprootTotal.amount.isLessThan(0);
  const isTotalZero =
    addressNativeSegwitTotal.amount.isEqualTo(0) && addressTaprootTotal.amount.isEqualTo(0);

  const isTransferring = isNativeSegwitTotalGreaterThanZero || isTaprootTotalGreaterThanZero;
  const isReceiving = isNativeSegwitTotalLessThanZero || isTaprootTotalLessThanZero;
  const showDivider = isTransferring && isReceiving;

  if (isTotalZero) return null;

  return (
    <PsbtRequestDetailsSectionLayout p="unset">
      {isTransferring ? (
        <Box p="space.05">
          <PsbtRequestDetailsSectionHeader title={i18n.common.youTransfer} />
          <PsbtAddressTransferTotals showNativeSegwitTotal={isNativeSegwitTotalGreaterThanZero} />
        </Box>
      ) : null}
      {showDivider ? <styled.hr border="default" /> : null}
      {isReceiving ? (
        <Box p="space.05">
          <PsbtRequestDetailsSectionHeader title={i18n.common.youReceive} />
          <PsbtAddressReceiveTotals
            showNativeSegwitTotal={isNativeSegwitTotalLessThanZero}
            showTaprootTotal={isTaprootTotalLessThanZero}
          />
        </Box>
      ) : null}
    </PsbtRequestDetailsSectionLayout>
  );
}
