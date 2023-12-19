import { HStack, Stack, styled } from 'leather-styles/jsx';

import { Money } from '@shared/models/money.model';

import { formatMoney, i18nFormatCurrency } from '@app/common/money/format-money';
import { useCalculateBitcoinFiatValue } from '@app/query/common/market-data/market-data.hooks';

import { PsbtRequestDetailsSectionLayout } from './psbt-request-details-section.layout';
import i18n from '@app/i18n'
export function PsbtRequestFee(props: { fee: Money }) {
  const { fee } = props;
  const calculateBitcoinFiatValue = useCalculateBitcoinFiatValue();

  return (
    <PsbtRequestDetailsSectionLayout>
      <HStack alignItems="center" justifyContent="space-between">
        <styled.span textStyle="label.01">{i18n.common.transactionFee}</styled.span>
        <Stack alignItems="flex-end" gap="space.01">
          <styled.span textStyle="label.01">{formatMoney(fee)}</styled.span>
          <styled.span textStyle="caption.02">
            {i18nFormatCurrency(calculateBitcoinFiatValue(fee))}
          </styled.span>
        </Stack>
      </HStack>
    </PsbtRequestDetailsSectionLayout>
  );
}
