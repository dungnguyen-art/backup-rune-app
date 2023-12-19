import { BitcoinContractRequestSelectors } from '@tests/selectors/bitcoin-contract-request.selectors';

import { WarningLabel } from '@app/components/warning-label';
import i18n from "@app/i18n";

export function BitcoinContractRequestWarningLabel(props: { appName?: string }) {
  const { appName } = props;
  const title = `Do not proceed unless you trust ${appName ?? 'Unknown'}!`;

  return (
    <WarningLabel
      title={title}
      width="100%"
      data-testid={BitcoinContractRequestSelectors.BitcoinContractWarningLabel}
    >
      {i18n.formatString(i18n.common["warning.bitcoinContractRequest"], {
        appName: appName || ""
      })}
    </WarningLabel>
  );
}
//i18n
