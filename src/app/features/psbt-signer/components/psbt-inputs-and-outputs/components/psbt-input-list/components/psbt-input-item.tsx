import { createMoney } from '@shared/models/money.model';

import { formatMoney } from '@app/common/money/format-money';
import { Pill } from '@app/components/pill';
import { PsbtInput } from '@app/features/psbt-signer/hooks/use-parsed-inputs';
import { truncateMiddle } from '@app/ui/utils/truncate-middle';
import i18n from '@app/i18n'

import { PsbtInputOutputItemLayout } from '../../psbt-input-output-item.layout';

const pillHoverLabel = i18n.common.pillHoverLabel;

export function PsbtInputItem({ utxo }: { utxo: PsbtInput }) {
  return (
    <PsbtInputOutputItemLayout
      address={truncateMiddle(utxo.address)}
      addressHoverLabel={utxo.address}
      amount={formatMoney(createMoney(utxo.value, 'BTC'))}
      label={utxo.toSign ? <Pill hoverLabel={pillHoverLabel} label={i18n.common.approve} /> : undefined}
      txId={truncateMiddle(utxo.txid)}
      txIdHoverLabel={utxo.txid}
    />
  );
}
