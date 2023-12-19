import { SendCryptoAssetSelectors } from '@tests/selectors/send.selectors';
import { Box } from 'leather-styles/jsx';

import { Money } from '@shared/models/money.model';

import { Tooltip } from '@app/components/tooltip';
import { LeatherButton } from '@app/ui/components/button';

import { useSendMax } from '../hooks/use-send-max';
import i18n from '@app/i18n'
const sendMaxTooltipLabel = i18n.screen["sendAsset-form.sendMaxTooltipLabel"]

interface BitcoinSendMaxButtonProps {
  balance: Money;
  isSendingMax?: boolean;
  onSetIsSendingMax(value: boolean): void;
  sendMaxBalance: string;
  sendMaxFee: string;
}
export function BitcoinSendMaxButton({
  balance,
  isSendingMax,
  onSetIsSendingMax,
  sendMaxBalance,
  sendMaxFee,
  ...props
}: BitcoinSendMaxButtonProps) {
  const onSendMax = useSendMax({
    balance,
    isSendingMax,
    onSetIsSendingMax,
    sendMaxBalance,
    sendMaxFee,
  });

  // Hide send max button if lowest fee calc is greater
  // than available balance which will default to zero
  if (sendMaxBalance === '0') return <Box height="32px" />;

  return (
    <Tooltip
      label={sendMaxTooltipLabel}
      labelProps={{ padding: 'space.02', textAlign: 'center' }}
      maxWidth="200px"
      placement="bottom"
    >
      <Box>
        <LeatherButton
          data-testid={SendCryptoAssetSelectors.SendMaxBtn}
          onClick={() => onSendMax()}
          variant="link"
          {...props}
        >
          {isSendingMax ? i18n.screen["sendAsset-form.sendingMax"] : i18n.screen["sendAsset-form.sendMax"]}
        </LeatherButton>
      </Box>
    </Tooltip>
  );
}
