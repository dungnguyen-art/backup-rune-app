import { ExternalLink } from '@app/components/external-link';
import { WarningLabel } from '@app/components/warning-label';
import i18n from '@app/i18n'
export function TestnetBtcMessage() {
  return (
    <WarningLabel mb="space.04">
        {i18n.screen["sendAsset-form.noteAboutTestnet"]}{' '}
      <ExternalLink href="https://coinfaucet.eu/en/btc-testnet" textDecoration="underline">
          {i18n.screen["sendAsset-form.getTestnetBTC"]}
      </ExternalLink>
    </WarningLabel>
  );
}
